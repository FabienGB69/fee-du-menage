import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { verifyToken } from '@/lib/admin/auth'

async function isAuthorized(): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_auth')?.value
  if (!token) return false
  return verifyToken(token, adminPassword)
}

const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string().max(100_000),
    })
  ).min(1).max(500),
  model: z.string().min(1).max(100),
  systemPrompt: z.string().max(20_000).optional(),
  maxTokens: z.number().int().positive().max(16384).optional(),
})

export async function POST(req: NextRequest) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API not configured' }, { status: 500 })
  }

  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = chatSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.flatten() }, { status: 400 })
  }

  const { messages, model, systemPrompt } = parsed.data
  const maxTokens = Math.min(parsed.data.maxTokens ?? 8192, 16384)

  const anthropic = new Anthropic({ apiKey })
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const stream = await anthropic.messages.stream({
          model,
          max_tokens: maxTokens,
          system: systemPrompt,
          messages: messages.map(m => ({ role: m.role, content: m.content })),
        })

        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text))
          }
        }

        const finalMsg = await stream.finalMessage()
        const usage = {
          input_tokens: finalMsg.usage.input_tokens,
          output_tokens: finalMsg.usage.output_tokens,
        }
        controller.enqueue(encoder.encode('\x00' + JSON.stringify({ __usage: usage })))
        controller.close()
      } catch (err) {
        console.error('[admin/chat]', err)
        controller.enqueue(encoder.encode('\x00' + JSON.stringify({ __error: 'Stream error' })))
        controller.close()
      }
    },
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Accel-Buffering': 'no',
      'Cache-Control': 'no-cache',
    },
  })
}

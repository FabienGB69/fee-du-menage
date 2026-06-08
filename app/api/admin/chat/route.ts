import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/admin/auth'
import type { ChatRequestBody } from '@/lib/admin/types'

async function isAuthorized(): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_auth')?.value
  if (!token) return false
  return verifyToken(token, adminPassword)
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API not configured' }, { status: 500 })
  }

  let body: ChatRequestBody

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { messages, model, systemPrompt } = body
  const maxTokens = Math.min(body.maxTokens ?? 8192, 16384)

  if (!Array.isArray(messages) || typeof model !== 'string' || !model) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

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

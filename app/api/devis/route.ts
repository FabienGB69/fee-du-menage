import { NextResponse } from 'next/server';
import { normalizeQuotePayload } from '@/lib/devis';
import { saveQuoteToSupabase, sendQuoteEmail } from '@/lib/integrations';

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON invalide.' }, { status: 400 });
  }

  const payload = normalizeQuotePayload(body);

  if (!payload) {
    return NextResponse.json({ error: 'Champs obligatoires manquants.' }, { status: 400 });
  }

  if (payload._honeypot) {
    return NextResponse.json({ ok: true });
  }

  try {
    await Promise.all([saveQuoteToSupabase(payload), sendQuoteEmail(payload)]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur lors du traitement de la demande.' }, { status: 500 });
  }
}

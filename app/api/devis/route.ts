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
    await sendQuoteEmail(payload);
  } catch (error) {
    console.error('Email delivery failed:', error);
    return NextResponse.json({ error: 'Erreur lors de l’envoi de la demande.' }, { status: 500 });
  }

  try {
    await saveQuoteToSupabase(payload);
  } catch (error) {
    console.error('Optional Supabase storage failed:', error);
  }

  return NextResponse.json({ ok: true });
}

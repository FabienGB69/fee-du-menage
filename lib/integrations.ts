import { Resend } from 'resend';
import { formatQuoteEmail, type QuotePayload } from './devis';
import { siteConfig } from './site';

export async function saveQuoteToSupabase(payload: QuotePayload) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { configured: false, saved: false } as const;
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/quote_requests`, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({
      nom: payload.nom,
      telephone: payload.telephone,
      email: payload.email,
      adresse: payload.adresse,
      type_prestation: payload.typePrestation,
      surface_logement: payload.surfaceLogement || null,
      frequence_souhaitee: payload.frequenceSouhaitee || null,
      message: payload.message || null,
      source: 'site-web'
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Supabase insert failed: ${response.status}`, errorBody);
    throw new Error('Supabase insert failed');
  }

  return { configured: true, saved: true } as const;
}

function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n\x00]/g, '');
}

export async function sendQuoteEmail(payload: QuotePayload) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('RESEND_API_KEY is required in production');
    }

    return { configured: false, sent: false } as const;
  }

  const resend = new Resend(resendApiKey);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM || 'Fée du Ménage <devis@fee-du-menage.fr>',
    to: siteConfig.email,
    replyTo: sanitizeHeader(payload.email),
    subject: `Demande de devis - ${sanitizeHeader(payload.nom)}`,
    text: formatQuoteEmail(payload)
  });

  if (error) {
    console.error('Resend email failed:', error.message);
    throw new Error('Email send failed');
  }

  return { configured: true, sent: true } as const;
}

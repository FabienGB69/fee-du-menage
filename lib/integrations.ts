import { formatQuoteEmail, type QuotePayload } from './devis';
import { siteConfig } from './site';

export async function saveQuoteToSupabase(payload: QuotePayload) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return { configured: false, saved: false } as const;
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/quote_requests`, {
    method: 'POST',
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
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
    throw new Error(`Supabase insert failed: ${response.status} ${errorBody}`);
  }

  return { configured: true, saved: true } as const;
}

export async function sendQuoteEmail(payload: QuotePayload) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return { configured: false, sent: false } as const;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || 'Fée du Ménage <devis@fee-du-menage.fr>',
      to: [siteConfig.email],
      reply_to: payload.email,
      subject: `Demande de devis - ${payload.nom}`,
      text: formatQuoteEmail(payload)
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Resend email failed: ${response.status} ${errorBody}`);
  }

  return { configured: true, sent: true } as const;
}

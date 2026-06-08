import { z } from 'zod';

const HEADER_SAFE = /^[^\r\n\x00]+$/;

export const prestationOptions = [
  'Ménage régulier',
  'Grand nettoyage',
  'Ménage après déménagement',
  'Nettoyage Airbnb',
  'Nettoyage des vitres'
] as const;

export const frequenceOptions = ['Ponctuelle', 'Hebdomadaire', 'Toutes les 2 semaines', 'Mensuelle', 'À définir ensemble'] as const;

export const quoteSchema = z.object({
  nom: z.string().trim().min(2, 'Indiquez votre nom.').max(100).regex(HEADER_SAFE, 'Nom invalide.'),
  telephone: z.string().trim().min(8, 'Indiquez un téléphone valide.').max(20).regex(/^[\d\s+\-().]+$/, 'Téléphone invalide.'),
  email: z.string().trim().email('Indiquez un email valide.').max(200).regex(HEADER_SAFE, 'Email invalide.'),
  adresse: z.string().trim().min(6, 'Indiquez votre adresse à Lyon.').max(200).regex(HEADER_SAFE, 'Adresse invalide.'),
  typePrestation: z.enum(prestationOptions, { required_error: 'Choisissez une prestation.' }),
  surfaceLogement: z.string().trim().max(30).regex(/^[\d\s,./m²]*$/, 'Format invalide.').optional().default(''),
  frequenceSouhaitee: z.enum(frequenceOptions).or(z.literal('')).optional().default(''),
  message: z.string().trim().max(1200, 'Votre message est trop long.').optional().default(''),
  _honeypot: z.string().max(200).optional().default('')
});

export type QuotePayload = z.infer<typeof quoteSchema>;

export function normalizeQuotePayload(input: unknown): QuotePayload | null {
  const result = quoteSchema.safeParse(input);
  return result.success ? result.data : null;
}

export function formatQuoteEmail(payload: QuotePayload) {
  return [
    'Nouvelle demande de devis depuis le site Fée du Ménage',
    '',
    `Nom : ${payload.nom}`,
    `Téléphone : ${payload.telephone}`,
    `Email : ${payload.email}`,
    `Adresse : ${payload.adresse}`,
    `Type de prestation : ${payload.typePrestation}`,
    `Surface du logement : ${payload.surfaceLogement || 'Non précisée'}`,
    `Fréquence souhaitée : ${payload.frequenceSouhaitee || 'Non précisée'}`,
    '',
    'Message :',
    payload.message || 'Aucun message',
    '',
    'Répondre rapidement permet de maximiser la conversion.'
  ].join('\n');
}

import { z } from 'zod';
export type QuotePayload = {
  nom: string;
  telephone: string;
  email: string;
  adresse: string;
  typePrestation: string;
  surfaceLogement?: string;
  frequenceSouhaitee?: string;
  message?: string;
};

export const prestationOptions = [
  'Ménage régulier',
  'Grand nettoyage',
  'Ménage après déménagement',
  'Nettoyage Airbnb',
  'Nettoyage des vitres'
] as const;

export const frequenceOptions = ['Ponctuelle', 'Hebdomadaire', 'Toutes les 2 semaines', 'Mensuelle', 'À définir ensemble'] as const;

export const quoteSchema = z.object({
  nom: z.string().trim().min(2, 'Indiquez votre nom.'),
  telephone: z.string().trim().min(8, 'Indiquez un téléphone valide.'),
  email: z.string().trim().email('Indiquez un email valide.'),
  adresse: z.string().trim().min(6, 'Indiquez votre adresse à Lyon.'),
  typePrestation: z.enum(prestationOptions, { required_error: 'Choisissez une prestation.' }),
  surfaceLogement: z.string().trim().optional().default(''),
  frequenceSouhaitee: z.enum(frequenceOptions).or(z.literal('')).optional().default(''),
  message: z.string().trim().max(1200, 'Votre message est trop long.').optional().default('')
});

export type QuotePayload = z.infer<typeof quoteSchema>;

export function normalizeQuotePayload(input: unknown): QuotePayload | null {
  const result = quoteSchema.safeParse(input);
  return result.success ? result.data : null;
];

export const frequenceOptions = ['Ponctuelle', 'Hebdomadaire', 'Toutes les 2 semaines', 'Mensuelle', 'À définir ensemble'];

export function normalizeQuotePayload(input: unknown): QuotePayload | null {
  if (!input || typeof input !== 'object') {
    return null;
  }

  const record = input as Record<string, unknown>;
  const payload: QuotePayload = {
    nom: stringValue(record.nom),
    telephone: stringValue(record.telephone),
    email: stringValue(record.email),
    adresse: stringValue(record.adresse),
    typePrestation: stringValue(record.typePrestation),
    surfaceLogement: stringValue(record.surfaceLogement),
    frequenceSouhaitee: stringValue(record.frequenceSouhaitee),
    message: stringValue(record.message)
  };

  if (!payload.nom || !payload.telephone || !payload.email || !payload.adresse || !payload.typePrestation) {
    return null;
  }

  return payload;
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

function stringValue(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

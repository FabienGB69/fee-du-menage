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

export type QuoteValidationResult =
  | { success: true; data: QuotePayload }
  | { success: false; errors: Partial<Record<keyof QuotePayload, string>> };

export function validateQuotePayload(input: Record<keyof QuotePayload, string>): QuoteValidationResult {
  const payload: QuotePayload = {
    nom: input.nom.trim(),
    telephone: input.telephone.trim(),
    email: input.email.trim(),
    adresse: input.adresse.trim(),
    typePrestation: input.typePrestation.trim(),
    surfaceLogement: input.surfaceLogement.trim(),
    frequenceSouhaitee: input.frequenceSouhaitee.trim(),
    message: input.message.trim()
  };

  const errors: Partial<Record<keyof QuotePayload, string>> = {};

  if (payload.nom.length < 2) errors.nom = 'Indiquez votre nom.';
  if (payload.telephone.length < 8) errors.telephone = 'Indiquez un téléphone valide.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) errors.email = 'Indiquez un email valide.';
  if (payload.adresse.length < 6) errors.adresse = 'Indiquez votre adresse à Lyon.';
  if (!prestationOptions.includes(payload.typePrestation as (typeof prestationOptions)[number])) errors.typePrestation = 'Choisissez une prestation.';
  if (payload.frequenceSouhaitee && !frequenceOptions.includes(payload.frequenceSouhaitee as (typeof frequenceOptions)[number])) {
    errors.frequenceSouhaitee = 'Choisissez une fréquence valide.';
  }
  if ((payload.message || '').length > 1200) errors.message = 'Votre message est trop long.';

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data: payload };
}

export function normalizeQuotePayload(input: unknown): QuotePayload | null {
  if (!input || typeof input !== 'object') {
    return null;
  }

  const record = input as Record<keyof QuotePayload, unknown>;
  const validation = validateQuotePayload({
    nom: stringValue(record.nom),
    telephone: stringValue(record.telephone),
    email: stringValue(record.email),
    adresse: stringValue(record.adresse),
    typePrestation: stringValue(record.typePrestation),
    surfaceLogement: stringValue(record.surfaceLogement),
    frequenceSouhaitee: stringValue(record.frequenceSouhaitee),
    message: stringValue(record.message)
  });

  return validation.success ? validation.data : null;
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
  return typeof value === 'string' ? value : '';
}

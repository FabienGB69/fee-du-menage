'use client';

import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { useState } from 'react';
import { frequenceOptions, prestationOptions, validateQuotePayload, type QuotePayload } from '@/lib/devis';
import { siteConfig } from '@/lib/site';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type FormState = 'idle' | 'submitting' | 'success' | 'error';
type FormValues = Record<keyof QuotePayload, string>;

const defaultValues: FormValues = {
  nom: '',
  telephone: '',
  email: '',
  adresse: '',
  typePrestation: '',
  surfaceLogement: '',
  frequenceSouhaitee: '',
  message: ''
};

export function QuoteForm() {
  const [values, setValues] = useState<FormValues>(defaultValues);
  const [errors, setErrors] = useState<Partial<Record<keyof QuotePayload, string>>>({});
  const [formState, setFormState] = useState<{ status: FormState; message: string }>({ status: 'idle', message: '' });

  function updateField(field: keyof QuotePayload) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    };
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState({ status: 'submitting', message: '' });

    const validation = validateQuotePayload(values);

    if (!validation.success) {
      setErrors(validation.errors);
      setFormState({ status: 'idle', message: '' });
      return;
    }

    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data)
      });

      if (!response.ok) {
        throw new Error('La demande n’a pas pu être envoyée.');
      }

      setValues(defaultValues);
      setErrors({});
      setFormState({ status: 'success', message: 'Votre demande a bien été envoyée. Djamila vous recontactera rapidement.' });
    } catch {
      setFormState({ status: 'error', message: `Erreur d’envoi. Vous pouvez appeler directement au ${siteConfig.phoneDisplay}.` });
    }
  }

  return (
    <form className="quote-form" onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        <FormField label="Nom" error={errors.nom}>
          <Input type="text" autoComplete="name" value={values.nom} onChange={updateField('nom')} />
        </FormField>
        <FormField label="Téléphone" error={errors.telephone}>
          <Input type="tel" autoComplete="tel" value={values.telephone} onChange={updateField('telephone')} />
        </FormField>
        <FormField label="Email" error={errors.email}>
          <Input type="email" autoComplete="email" value={values.email} onChange={updateField('email')} />
        </FormField>
        <FormField label="Adresse" error={errors.adresse}>
          <Input type="text" autoComplete="street-address" value={values.adresse} onChange={updateField('adresse')} />
        </FormField>
        <FormField label="Type de prestation" error={errors.typePrestation}>
          <Select value={values.typePrestation} onChange={updateField('typePrestation')}>
            <option value="" disabled>
              Choisir une prestation
            </option>
            {prestationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="Surface du logement" error={errors.surfaceLogement}>
          <Input type="text" placeholder="Ex. 65 m²" value={values.surfaceLogement} onChange={updateField('surfaceLogement')} />
        </FormField>
        <FormField label="Fréquence souhaitée" error={errors.frequenceSouhaitee}>
          <Select value={values.frequenceSouhaitee} onChange={updateField('frequenceSouhaitee')}>
            <option value="">Choisir une fréquence</option>
            {frequenceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormField>
      </div>
      <FormField label="Message" error={errors.message}>
        <Textarea rows={5} placeholder="Précisez vos besoins, contraintes d'accès, date souhaitée…" value={values.message} onChange={updateField('message')} />
      </FormField>
      <Button className="w-full sm:w-auto" type="submit" disabled={formState.status === 'submitting'}>
        {formState.status === 'submitting' ? 'Envoi en cours…' : 'Envoyer ma demande de devis'}
      </Button>
      {formState.message ? <p className={`form-status ${formState.status}`}>{formState.message}</p> : null}
      <p className="form-help">
        Vous pouvez aussi appeler directement au <a href={siteConfig.phoneHref}>06 09 89 65 64</a> ou écrire à{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </form>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <Label>
      {label}
      {children}
      {error ? <span className="field-error">{error}</span> : null}
    </Label>
  );
}

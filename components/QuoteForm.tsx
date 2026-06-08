'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { frequenceOptions, prestationOptions, quoteSchema, type QuotePayload } from '@/lib/devis';
import { siteConfig } from '@/lib/site';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type FormState = 'idle' | 'success' | 'error';

export function QuoteForm() {
  const [formState, setFormState] = useFormStateMessage();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<QuotePayload>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      nom: '',
      telephone: '',
      email: '',
      adresse: '',
      typePrestation: undefined,
      surfaceLogement: '',
      frequenceSouhaitee: '',
      message: ''
    }
  });

  async function onSubmit(payload: QuotePayload) {
    setFormState('idle', '');
import type { FormEvent } from 'react';
import { useState } from 'react';
import { frequenceOptions, prestationOptions } from '@/lib/devis';
import { siteConfig } from '@/lib/site';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function QuoteForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState('submitting');
    setMessage('');

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      nom: String(data.get('nom') || ''),
      telephone: String(data.get('telephone') || ''),
      email: String(data.get('email') || ''),
      adresse: String(data.get('adresse') || ''),
      typePrestation: String(data.get('typePrestation') || ''),
      surfaceLogement: String(data.get('surfaceLogement') || ''),
      frequenceSouhaitee: String(data.get('frequenceSouhaitee') || ''),
      message: String(data.get('message') || '')
    };

    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('La demande n’a pas pu être envoyée.');
      }

      reset();
      setFormState('success', 'Votre demande a bien été envoyée. Djamila vous recontactera rapidement.');
    } catch {
      setFormState('error', `Erreur d’envoi. Vous pouvez appeler directement au ${siteConfig.phoneDisplay}.`);
      form.reset();
      setFormState('success');
      setMessage('Votre demande a bien été envoyée. Djamila vous recontactera rapidement.');
    } catch {
      setFormState('error');
      setMessage(`Erreur d’envoi. Vous pouvez appeler directement au ${siteConfig.phoneDisplay}.`);
    }
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-grid">
        <FormField label="Nom" error={errors.nom?.message}>
          <Input type="text" autoComplete="name" {...register('nom')} />
        </FormField>
        <FormField label="Téléphone" error={errors.telephone?.message}>
          <Input type="tel" autoComplete="tel" {...register('telephone')} />
        </FormField>
        <FormField label="Email" error={errors.email?.message}>
          <Input type="email" autoComplete="email" {...register('email')} />
        </FormField>
        <FormField label="Adresse" error={errors.adresse?.message}>
          <Input type="text" autoComplete="street-address" {...register('adresse')} />
        </FormField>
        <FormField label="Type de prestation" error={errors.typePrestation?.message}>
          <Select {...register('typePrestation')} defaultValue="">
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Nom
          <input type="text" name="nom" autoComplete="name" required />
        </label>
        <label>
          Téléphone
          <input type="tel" name="telephone" autoComplete="tel" required />
        </label>
        <label>
          Email
          <input type="email" name="email" autoComplete="email" required />
        </label>
        <label>
          Adresse
          <input type="text" name="adresse" autoComplete="street-address" required />
        </label>
        <label>
          Type de prestation
          <select name="typePrestation" required defaultValue="">
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
        <FormField label="Surface du logement" error={errors.surfaceLogement?.message}>
          <Input type="text" placeholder="Ex. 65 m²" {...register('surfaceLogement')} />
        </FormField>
        <FormField label="Fréquence souhaitée" error={errors.frequenceSouhaitee?.message}>
          <Select {...register('frequenceSouhaitee')} defaultValue="">
            <option value="">Choisir une fréquence</option>
            {frequenceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormField>
      </div>
      <FormField label="Message" error={errors.message?.message}>
        <Textarea rows={5} placeholder="Précisez vos besoins, contraintes d'accès, date souhaitée…" {...register('message')} />
      </FormField>
      <Button className="w-full sm:w-auto" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Envoi en cours…' : 'Envoyer ma demande de devis'}
      </Button>
      {formState.message ? <p className={`form-status ${formState.status}`}>{formState.message}</p> : null}
      <p className="form-help">
        Vous pouvez aussi appeler directement au <a href={siteConfig.phoneHref}>06 09 89 65 64</a> ou écrire à{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Surface du logement
          <input type="text" name="surfaceLogement" placeholder="Ex. 65 m²" />
        </label>
        <label>
          Fréquence souhaitée
          <select name="frequenceSouhaitee" defaultValue="">
            <option value="">Choisir une fréquence</option>
            {frequenceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Message
        <textarea name="message" rows={5} placeholder="Précisez vos besoins, contraintes d'accès, date souhaitée…" />
      </label>
      <button className="btn btn-primary" type="submit" disabled={formState === 'submitting'}>
        {formState === 'submitting' ? 'Envoi en cours…' : 'Envoyer ma demande de devis'}
      </button>
      {message ? <p className={`form-status ${formState}`}>{message}</p> : null}
      <p className="form-help">
        Vous pouvez aussi appeler directement au <a href={siteConfig.phoneHref}>06 09 89 65 64</a>.
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

function useFormStateMessage() {
  const [state, setState] = useState<{ status: FormState; message: string }>({ status: 'idle', message: '' });
  const setMessage = (status: FormState, message: string) => setState({ status, message });

  return [state, setMessage] as const;
}

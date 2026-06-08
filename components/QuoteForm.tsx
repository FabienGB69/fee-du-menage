'use client';

import React, { useId, useState } from 'react';
import type { ReactNode } from 'react';
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
      message: '',
      _honeypot: ''
    }
  });

  async function onSubmit(payload: QuotePayload) {
    setFormState('idle', '');

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
    }
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Honeypot: hidden from users, catches bots that fill all fields */}
      <input
        type="text"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="sr-only"
        {...register('_honeypot')}
      />
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
        <Textarea rows={5} placeholder="Précisez vos besoins, contraintes d’accès, date souhaitée…" {...register('message')} />
      </FormField>
      <Button className="w-full sm:w-auto" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Envoi en cours…' : 'Envoyer ma demande de devis'}
      </Button>
      {formState.message ? (
        <p className={`form-status ${formState.status}`} role="alert" aria-live="polite">
          {formState.message}
        </p>
      ) : null}
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
  const id = useId();
  const errorId = error ? `${id}-err` : undefined;
  const child = React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    id,
    ...(error && { 'aria-invalid': true, 'aria-describedby': errorId })
  });
  return (
    <Label htmlFor={id}>
      {label}
      {child}
      {error ? (
        <span id={errorId} className="field-error" role="alert">
          {error}
        </span>
      ) : null}
    </Label>
  );
}

function useFormStateMessage() {
  const [state, setState] = useState<{ status: FormState; message: string }>({ status: 'idle', message: '' });
  const setMessage = (status: FormState, message: string) => setState({ status, message });

  return [state, setMessage] as const;
}

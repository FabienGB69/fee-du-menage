'use client';

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

      form.reset();
      setFormState('success');
      setMessage('Votre demande a bien été envoyée. Djamila vous recontactera rapidement.');
    } catch {
      setFormState('error');
      setMessage(`Erreur d’envoi. Vous pouvez appeler directement au ${siteConfig.phoneDisplay}.`);
    }
  }

  return (
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

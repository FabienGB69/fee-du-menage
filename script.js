const quoteForm = document.querySelector('[data-quote-form]');

if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(quoteForm);
    const body = [
      'Bonjour Fée du Ménage,',
      '',
      'Je souhaite recevoir un devis gratuit avec les informations suivantes :',
      '',
      `Nom : ${data.get('Nom') || ''}`,
      `Téléphone : ${data.get('Téléphone') || ''}`,
      `Email : ${data.get('Email') || ''}`,
      `Adresse : ${data.get('Adresse') || ''}`,
      `Type de prestation : ${data.get('Type de prestation') || ''}`,
      `Surface du logement : ${data.get('Surface du logement') || ''}`,
      `Fréquence souhaitée : ${data.get('Fréquence souhaitée') || ''}`,
      '',
      `Message : ${data.get('Message') || ''}`,
      '',
      'Merci.'
    ].join('\n');

    const mailto = new URL('mailto:djemila.hamitouche@gmail.com');
    mailto.searchParams.set('subject', 'Demande de devis - Fée du Ménage');
    mailto.searchParams.set('body', body);
    window.location.href = mailto.toString();
  });
}

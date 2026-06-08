import { Phone, MessageCircle, FileText, Sparkles } from 'lucide-react';

const steps = [
  {
    num: 1,
    icon: Phone,
    title: 'Vous nous contactez',
    description: 'Par téléphone, email ou formulaire en ligne. Nous sommes disponibles pour vous répondre rapidement.'
  },
  {
    num: 2,
    icon: MessageCircle,
    title: 'On échange sur vos besoins',
    description: "Nous discutons ensemble de la fréquence, des pièces à traiter et de vos attentes pour personnaliser l'intervention."
  },
  {
    num: 3,
    icon: FileText,
    title: 'Devis gratuit',
    description: 'Vous recevez un devis clair et sans engagement, avec le tarif exact avant toute confirmation.'
  },
  {
    num: 4,
    icon: Sparkles,
    title: 'Intervention à domicile',
    description: 'Djamila intervient à votre domicile au créneau convenu, avec soin et méthode pour un résultat impeccable.'
  }
];

export function ProcessSteps() {
  return (
    <div className="process-grid">
      {steps.map((step) => {
        const Icon = step.icon;
        return (
          <div key={step.num} className="process-step">
            <div className="process-step-num" aria-hidden="true">{step.num}</div>
            <Icon className="process-step-icon w-7 h-7" aria-hidden="true" />
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        );
      })}
    </div>
  );
}

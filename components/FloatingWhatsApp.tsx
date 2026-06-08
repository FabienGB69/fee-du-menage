import { whatsappHref } from '@/lib/site';

export function FloatingWhatsApp() {
  return (
    <a className="floating-whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Demander un devis sur WhatsApp">
      <span aria-hidden="true">WhatsApp</span>
      <strong>Devis</strong>
    </a>
  );
}

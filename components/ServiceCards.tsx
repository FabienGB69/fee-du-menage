import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/lib/site';

export function ServiceCards({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="cards">
      {services.map((service) => (
        <article className="service-card" key={service.title}>
          {service.image && (
            <div className="service-card-img">
              <Image
                src={service.image}
                alt={`${service.title} à domicile à Lyon`}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                loading="lazy"
                sizes="(max-width: 720px) 100vw, (max-width: 980px) 50vw, 22vw"
              />
            </div>
          )}
          <div className="service-card-body">
            <span aria-hidden="true">{service.icon}</span>
            <h3>{service.title}</h3>
            <p>{detailed ? service.detail : service.description}</p>
            <Link className="service-card-cta" href="/contact#devis">
              Demander un devis
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

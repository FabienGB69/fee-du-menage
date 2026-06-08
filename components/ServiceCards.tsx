import { services } from '@/lib/site';

export function ServiceCards({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="cards">
      {services.map((service) => (
        <article className="service-card" key={service.title}>
          <span aria-hidden="true">{service.icon}</span>
          <h3>{service.title}</h3>
          <p>{detailed ? service.detail : service.description}</p>
        </article>
      ))}
    </div>
  );
}

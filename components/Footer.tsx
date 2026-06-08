import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link className="brand footer-brand" href="/">
          <Image src="/assets/logo-fee-du-menage.svg" alt="Logo Fée du Ménage" width={40} height={40} />
          <span>{siteConfig.name}</span>
        </Link>
        <p>Femme de ménage à Lyon • Aide ménagère Lyon • Ménage à domicile Lyon • Nettoyage Airbnb Lyon</p>
      </div>
      <address>
        {siteConfig.address}
        <br />
        <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
        <br />
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </address>
    </footer>
  );
}

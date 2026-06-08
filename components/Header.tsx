import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/services', label: 'Services' },
  { href: '/avis', label: 'Avis' },
  { href: '/credit-impot', label: 'Crédit d’impôt' },
  { href: '/contact', label: 'Contact' }
];

export function Header() {
  return (
    <header className="site-header" id="top">
      <nav className="nav" aria-label="Navigation principale">
        <Link className="brand" href="/" aria-label="Accueil Fée du Ménage">
          <Image src="/assets/logo-fee-du-menage.svg" alt="Logo Fée du Ménage" width={46} height={46} priority />
          <span>{siteConfig.name}</span>
        </Link>
        <div className="nav-links" aria-label="Liens rapides">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <a className="nav-call" href={siteConfig.phoneHref} aria-label="Appeler Fée du Ménage">
            06 09 89 65 64
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contact#devis">Devis gratuit</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}

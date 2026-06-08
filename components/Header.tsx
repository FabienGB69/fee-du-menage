'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/services', label: 'Services' },
  { href: '/avis', label: 'Avis' },
  { href: '/credit-impot', label: "Crédit d'impôt" },
  { href: '/contact', label: 'Contact' }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest('.site-header')) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [open]);

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

        {/* Hamburger button — visible on mobile only */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-md text-inherit"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile nav panel */}
      {open && (
        <div id="mobile-nav" className="mobile-nav-panel md:hidden" role="dialog" aria-label="Menu mobile">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <a href={siteConfig.phoneHref} aria-label="Appeler Fée du Ménage" onClick={() => setOpen(false)}>
            {siteConfig.phoneDisplay}
          </a>
          <Button asChild size="sm" className="mt-2 w-full">
            <Link href="/contact#devis" onClick={() => setOpen(false)}>
              Devis gratuit
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
}

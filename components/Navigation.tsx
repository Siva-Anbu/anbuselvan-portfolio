'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/sets', label: 'Sets' },
  { href: '/countries', label: 'Countries' },
  { href: '/about', label: 'About' },
  { href: '/work-with-me', label: 'Work With Me' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-white/5">
        <nav className="max-w-[1600px] mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">

          {/* Logo — name + tagline stacked */}
          <Link href="/" className="group flex flex-col leading-none">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl md:text-2xl font-light tracking-[0.08em] uppercase text-white/90 group-hover:text-white transition-colors">
                Anbuselvan
              </span>
              <span className="font-display text-xl md:text-2xl font-light tracking-[0.08em] uppercase" style={{ color: 'var(--accent)' }}>
                Sivaraju
              </span>
            </div>
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/55 mt-0.5">
              Captured. Crafted. Remembered !
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.slice(1).map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`nav-link font-body text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${pathname === href || pathname.startsWith(href + '/')
                    ? 'text-white active'
                    : 'text-white/50 hover:text-white/80'
                    }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2" aria-label="Toggle menu">
            <span className={`block w-6 h-px bg-white/70 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-4 h-px bg-white/70 transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : ''}`} />
            <span className={`block w-6 h-px bg-white/70 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col justify-center px-12 transition-all duration-500 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <ul className="flex flex-col gap-8">
          {navLinks.map(({ href, label }, i) => (
            <li key={href} className="overflow-hidden" style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}>
              <Link href={href}
                className={`font-display text-4xl font-light transition-all duration-500 block ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${pathname === href ? '' : 'text-white/60 hover:text-white'}`}
                style={{ color: pathname === href ? 'var(--accent)' : undefined }}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-12 left-12 flex flex-col">
          <span className="font-display text-sm font-light text-white/20">
            Anbuselvan <span style={{ color: 'var(--accent)' }}>Sivaraju</span>
          </span>
          <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-white/15 mt-0.5">
            Captured, not created
          </span>
        </div>
      </div>
    </>
  );
}

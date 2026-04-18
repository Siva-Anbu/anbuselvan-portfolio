import Link from 'next/link';
import { Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5 py-16 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Brand */}
          <div>
            <p className="font-display text-2xl font-light tracking-[0.08em] uppercase text-white/80 mb-1">
              Anbuselvan
            </p>
            <p
              className="font-display text-2xl font-light tracking-[0.08em] uppercase mb-4"
              style={{ color: 'var(--accent)' }}
            >
              Sivaraju
            </p>
            <p className="font-body text-[12px] text-white/30 leading-relaxed max-w-xs mb-3">
              Photographer documenting the world through his viewfinder, where people, travel,
              architecture, and still life reveal their silent poetry.
            </p>

            {/* ✅ Fixed: proper <a> opening tag */}

            href="https://www.instagram.com/s.anbuselvan/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 w-fit"

            <Instagram size={12} style={{ color: 'var(--accent)' }} />
            <p
              className="font-body text-[12px] leading-relaxed"
              style={{ color: 'var(--accent)' }}
            >
              @s.anbuselvan
            </p>
          </a>
        </div>

        {/* Connect */}
        <div>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/20 mb-5">
            Connect
          </p>
          <p className="font-body text-[12px] text-white/40 mb-4 leading-relaxed">
            For collaborations, prints, or inquiries:
          </p>
          <Link
            href="/contact"
            className="font-mono text-[10px] tracking-[0.2em] uppercase border border-white/10 px-4 py-2.5 text-white/50 hover:text-white hover:border-white/30 transition-all inline-block"
          >
            Get In Touch
          </Link>
        </div>

      </div> {/* ✅ Fixed: closing tag for the grid div */}

      {/* Bottom bar */}
      <div className="mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/15">
          © {new Date().getFullYear()} Anbuselvan Sivaraju. All rights reserved.
        </p>
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/15">
          Photography · Moments
        </p>
      </div>

    </div>
    </footer >
  );
}
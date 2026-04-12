import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
        404
      </p>
      <h1 className="font-display text-5xl md:text-7xl font-light text-white mb-4">
        Frame Not Found
      </h1>
      <p className="font-body text-sm text-white/35 max-w-sm mb-10 leading-relaxed">
        This moment doesn't exist in the archive. Perhaps it was never captured, or it belongs to a different story.
      </p>
      <Link
        href="/"
        className="font-mono text-[10px] tracking-[0.25em] uppercase border border-white/15 px-6 py-3 text-white/40 hover:text-white hover:border-white/30 transition-all"
      >
        Return Home →
      </Link>
    </main>
  );
}

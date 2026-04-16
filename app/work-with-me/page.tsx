import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Work With Me',
  description:
    'Book Anbuselvan Sivaraju for maternity photography, couple shoots, birthday coverage, or private events in Copenhagen. Relaxed, natural sessions focused on real moments.',
  alternates: { canonical: 'https://anbuselvan-sivaraju.vercel.app/work-with-me' },
  openGraph: {
    title: 'Work With Me | Anbuselvan Sivaraju',
    description:
      'Book a photography session in Copenhagen — maternity, couples, birthdays, and private events. Unhurried, natural, genuine.',
    url: 'https://anbuselvan-sivaraju.vercel.app/work-with-me',
    images: [
      {
        url: 'https://res.cloudinary.com/dnqfhp432/image/upload/w_1200,h_630,c_fill,q_85,f_auto/DSC07725_tkefef',
        width: 1200,
        height: 630,
        alt: 'Photography session by Anbuselvan Sivaraju — Copenhagen',
      },
    ],
  },
};

const services = [
  {
    id: '01',
    title: 'Maternity Photography',
    description: 'Soft, natural light. Calm, unhurried sessions. Maternity is one of the most intimate transitions in life. I aim to photograph it with the quiet reverence it deserves.',
    details: ['Indoor or outdoor sessions', '2-3 hours', 'Edited gallery of 25-40 images'],
  },
  {
    id: '02',
    title: 'Couple Shoots',
    description: 'Whether it is an anniversary, a pre-wedding session, or simply wanting beautiful photographs together. I create space for natural moments rather than forced poses.',
    details: ['Golden hour preferred', '1.5-2 hours', 'Edited gallery of 30-40 images'],
  },
  {
    id: '03',
    title: 'Birthday Celebrations',
    description: 'Candid, joyful, and atmospheric. I document the energy of birthdays. The small moments between the big ones make for the most memorable photographs.',
    details: ['Event coverage', '2-4 hours', 'Edited gallery of 50-70 images'],
  },
  {
    id: '04',
    title: 'Private Events',
    description: 'Small gatherings, intimate ceremonies, family reunions. If it matters to you, it matters to me. I shoot quietly, move through spaces gently, and deliver work that endures.',
    details: ['Custom duration', 'Flexible approach', 'Gallery tailored to the event'],
  },
];

export default function WorkWithMePage() {
  return (
    <main className="min-h-screen">
      <div className="pt-32 md:pt-40 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-white/5 pb-16">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/25 mb-4">
          Collaborate
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight">
          Work With Me
        </h1>
        <p className="font-body text-sm text-white/40 mt-6 max-w-lg leading-relaxed">
          I am at the intersection of passion and profession. Someone who takes photographs seriously,
          but has not let that seriousness take the joy out of it.
        </p>
      </div>

      <div className="px-6 md:px-12 max-w-[1600px] mx-auto py-16">
        <div className="max-w-2xl">
          <blockquote
            className="font-display text-2xl md:text-3xl font-light italic leading-relaxed border-l pl-6"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent-light)' }}
          >
            I photograph people the same way I photograph places. By waiting for the moment they forget I am there.
          </blockquote>
        </div>
      </div>

      <div className="px-6 md:px-12 max-w-[1600px] mx-auto pb-24">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/25 mb-12">
          What I Offer
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {services.map((service) => (
            <div key={service.id} className="bg-[#0a0a0a] p-8 md:p-10 hover:bg-white/[0.02] transition-colors duration-300">
              <span className="font-mono text-[11px] tracking-[0.3em] block mb-5" style={{ color: 'var(--accent)' }}>
                {service.id}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-4">{service.title}</h2>
              <p className="font-body text-[13px] leading-[1.8] text-white/45 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-3 font-mono text-[9px] tracking-[0.2em] uppercase text-white/30">
                    <span style={{ color: 'var(--accent)' }}>.</span>{detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12 max-w-[1600px] mx-auto pb-24 border-t border-white/5 pt-16">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/25 mb-10">How It Works</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Reach Out', desc: 'Drop me a message with the occasion, date, and what you have in mind.' },
            { step: '02', title: 'We Talk', desc: 'A short conversation to understand your vision and make sure we are a good fit.' },
            { step: '03', title: 'We Shoot', desc: 'I show up, observe, and capture. Unhurried, natural, genuine.' },
            { step: '04', title: 'You Receive', desc: 'A curated, edited gallery delivered within 7-10 days. Yours to keep.' },
          ].map(({ step, title, desc }) => (
            <div key={step}>
              <span className="font-mono text-[10px] tracking-[0.3em] block mb-3" style={{ color: 'var(--accent)' }}>{step}</span>
              <h3 className="font-display text-xl font-light text-white mb-2">{title}</h3>
              <p className="font-body text-[12px] leading-[1.7] text-white/35">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 py-24 text-center px-6">
        <p className="font-display text-3xl md:text-5xl font-light text-white mb-4">Ready to collaborate?</p>
        <p className="font-body text-sm text-white/35 mb-10 max-w-sm mx-auto leading-relaxed">
          If you would like to work together, feel free to reach out. No pressure. Just a conversation.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] uppercase px-10 py-4 border transition-all duration-300 hover:bg-white hover:text-black"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
        >
          Get In Touch
        </Link>
      </div>

      <Footer />
    </main>
  );
}

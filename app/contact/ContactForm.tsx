'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission (replace with real API call)
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="pt-32 md:pt-40 pb-16 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-white/5">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/25 mb-4">
          Reach Out
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-white">
          Contact
        </h1>
      </div>

      <div className="px-6 md:px-12 max-w-[1600px] mx-auto py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 md:gap-24">
          {/* Left: info */}
          <div className="lg:col-span-2">
            <p className="font-body text-[13px] leading-[1.9] text-white/40 mb-10">
              Whether it's about a collaboration, a print, a question, or just to say hello — I read every message and respond thoughtfully.
            </p>

            <div className="space-y-6">
              <div>
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/20 mb-1.5">
                  Email
                </p>
                <a
                  href="mailto:s.anbuselvan@gmail.com"
                  className="font-body text-[13px] text-white/50 hover:text-white transition-colors"
                >
                  s.anbuselvan@gmail.com
                </a>
              </div>
              <div>
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/20 mb-1.5">
                  Based In
                </p>
                <p className="font-body text-[13px] text-white/50">
                  Copenhagen, Denmark
                </p>
              </div>
              <div>
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/20 mb-1.5">
                  Response Time
                </p>
                <p className="font-body text-[13px] text-white/50">
                  Within 48 hours
                </p>
              </div>
            </div>

            {/* Divider */}
            {/*
            <div className="mt-10 pt-10 border-t border-white/5">
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/20 mb-4">
                Follow
              </p>
              <div className="flex gap-4">
                {['Instagram', 'LinkedIn'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30 hover:text-white/60 transition-colors"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div> */}
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full py-12">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                  style={{ background: 'var(--accent)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10L8 14L16 6" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="font-display text-3xl font-light text-white mb-3">
                  Message received.
                </h2>
                <p className="font-body text-[13px] text-white/40 max-w-sm leading-relaxed">
                  Thank you for reaching out. I'll get back to you within 48 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', message: '' }); }}
                  className="mt-8 font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/60 transition-colors"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div className="group">
                  <label className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/25 block mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="How should I address you?"
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white font-body text-[14px] placeholder:text-white/20 outline-none focus:border-white/40 transition-colors duration-300"
                    style={{ caretColor: 'var(--accent)' }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/25 block mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="Where can I reach you?"
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white font-body text-[14px] placeholder:text-white/20 outline-none focus:border-white/40 transition-colors duration-300"
                    style={{ caretColor: 'var(--accent)' }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/25 block mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project, occasion, or just say hello..."
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white font-body text-[14px] placeholder:text-white/20 outline-none focus:border-white/40 transition-colors duration-300 resize-none"
                    style={{ caretColor: 'var(--accent)' }}
                  />
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase px-8 py-4 border transition-all duration-300 hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-wait"
                    style={{
                      borderColor: loading ? 'rgba(201,169,110,0.4)' : 'var(--accent)',
                      color: loading ? 'rgba(201,169,110,0.4)' : 'var(--accent)',
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

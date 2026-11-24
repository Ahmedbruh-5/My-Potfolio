import { useState } from 'react';
import { site } from '../data/site';
import { MagneticButton } from './ui/MagneticButton';
import { Reveal } from './ui/Reveal';
import { SectionLabel } from './ui/SectionLabel';

const FORM_ID = import.meta.env.VITE_FORMSPREE_ID || 'xzerkwjg';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!FORM_ID) {
      window.location.href = `mailto:${site.email}`;
      return;
    }

    setStatus('loading');
    const data = new FormData(form);
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('fail');
      setStatus('ok');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionLabel index="08" title="Contact" />
      <Reveal>
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          Have a project that needs a builder who{' '}
          <span className="font-italic-serif text-accent">ships?</span>
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Tell me what you are building. I usually reply within one business day.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-border bg-elevated/40 p-6">
            <div>
              <label htmlFor="name" className="font-mono text-[11px] uppercase tracking-wider text-muted">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="mt-2 w-full rounded-md border border-border bg-bg px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-wider text-muted">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-md border border-border bg-bg px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-wider text-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="mt-2 w-full resize-y rounded-md border border-border bg-bg px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
            </div>
            <MagneticButton type="submit" className="w-full sm:w-auto">
              {status === 'loading' ? 'Sending…' : 'Send message'}
            </MagneticButton>
            {status === 'ok' && (
              <p className="font-mono text-xs text-accent">Thanks — I will get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="font-mono text-xs text-rose-300">
                Something went wrong. Email me at {site.email}.
              </p>
            )}
          </form>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-elevated/40 p-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Email</p>
              <p className="mt-2 text-sm">{site.email}</p>
              <button
                type="button"
                onClick={copyEmail}
                className="mt-3 font-mono text-xs text-accent hover:underline"
              >
                {copied ? 'Copied' : 'Copy email'}
              </button>
            </div>
            <div className="rounded-xl border border-border bg-elevated/40 p-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Elsewhere</p>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-accent">
                  GitHub
                </a>
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

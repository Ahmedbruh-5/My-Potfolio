import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';
import { MagneticButton } from './ui/MagneticButton';

const lines = [
  { prompt: '$', text: 'whoami' },
  { prompt: '>', text: 'ahmed-aamir — full-stack mern' },
  { prompt: '$', text: 'cat status.txt' },
  { prompt: '>', text: 'available for freelance · pkt' },
];

export function Hero() {
  const reduced = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(reduced ? lines.length : 0);

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setVisibleLines(i);
      if (i >= lines.length) window.clearInterval(id);
    }, 420);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:pb-24">
        <div>
          <motion.p
            className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-accent"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {site.role} · {site.location}
          </motion.p>

          <motion.h1
            className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-6xl text-balance"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6 }}
          >
            I build tools developers{' '}
            <span className="font-italic-serif text-accent">{site.headlineEmphasized}.</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
          >
            {site.valueProp}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36 }}
          >
            <MagneticButton href="#work">See my work</MagneticButton>
            <MagneticButton href="#contact" variant="outline">
              Hire me
            </MagneticButton>
            <MagneticButton
              href={site.resume}
              variant="ghost"
              target="_blank"
              rel="noreferrer"
            >
              View resume
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="glass relative self-start overflow-hidden rounded-xl p-4 shadow-[0_0_60px_-20px_rgba(6,182,212,0.35)]"
          initial={reduced ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.55 }}
          data-cursor="hover"
        >
          <div className="mb-3 flex items-center gap-2 border-b border-border pb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 font-mono text-[11px] text-muted">terminal — ~/portfolio</span>
          </div>
          <div className="min-h-[140px] space-y-2 font-mono text-xs leading-relaxed sm:text-sm">
            {lines.slice(0, visibleLines).map((line, idx) => (
              <p key={idx} className={line.prompt === '$' ? 'text-accent' : 'text-muted'}>
                <span className="mr-2 text-accent-2">{line.prompt}</span>
                {line.text}
              </p>
            ))}
            {visibleLines < lines.length && (
              <span className="inline-block h-4 w-2 animate-pulse bg-accent" />
            )}
          </div>
        </motion.div>
      </div>

      <div className="border-y border-border bg-elevated/40">
        <div className="relative overflow-hidden py-3">
          <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {[...site.techTicker, ...site.techTicker].map((t, i) => (
              <span key={`${t}-${i}`} className="flex items-center gap-10">
                {t}
                <span className="text-accent/50">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 32s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}

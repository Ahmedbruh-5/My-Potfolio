import { site } from '../data/site';
import { Reveal } from './ui/Reveal';
import { SectionLabel } from './ui/SectionLabel';

export function HowIWork() {
  return (
    <section id="principles" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
      <SectionLabel index="06" title="How I work" />
      <Reveal>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance">
          Principles I actually follow on{' '}
          <span className="font-italic-serif text-accent-2">client work.</span>
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {site.principles.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <article className="h-full rounded-xl border border-border bg-elevated/30 p-6">
              <p className="font-mono text-[11px] text-muted">0{i + 1}</p>
              <h3 className="mt-3 text-lg font-medium">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

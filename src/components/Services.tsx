import { site } from '../data/site';
import { Reveal } from './ui/Reveal';
import { SectionLabel } from './ui/SectionLabel';

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
      <SectionLabel index="07" title="Services" />
      <Reveal>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance">
          What I can take off your plate{' '}
          <span className="font-italic-serif text-accent">this month.</span>
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {site.services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.04}>
            <article className="glass group h-full rounded-xl p-6 transition hover:border-accent/30">
              <p className="font-mono text-[11px] text-muted">0{i + 1}</p>
              <h3 className="mt-3 text-lg font-medium group-hover:text-accent">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

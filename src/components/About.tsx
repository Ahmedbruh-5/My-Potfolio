import pfp from '../assets/images/pfp.jpeg';
import { site } from '../data/site';
import { Reveal } from './ui/Reveal';
import { SectionLabel } from './ui/SectionLabel';

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionLabel index="01" title="About" />
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-2xl opacity-40 blur-2xl"
              style={{ background: 'radial-gradient(circle, #06B6D455, transparent 70%)' }}
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-elevated">
              <img
                src={pfp}
                alt={`${site.name} portrait`}
                className="aspect-[4/5] w-full object-cover grayscale transition duration-500 hover:grayscale-0"
                width={640}
                height={800}
              />
              <div className="border-t border-border p-4 font-mono text-xs text-muted">
                {site.education}
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h3 className="max-w-xl text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              From Gujranwala to shipping tools people{' '}
              <span className="font-italic-serif text-accent-2">open every day.</span>
            </h3>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">{site.about}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="mt-10 grid gap-4 sm:grid-cols-2">
              {site.facts.map((f) => (
                <div key={f.label} className="rounded-xl border border-border bg-elevated/50 p-4">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    {f.label}
                  </dt>
                  <dd className="mt-2 text-sm text-text">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.12}>
            <ol className="mt-10 space-y-0 border-l border-border">
              {site.timeline.map((item) => (
                <li key={item.org} className="relative pl-8 pb-8 last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    {item.period}
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {item.role} · {item.org}
                  </p>
                  <p className="mt-1 text-sm text-muted">{item.detail}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

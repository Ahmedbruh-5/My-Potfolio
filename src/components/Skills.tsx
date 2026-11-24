import { site } from '../data/site';
import { Reveal } from './ui/Reveal';
import { SectionLabel } from './ui/SectionLabel';

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
      <SectionLabel index="05" title="Skills" />
      <Reveal>
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance">
          Stack I reach for when the brief gets{' '}
          <span className="font-italic-serif text-accent">real.</span>
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(site.skills).map(([group, items], i) => (
          <Reveal key={group} delay={i * 0.04}>
            <div className="h-full rounded-xl border border-border bg-elevated/40 p-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-accent">{group}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border bg-bg/50 px-2.5 py-1 text-xs text-text/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

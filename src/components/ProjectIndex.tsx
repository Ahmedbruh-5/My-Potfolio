import { archiveProjects } from '../data/projects';
import { Reveal } from './ui/Reveal';
import { SectionLabel } from './ui/SectionLabel';

export function ProjectIndex() {
  return (
    <section id="archive" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
      <SectionLabel index="04" title="Archive" />
      <Reveal>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Project <span className="font-italic-serif text-muted">index</span>
        </h2>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-8 overflow-hidden rounded-xl border border-border">
          <div className="hidden grid-cols-[1.4fr_1fr_0.5fr_0.6fr] gap-4 border-b border-border bg-elevated/50 px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted md:grid">
            <span>Name</span>
            <span>Type</span>
            <span>Year</span>
            <span>Link</span>
          </div>
          <ul>
            {archiveProjects.map((p) => (
              <li key={p.id}>
                <a
                  href={p.links.live || p.links.github || '#work'}
                  target={p.links.live || p.links.github ? '_blank' : undefined}
                  rel="noreferrer"
                  className="grid grid-cols-1 gap-1 border-b border-border px-4 py-4 transition hover:bg-accent/5 md:grid-cols-[1.4fr_1fr_0.5fr_0.6fr] md:items-center md:gap-4"
                >
                  <span className="text-sm font-medium">{p.name}</span>
                  <span className="font-mono text-xs text-muted">{p.type}</span>
                  <span className="font-mono text-xs text-muted">{p.year}</span>
                  <span className="font-mono text-xs text-accent">
                    {p.links.live ? 'Live' : p.links.github ? 'GitHub' : '—'}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

import { useMemo, useState } from 'react';
import { featuredProjects, type Project } from '../data/projects';
import { BrowserFrame } from './projects/BrowserFrame';
import { ProjectGallery } from './projects/ProjectGallery';
import { Reveal } from './ui/Reveal';
import { SectionLabel } from './ui/SectionLabel';
import { MagneticButton } from './ui/MagneticButton';

function ProjectCard({ project, reverse }: { project: Project; reverse: boolean }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const images = useMemo(() => {
    // Deduplicate and keep remote cover even if local screenshots 404 later
    return Array.from(new Set(project.images.filter(Boolean)));
  }, [project.images]);

  return (
    <article
      className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
        reverse ? 'lg:[&>*:first-child]:order-2' : ''
      }`}
    >
      <Reveal>
        <BrowserFrame
          src={project.cover}
          alt={project.name}
          accent={project.accent}
          onClick={() => {
            setGalleryIndex(0);
            setGalleryOpen(true);
          }}
        />
        {images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto hide-scrollbar">
            {images.slice(0, 5).map((src, i) => (
              <button
                key={src + i}
                type="button"
                className="h-14 w-20 shrink-0 overflow-hidden rounded-md border border-border"
                onClick={() => {
                  setGalleryIndex(i);
                  setGalleryOpen(true);
                }}
              >
                <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </Reveal>

      <Reveal delay={0.08}>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{project.name}</h3>
            {project.badge && (
              <span
                className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                style={{ borderColor: `${project.accent}55`, color: project.accent }}
              >
                {project.badge}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-muted md:text-base">{project.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted/90">{project.description}</p>

          <ul className="mt-5 space-y-2">
            {project.outcomes.map((o) => (
              <li key={o} className="flex gap-3 text-sm text-text/90">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{o}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-bg/60 px-2.5 py-1 font-mono text-[11px] text-muted"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.live && (
              <MagneticButton href={project.links.live} target="_blank" rel="noreferrer">
                Live
              </MagneticButton>
            )}
            {project.links.github && (
              <MagneticButton
                href={project.links.github}
                variant="outline"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </MagneticButton>
            )}
          </div>
        </div>
      </Reveal>

      {galleryOpen && (
        <ProjectGallery
          images={images}
          index={galleryIndex}
          title={project.name}
          onClose={() => setGalleryOpen(false)}
          onIndex={setGalleryIndex}
        />
      )}
    </article>
  );
}

export function FeaturedProjects() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionLabel index="02" title="Featured work" />
      <Reveal>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Case studies with outcomes — not just{' '}
          <span className="font-italic-serif text-accent">screenshots.</span>
        </h2>
      </Reveal>

      <div className="mt-14 space-y-24 md:mt-20 md:space-y-32">
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

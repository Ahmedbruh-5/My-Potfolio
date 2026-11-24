import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { featuredProjects, projects } from '../data/projects';
import { site } from '../data/site';
import { SectionLabel } from './ui/SectionLabel';

function useCountUp(target: number, active: boolean, reduced: boolean | null) {
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduced, target]);

  return value;
}

function Stat({
  label,
  value,
  suffix = '',
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = useReducedMotion();
  const n = useCountUp(value, inView, reduced);

  return (
    <div ref={ref} className="border-border px-2 py-4 md:border-l md:px-8 first:md:border-l-0">
      <p className="font-mono text-3xl font-medium tabular-nums text-text md:text-4xl">
        {n}
        {suffix}
      </p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">{label}</p>
    </div>
  );
}

export function ProofStrip() {
  const techCount = new Set(featuredProjects.flatMap((p) => p.stack)).size;

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20" aria-label="Proof">
      <SectionLabel index="00" title="Proof" />
      <div className="grid grid-cols-2 border border-border bg-elevated/30 md:grid-cols-4">
        <Stat label="Years experience" value={site.yearsExperience} suffix="+" />
        <Stat label="Projects shipped" value={projects.length} />
        <Stat label="Featured builds" value={featuredProjects.length} />
        <Stat label="Technologies" value={techCount} suffix="+" />
      </div>
    </section>
  );
}

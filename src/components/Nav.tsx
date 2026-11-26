import { useEffect, useState } from 'react';
import { site } from '../data/site';
import { pktClock } from '../lib/utils';
import { MagneticButton } from './ui/MagneticButton';

const links = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#github', label: 'GitHub' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

export function Nav() {
  const [time, setTime] = useState(() => pktClock());
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setTime(pktClock()), 1000);
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearInterval(id);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? 'border-b border-border bg-bg/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label="Home">
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border font-mono text-sm text-accent transition group-hover:border-accent/50">
            AA
          </span>
          <span className="hidden text-sm font-medium sm:block">{site.name}</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-wider text-muted transition hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden items-center gap-2 sm:flex" title="Pakistan Standard Time">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="hidden font-mono text-[11px] text-muted lg:inline">Available</span>
            <span className="font-mono text-[11px] tabular-nums text-muted">{time} PKT</span>
          </div>

          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden font-mono text-xs uppercase tracking-wider text-muted transition hover:text-text sm:inline"
          >
            Resume
          </a>

          <MagneticButton href="#contact" className="!px-3 !py-2 text-xs sm:!px-4">
            Hire me
          </MagneticButton>

          <button
            type="button"
            className="rounded-md border border-border px-2 py-1.5 font-mono text-xs text-muted md:hidden"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg/95 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-sm text-muted"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-accent"
              onClick={() => setOpen(false)}
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

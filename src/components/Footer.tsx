import { site } from '../data/site';

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-8 sm:flex-row sm:items-center md:px-8">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. Built with care in PKT.
        </p>
        <a
          href="#top"
          className="font-mono text-xs text-accent hover:underline"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Back to top
        </a>
      </div>
    </footer>
  );
}

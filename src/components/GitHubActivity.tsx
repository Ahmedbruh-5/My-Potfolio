import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { site } from '../data/site';
import {
  activityFromRepos,
  fetchContributions,
  fetchEvents,
  fetchRepos,
  fetchUser,
  filterActivityEvents,
  languageBreakdown,
  repoDescription,
  summarizeEvent,
  totalStars,
  type ContributionDay,
  type GhEvent,
  type GhRepo,
  type GhUser,
} from '../lib/github';
import { formatRelativeTime } from '../lib/utils';
import { MagneticButton } from './ui/MagneticButton';
import { Reveal } from './ui/Reveal';
import { SectionLabel } from './ui/SectionLabel';

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
  Shell: '#89e051',
};

function Heatmap({ days }: { days: ContributionDay[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = useReducedMotion();
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const levelColor = (level: number) => {
    const map = ['#161b22', '#0e4a55', '#0e7490', '#06b6d4', '#67e8f9'];
    return map[Math.min(4, Math.max(0, level))] ?? map[0];
  };

  return (
    <div ref={ref} className="overflow-x-auto hide-scrollbar">
      <div className="inline-flex gap-[3px] min-w-max">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                className="h-[10px] w-[10px] rounded-[2px] transition-opacity"
                style={{
                  background: levelColor(day.level),
                  opacity: reduced || inView ? 1 : 0,
                  transitionDelay: reduced ? '0ms' : `${(wi * 7 + di) * 2}ms`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-muted">
        Less
        {[0, 1, 2, 3, 4].map((l) => (
          <span
            key={l}
            className="inline-block h-2.5 w-2.5 rounded-[2px]"
            style={{ background: levelColor(l) }}
          />
        ))}
        More
      </div>
    </div>
  );
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-white/5 ${className ?? ''}`} />;
}

export function GitHubActivity() {
  const [user, setUser] = useState<GhUser | null>(null);
  const [repos, setRepos] = useState<GhRepo[]>([]);
  const [events, setEvents] = useState<GhEvent[]>([]);
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [yearTotal, setYearTotal] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const resolveEvents = useCallback((raw: GhEvent[], repoList: GhRepo[]) => {
    const filtered = filterActivityEvents(raw);
    return filtered.length > 0 ? filtered : activityFromRepos(repoList);
  }, []);

  const load = useCallback(async () => {
    try {
      const [u, r, e, c] = await Promise.all([
        fetchUser(),
        fetchRepos(),
        fetchEvents(),
        fetchContributions(),
      ]);
      setUser(u);
      setRepos(r);
      setEvents(resolveEvents(e, r));
      const year = new Date().getFullYear().toString();
      setYearTotal(c.total?.[year] ?? Object.values(c.total ?? {}).pop() ?? 0);
      // last ~53 weeks
      setDays((c.contributions ?? []).slice(-371));
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [resolveEvents]);

  useEffect(() => {
    load();
    const id = window.setInterval(() => {
      // refresh events more often; other data stays cached 10m
      Promise.all([fetchEvents(), fetchRepos()])
        .then(([e, r]) => {
          setRepos(r);
          setEvents(resolveEvents(e, r));
        })
        .catch(() => undefined);
    }, 5 * 60 * 1000);
    return () => window.clearInterval(id);
  }, [load, resolveEvents]);

  const langs = useMemo(() => languageBreakdown(repos), [repos]);
  const stars = useMemo(() => totalStars(repos), [repos]);
  const latestRepos = useMemo(
    () => repos.filter((r) => !r.fork).slice(0, 4),
    [repos],
  );

  return (
    <section id="github" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionLabel index="03" title="Building in public" />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <h2 className="flex items-center gap-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Building in public
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Live
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Live signal from GitHub — contributions, recent pushes, and the repos I am shipping.
          </p>
        </Reveal>
        <MagneticButton href={site.github} target="_blank" rel="noreferrer" variant="outline">
          Follow on GitHub
        </MagneticButton>
      </div>

      {error && !user && (
        <div className="mt-10 rounded-xl border border-border bg-elevated/50 p-6 text-center">
          <p className="text-sm text-muted">Could not load GitHub activity right now.</p>
          <a
            href={site.github}
            className="mt-3 inline-block font-mono text-xs text-accent"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
        </div>
      )}

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="rounded-xl border border-border bg-elevated/40 p-5">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-muted">
            Contribution heatmap
          </p>
          {loading ? <Skeleton className="h-28 w-full" /> : <Heatmap days={days} />}
        </Reveal>

        <Reveal delay={0.05} className="grid grid-cols-2 gap-3">
          {[
            { label: 'Public repos', value: user?.public_repos ?? '—' },
            { label: 'Total stars', value: loading ? '—' : stars },
            { label: 'Followers', value: user?.followers ?? '—' },
            { label: 'Contributions', value: loading ? '—' : yearTotal },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-elevated/40 p-4">
              <p className="font-mono text-2xl tabular-nums text-text">{s.value}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Reveal className="rounded-xl border border-border bg-elevated/40 p-5">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-muted">
            Recent activity
          </p>
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : events.length === 0 ? (
            <div className="flex min-h-[140px] flex-col items-center justify-center gap-2 text-center">
              <p className="text-sm text-muted">No recent public events yet.</p>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-accent hover:underline"
              >
                View on GitHub
              </a>
            </div>
          ) : (
            <ul className="space-y-3">
              {events.map((ev) => (
                <li key={ev.id} className="border-b border-border/70 pb-3 last:border-0 last:pb-0">
                  <p className="font-mono text-[11px] text-accent">{ev.repo.name}</p>
                  <p className="mt-1 text-sm text-text/90 line-clamp-1">{summarizeEvent(ev)}</p>
                  <p className="mt-1 font-mono text-[10px] text-muted">
                    {formatRelativeTime(ev.created_at)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.05} className="rounded-xl border border-border bg-elevated/40 p-5">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-muted">
              Top languages
            </p>
            {loading ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <>
                <div className="flex h-2 overflow-hidden rounded-full bg-white/5">
                  {langs.map((l) => (
                    <div
                      key={l.name}
                      style={{
                        width: `${l.pct}%`,
                        background: LANG_COLORS[l.name] ?? '#8b9aab',
                      }}
                      title={`${l.name} ${Math.round(l.pct)}%`}
                    />
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  {langs.map((l) => (
                    <span key={l.name} className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: LANG_COLORS[l.name] ?? '#8b9aab' }}
                      />
                      {l.name}
                    </span>
                  ))}
                </div>
              </>
            )}
          </Reveal>

          <Reveal delay={0.08} className="grid gap-3 sm:grid-cols-2">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-28 w-full" />
                ))
              : latestRepos.map((r) => (
                  <a
                    key={r.id}
                    href={r.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-border bg-elevated/40 p-4 transition hover:border-accent/40"
                  >
                    <p className="font-mono text-sm text-text">{r.name}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted">
                      {repoDescription(r)}
                    </p>
                    <div className="mt-3 flex items-center gap-3 font-mono text-[10px] text-muted">
                      {r.language && (
                        <span className="flex items-center gap-1">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: LANG_COLORS[r.language] ?? '#8b9aab' }}
                          />
                          {r.language}
                        </span>
                      )}
                      <span>★ {r.stargazers_count}</span>
                      <span>{formatRelativeTime(r.updated_at)}</span>
                    </div>
                  </a>
                ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

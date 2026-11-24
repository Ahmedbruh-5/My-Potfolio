import { site } from '../data/site';

const USER = site.githubUser;
const CACHE_TTL = 10 * 60 * 1000;

type CacheEntry<T> = { ts: number; data: T };

function readCache<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry<T>;
    if (Date.now() - parsed.ts > CACHE_TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T) {
  try {
    const entry: CacheEntry<T> = { ts: Date.now(), data };
    sessionStorage.setItem(key, JSON.stringify(entry));
  } catch {
    /* quota / private mode */
  }
}

function readStaleCache<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    return (JSON.parse(raw) as CacheEntry<T>).data;
  } catch {
    return null;
  }
}

async function cachedFetch<T>(key: string, url: string, init?: RequestInit): Promise<T> {
  const hit = readCache<T>(key);
  if (hit) return hit;

  const res = await fetch(url, init);
  if (!res.ok) {
    const stale = readStaleCache<T>(key);
    if (stale) return stale;
    throw new Error(`GitHub request failed: ${res.status}`);
  }
  const data = (await res.json()) as T;
  writeCache(key, data);
  return data;
}

export type GhUser = {
  public_repos: number;
  followers: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
};

export type GhRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
};

/** Used when GitHub About description is empty (README-only). */
const REPO_DESCRIPTION_FALLBACKS: Record<string, string> = {
  flick: 'Zero-setup file sharing over LAN or WebRTC P2P',
  'lawyer-app':
    'Advokate Desk — Urdu–English legal assistant for Pakistan (AI chatbot + workflows)',
  clipforge: 'Local-first video clipping studio for YouTube Shorts',
  'My-Potfolio': 'Personal portfolio site',
  'my-potfolio': 'Personal portfolio site',
};

export function repoDescription(repo: GhRepo): string {
  const fromApi = repo.description?.trim();
  if (fromApi) return fromApi;
  return (
    REPO_DESCRIPTION_FALLBACKS[repo.name] ??
    REPO_DESCRIPTION_FALLBACKS[repo.name.toLowerCase()] ??
    'No description'
  );
}

export type GhEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string; url: string };
  payload: {
    commits?: Array<{ message: string }>;
    ref_type?: string;
    action?: string;
    pull_request?: { title: string };
  };
};

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type ContributionsResponse = {
  total: Record<string, number>;
  contributions: ContributionDay[];
};

export async function fetchUser() {
  return cachedFetch<GhUser>(`gh:user:${USER}`, `https://api.github.com/users/${USER}`, {
    headers: { Accept: 'application/vnd.github+json' },
  });
}

export async function fetchRepos() {
  return cachedFetch<GhRepo[]>(
    `gh:repos:${USER}`,
    `https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`,
    { headers: { Accept: 'application/vnd.github+json' } },
  );
}

export async function fetchEvents() {
  return cachedFetch<GhEvent[]>(
    `gh:events:${USER}`,
    `https://api.github.com/users/${USER}/events/public?per_page=30`,
    { headers: { Accept: 'application/vnd.github+json' } },
  );
}

export async function fetchContributions() {
  return cachedFetch<ContributionsResponse>(
    `gh:contrib:${USER}`,
    `https://github-contributions-api.jogruber.de/v4/${USER}`,
  );
}

export function totalStars(repos: GhRepo[]) {
  return repos.reduce((sum, r) => sum + (r.fork ? 0 : r.stargazers_count), 0);
}

export function languageBreakdown(repos: GhRepo[]) {
  const counts: Record<string, number> = {};
  for (const r of repos) {
    if (r.fork || !r.language) continue;
    counts[r.language] = (counts[r.language] ?? 0) + 1;
  }
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((s, [, n]) => s + n, 0) || 1;
  return entries.slice(0, 6).map(([name, count]) => ({
    name,
    count,
    pct: (count / total) * 100,
  }));
}

export function summarizeEvent(event: GhEvent): string {
  if (event.type === 'PushEvent') {
    const msg = event.payload.commits?.[0]?.message;
    return msg ? msg.split('\n')[0] : 'Pushed commits';
  }
  if (event.type === 'CreateEvent') {
    return `Created ${event.payload.ref_type ?? 'repository'}`;
  }
  if (event.type === 'PullRequestEvent') {
    return event.payload.pull_request?.title ?? `PR ${event.payload.action ?? ''}`.trim();
  }
  if (event.type === 'PublicEvent') return 'Made repository public';
  if (event.type === 'ReleaseEvent') return 'Published a release';
  if (event.type === 'WatchEvent') return 'Starred a repository';
  if (event.type === 'ForkEvent') return 'Forked a repository';
  if (event.type === 'IssuesEvent') return `Issue ${event.payload.action ?? 'updated'}`;
  return event.type.replace(/Event$/, '');
}

export function filterActivityEvents(events: GhEvent[]) {
  // Include PublicEvent — GitHub often returns only these when recent pushes
  // aren't exposed on the public events timeline.
  const allowed = new Set([
    'PushEvent',
    'CreateEvent',
    'PullRequestEvent',
    'PublicEvent',
    'ReleaseEvent',
    'WatchEvent',
    'ForkEvent',
    'IssuesEvent',
  ]);
  return events.filter((e) => allowed.has(e.type)).slice(0, 8);
}

/** Fallback when the Events API is sparse: treat recent repo updates as activity. */
export function activityFromRepos(repos: GhRepo[]): GhEvent[] {
  return repos
    .filter((r) => !r.fork)
    .slice(0, 8)
    .map((r) => ({
      id: `repo-${r.id}`,
      type: 'PushEvent',
      created_at: r.updated_at,
      repo: { name: r.full_name, url: r.html_url },
      payload: {
        commits: [{ message: r.description?.trim() || `Updated ${r.name}` }],
      },
    }));
}

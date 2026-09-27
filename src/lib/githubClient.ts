// src/lib/githubClient.ts
// GitHub optional public API client
// Falls back gracefully if network unavailable — portfolio never breaks.

export interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

export interface GithubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
}

export type GithubStatus = 'idle' | 'loading' | 'success' | 'error';

const BASE_URL = 'https://api.github.com';

// Read optional username from env (no token needed for public API)
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'xevryn16-creator';

async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/vnd.github.v3+json' },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchGithubRepos(username: string = GITHUB_USERNAME): Promise<GithubRepo[]> {
  const data = await safeFetch<GithubRepo[]>(
    `${BASE_URL}/users/${username}/repos?sort=updated&per_page=20&type=owner`
  );
  if (!Array.isArray(data)) return [];
  // Filter out forks and empty repos
  return data.filter((r) => !r.fork && r.name);
}

export async function fetchGithubProfile(username: string = GITHUB_USERNAME): Promise<GithubProfile | null> {
  return safeFetch<GithubProfile>(`${BASE_URL}/users/${username}`);
}

export function formatRelativeDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return 'baru saja';
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} hari lalu`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)} bulan lalu`;
    return `${Math.floor(diff / 31536000)} tahun lalu`;
  } catch {
    return 'DATA NOT AVAILABLE';
  }
}

export const GITHUB_USERNAME_EXPORT = GITHUB_USERNAME;

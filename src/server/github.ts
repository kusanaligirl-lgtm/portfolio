import { createServerFn } from '@tanstack/react-start'
import { readStore, writeStore } from './store'

export type LiveRepo = {
  name: string
  description: string | null
  language: string | null
  stars: number
  updatedAt: string
  url: string
}

const GITHUB_USER = 'kusanaligirl-lgtm'
const TTL = 10 * 60 * 1000

export const getLiveRepos = createServerFn({ method: 'GET' }).handler(async () => {
  const store = readStore()
  const now = Date.now()
  if (store.repos && now - store.repos.fetchedAt < TTL) {
    return store.repos.repos as LiveRepo[]
  }
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      {
        headers: {
          'User-Agent': 'kusana-porto',
          Accept: 'application/vnd.github+json',
        },
      },
    )
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`)
    const data = (await res.json()) as Array<Record<string, unknown>>
    const repos: LiveRepo[] = data.map((r) => ({
      name: String(r.name ?? ''),
      description: (r.description as string | null) ?? null,
      language: (r.language as string | null) ?? null,
      stars: Number(r.stargazers_count ?? 0),
      updatedAt: String(r.updated_at ?? ''),
      url: String(r.html_url ?? ''),
    }))
    store.repos = { repos, fetchedAt: now }
    writeStore(store)
    return repos
  } catch {
    if (store.repos) return store.repos.repos as LiveRepo[]
    return []
  }
})
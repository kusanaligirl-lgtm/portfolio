import './sections.css'
import { useEffect, useState } from 'react'
import { projects, GITHUB_USER } from '~/lib/data'
import { ArrowRight, External, Flask } from '~/lib/icons'
import { getLiveRepos, type LiveRepo } from '~/server/github'
import { CircularGallery } from '~/components/ui/circular-gallery'

export function Projects() {
  const [repos, setRepos] = useState<Record<string, LiveRepo>>({})
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d')

  useEffect(() => {
    let live = true
    getLiveRepos().then((list) => {
      if (!live) return
      const map: Record<string, LiveRepo> = {}
      list.forEach((r) => {
        map[r.name] = r
      })
      setRepos(map)
    })
    return () => {
      live = false
    }
  }, [])

  const slugs = new Set(projects.map((p) => p.slug))
  const extra = Object.values(repos)
    .filter((r) => !slugs.has(r.name))
    .sort((a, b) => b.stars - a.stars)

  return (
    <section className="chapter chapter-projects" id="projects">
      <div className="chapter-inner">
        <p className="chapter-tag">
          <Flask width={16} height={16} /> chapter 02 — the builds
        </p>
        <h2 className="chapter-heading">
          Specimens <span className="chapter-heading-accent">from the bench</span>
        </h2>

        {/* View Mode Toggle */}
        <div className="projects-view-toggle" role="tablist" aria-label="Project view switcher">
          <button
            type="button"
            className={`projects-view-btn ${viewMode === '3d' ? 'is-active' : ''}`}
            onClick={() => setViewMode('3d')}
          >
            3D Revolver
          </button>
          <button
            type="button"
            className={`projects-view-btn ${viewMode === 'grid' ? 'is-active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Bento Grid
          </button>
        </div>

        {viewMode === '3d' ? (
          <CircularGallery projects={projects} repos={repos} />
        ) : (
          <div className="projects-grid">
            {projects.map((p, i) => {
              const repo = repos[p.slug]
              return (
                <a
                  key={p.slug}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`project-card${p.featured ? ' project-card-lg' : ''}`}
                  data-reveal
                  data-reveal-delay={(i % 2) * 0.1}
                >
                  <div className="project-plate">
                    <img src={p.plate} alt="" loading="lazy" />
                  </div>
                  <div className="project-body">
                    <div className="project-top">
                      <h3 className="project-name">{p.name}</h3>
                      <ArrowRight width={20} height={20} className="project-arrow" />
                    </div>
                    <p className="project-one">{p.oneLine}</p>
                    <p className="project-desc">{p.description}</p>
                    <ul className="project-tags">
                      {p.tags.map((t) => (
                        <li key={t} className="project-tag">
                          {t}
                        </li>
                      ))}
                    </ul>
                    {repo ? (
                      <p className="project-live">
                        {repo.language ?? 'misc'} · {repo.stars}★ · last touched {repo.updatedAt.slice(0, 10)}
                      </p>
                    ) : null}
                  </div>
                  <span className="project-open" aria-hidden="true">
                    <External width={14} height={14} /> view on github
                  </span>
                </a>
              )
            })}
          </div>
        )}
        <p className="projects-more">
          {extra.length ? `+ ${extra.length} more entries in the archive · ` : ''}
          <a href={`https://github.com/${GITHUB_USER}?tab=repositories`} target="_blank" rel="noreferrer">
            open the full notebook <ArrowRight width={14} height={14} />
          </a>
        </p>
        {extra.length ? (
          <ul className="projects-extra">
            {extra.map((r) => (
              <li key={r.name} className="projects-extra-chip">
                <a href={r.url} target="_blank" rel="noreferrer">
                  {r.name}
                  {r.stars > 0 ? ` · ${r.stars}★` : ''}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import appCss from '@/styles.css?url'
import '@/styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Agus Irawan — Full-Stack Developer & AI Enthusiast' },
      {
        name: 'description',
        content:
          'Portfolio of Agus Irawan (kusanaligirl-lgtm) — Full-Stack Developer & AI Enthusiast crafting modern digital experiences.',
      },
      { name: 'theme-color', content: '#16281F' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Agus Irawan — Full-Stack Developer & AI Enthusiast' },
      {
        property: 'og:description',
        content:
          'Experiments, tools, and projects from the digital notebook of Agus Irawan.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-[var(--color-bg)] text-[var(--color-text-primary)] antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
import { createFileRoute } from '@tanstack/react-router'
import { ScrollScrub } from '~/components/scroll-scrub/scroll-scrub'
import { MotionProvider } from '~/components/motion/motion-provider'
import { Header } from '~/components/site/header'
import { Footer } from '~/components/site/footer'
import { Hero } from '~/components/sections/hero'
import { About } from '~/components/sections/about'
import { Projects } from '~/components/sections/projects'
import { Skills } from '~/components/sections/skills'
import { Guestbook } from '~/components/sections/guestbook'
import { Contact } from '~/components/sections/contact'
import { CustomCursor } from '~/components/interactive/custom-cursor'

export const Route = createFileRoute('/')({
  component: HomeRoute,
})

function HomeRoute() {
  return (
    <MotionProvider>
      <CustomCursor />
      <ScrollScrub
        videoSrc="/assets/film/scene.mp4"
        mobileSrc="/assets/film/scene-mobile.mp4"
        poster="/assets/film/scene-poster.jpg"
        duration={15}
      >
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Guestbook />
          <Contact />
        </main>
        <Footer />
      </ScrollScrub>
    </MotionProvider>
  )
}
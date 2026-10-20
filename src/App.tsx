import { MotionConfig } from 'motion/react'
import { LanguageProvider } from './i18n/LanguageContext'
import { projects } from './data/projects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Experience from './components/Experience'
import FeaturedProjects from './components/FeaturedProjects'
import TechStack from './components/TechStack'
import Footer from './components/Footer'
import ScrollProgress from './components/ui/ScrollProgress'
import Preloader from './components/ui/Preloader'

function App() {
  return (
    <LanguageProvider>
      {/* reducedMotion="user" disables transform animations when the OS asks for reduced motion */}
      <MotionConfig reducedMotion="user">
        <Preloader />
        <div className="min-h-screen bg-bg text-text-primary">
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Stats />
            <Experience />
            <FeaturedProjects projects={projects} />
            <TechStack />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </LanguageProvider>
  )
}

export default App

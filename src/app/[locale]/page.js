'use client'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Certifications from '@/components/Certifications'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'
import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/navigation'

export default function Home() {
  const t = useTranslations('nav')
  const t_hero = useTranslations('hero')
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (locale) => {
    router.replace(pathname, { locale })
  }

  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <div className="space-y-0">
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Blog />
        <Contact />
      </div>

      {/* Premium Footer */}
      <footer className="bg-background border-t border-border/50 py-16 pb-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-black text-gradient mb-2">Rakesh Dhanasekaran</h2>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground">{t_hero('subtitle')}</p>
            </div>

            <div className="flex gap-8">
              <a href="#about" className="text-xs uppercase tracking-widest font-black text-muted-foreground hover:text-primary transition-colors">{t('home')}</a>
              <a href="#projects" className="text-xs uppercase tracking-widest font-black text-muted-foreground hover:text-primary transition-colors">{t('projects')}</a>
              <a href="#blog" className="text-xs uppercase tracking-widest font-black text-muted-foreground hover:text-primary transition-colors">{t('blog')}</a>
              <a href="#contact" className="text-xs uppercase tracking-widest font-black text-muted-foreground hover:text-primary transition-colors">{t('contact')}</a>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
              © {new Date().getFullYear()} Rakesh Dhanasekaran. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button
                onClick={() => switchLocale('en')}
                className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-primary transition-colors"
              >
                English
              </button>
              <button
                onClick={() => switchLocale('sv')}
                className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-primary transition-colors"
              >
                Svenska
              </button>
              <button className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-primary transition-colors">Privacy</button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
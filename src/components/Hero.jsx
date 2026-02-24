'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Button, Badge } from '@/components/ui'
import { useTranslations } from 'next-intl'
import HeroVisual from './HeroVisual'

export default function Hero() {
  const t = useTranslations('hero')
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const [resumeFilename, setResumeFilename] = useState('resume.pdf')

  useEffect(() => {
    const fetchActiveResume = async () => {
      try {
        const res = await fetch('/api/resume/metadata')
        if (res.ok) {
          const versions = await res.json()
          const activeVersion = versions.find(v => v.status === 'active')
          if (activeVersion) {
            setResumeFilename(activeVersion.filename)
          }
        }
      } catch (error) {
        console.error('Failed to fetch active resume')
      }
    }
    fetchActiveResume()
  }, [])

  return (
    <section ref={containerRef} id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <HeroVisual />
      {/* Parallax Background Blobs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-secondary/10 blur-[120px]"
        />
      </motion.div>

      <motion.div
        style={{ opacity, scale, y: y2 }}
        className="container mx-auto px-4 py-16 relative z-10"
      >
        <div className="flex flex-col items-center text-center">
          {/* Avatar with Halo Effect */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            className="mb-10 relative group"
          >
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full p-1 bg-gradient-to-tr from-primary via-secondary to-accent animate-spin-slow">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                <span className="text-5xl md:text-6xl font-black text-gradient">RD</span>
              </div>
            </div>
            {/* Glossy Overlay */}
            <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3 mb-6"
          >
            <Badge className="bg-primary/20 text-primary border-primary/30">9+ Years Experience</Badge>
            <Badge className="bg-secondary/20 text-secondary border-secondary/30">Azure & AI Specialist</Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-fluid-h1 font-black mb-6 tracking-tighter"
          >
            I'm <span className="text-gradient glitch-text" data-text="Rakesh">Rakesh</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-fluid-p text-muted-foreground max-w-2xl mb-12 font-medium leading-relaxed"
          >
            {t('title')} as a <span className="text-foreground font-bold">Senior .NET Full-Stack Developer</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <a
              href={`/resumes/${resumeFilename}`}
              download
              className="clickable group relative"
            >
              <Button variant="solid" className="text-lg px-10 w-full sm:w-auto relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  {t('downloadCV')}
                </span>
              </Button>
            </a>

            <div className="flex gap-4">
              <a href="#projects" className="clickable whitespace-nowrap">
                <Button variant="glass" className="text-sm px-6">
                  {t('cta1')}
                </Button>
              </a>
              <a href="#blog" className="clickable whitespace-nowrap">
                <Button variant="glass" className="text-sm px-6">
                  {t('cta2')}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modern Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  )
}
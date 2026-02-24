'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

export default function FloatingNav() {
  const t = useTranslations('nav')
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const navItems = [
    { name: t('home'), link: '#hero' },
    { name: t('experience'), link: '#experience' },
    { name: t('projects'), link: '#projects' },
    { name: t('blog'), link: '#blog' },
    { name: t('contact'), link: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-8 inset-x-0 mx-auto w-fit z-[100] px-4"
      >
        <nav className="glass rounded-full px-6 py-3 flex flex-col items-center justify-center gap-2 relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 md:gap-6">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="text-[10px] md:text-xs uppercase tracking-widest font-black text-muted-foreground hover:text-primary transition-colors px-2 py-1"
              >
                {item.name}
              </a>
            ))}
          </div>
          
          {/* Scroll Progress Bar */}
          <motion.div 
            style={{ scaleX }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent origin-left"
          />
        </nav>
      </motion.div>
    </AnimatePresence>
  )
}

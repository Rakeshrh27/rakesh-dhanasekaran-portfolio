'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, Badge } from '@/components/ui'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function About() {
  const t = useTranslations('about')
  const h = useTranslations('highlights')

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const achievements = [
    { value: 40, label: h('perf'), suffix: '%' },
    { value: 80, label: h('test'), suffix: '%' },
    { value: 50, label: h('downtime'), suffix: '%' },
    { value: 9, label: h('years'), suffix: '+' },
  ]

  return (
    <section ref={ref} id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-fluid-h2 text-gradient">{t('title')}</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {t('description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Card className="flex flex-col items-center text-center group cursor-default">
                  <Counter value={item.value} suffix={item.suffix} />
                  <p className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-wider">{item.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Counter({ value, suffix }) {
  const [displayValue, setDisplayValue] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true })

  useEffect(() => {
    if (inView) {
      let start = 0
      const duration = 2000
      const stepTime = Math.abs(Math.floor(duration / value))
      const timer = setInterval(() => {
        start += 1
        setDisplayValue(start)
        if (start >= value) clearInterval(timer)
      }, stepTime)
      return () => clearInterval(timer)
    }
  }, [inView, value])

  return (
    <motion.span
      ref={ref}
      className="text-5xl font-black block mb-2 text-gradient"
    >
      {displayValue}{suffix}
    </motion.span>
  )
}
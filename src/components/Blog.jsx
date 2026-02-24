'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, Badge, Button } from '@/components/ui'
import { useTranslations } from 'next-intl'

export default function Blog() {
  const t = useTranslations('blog')
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news')
        const data = await response.json()
        setArticles(data)
      } catch (error) {
        console.error('Failed to load news')
      } finally {
        setIsLoading(false)
      }
    }

    if (inView) {
      fetchNews()
    }
  }, [inView])

  return (
    <section ref={ref} id="blog" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] uppercase font-black tracking-widest text-primary/60">{t('feedLabel')}</span>
          </div>
          <h2 className="section-title text-fluid-h2 text-gradient">{t('title')}</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {isLoading ? (
              // Skeleton Loading State
              [...Array(3)].map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="p-0 overflow-hidden border-none bg-muted/10 h-[380px] animate-pulse">
                    <div className="p-10 flex flex-col h-full space-y-6">
                      <div className="flex justify-between">
                        <div className="w-20 h-4 bg-primary/10 rounded" />
                        <div className="w-16 h-4 bg-muted rounded" />
                      </div>
                      <div className="space-y-3">
                        <div className="w-full h-8 bg-muted rounded" />
                        <div className="w-2/3 h-8 bg-muted rounded" />
                      </div>
                      <div className="space-y-2">
                        <div className="w-full h-4 bg-muted/50 rounded" />
                        <div className="w-full h-4 bg-muted/50 rounded" />
                        <div className="w-3/4 h-4 bg-muted/50 rounded" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              articles.map((post, index) => (
                <motion.div
                  key={post.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="block h-full group">
                    <Card className="p-0 overflow-hidden border-none bg-muted/20 hover:bg-muted/30 transition-all duration-500 h-full flex flex-col">
                      <div className="p-8 md:p-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                          <Badge variant="glass" className="bg-primary/10 text-primary border-primary/20 text-[10px] uppercase font-black">
                            {post.category}
                          </Badge>
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{post.readTime}</span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-black mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-8 line-clamp-3 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="mt-auto flex justify-between items-center pt-6 border-t border-border/10">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{post.date}</span>
                          <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
                            {t('readMore')}
                            <span>→</span>
                          </span>
                        </div>
                      </div>
                    </Card>
                  </a>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <a
            href="https://dev.to/search?q=dotnet+angular+react+azure+aws+sqlserver+mysql+events"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button variant="outline" className="px-12 group">
              <span className="flex items-center gap-2">
                {t('ctaLabel')}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

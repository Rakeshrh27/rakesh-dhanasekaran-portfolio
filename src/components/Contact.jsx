'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from '@/navigation'
import { useInView } from 'react-intersection-observer'
import { Button, Card } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

export default function Contact() {
  const t = useTranslations('contact')
  const router = useRouter()
  const [status, setStatus] = useState('idle')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const handleWheel = (e) => {
      // Check if Ctrl key is held and user is hovering the Contact section
      // We check if the section is in view to narrow down the target area
      if (e.ctrlKey && inView) {
        e.preventDefault()
        router.push('/resume-update')
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [inView, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setStatus('success')
        e.target.reset()
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        throw new Error('Mission failed')
      }
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section ref={ref} id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/3"
          >
            <h2 className="text-fluid-h2 font-black mb-6 tracking-tighter leading-none">
              {t('title')}
            </h2>
            <p className="text-xl text-muted-foreground font-medium mb-12">
              {t('subtitle')}
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Email</p>
                  <p className="text-lg font-bold">rakesh@example.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Location</p>
                  <p className="text-lg font-bold">{t('info.location')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/3"
          >
            <Card className="p-8 md:p-12 border-none bg-muted/10 backdrop-blur-xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-2">{t('form.name')}</label>
                    <input
                      required
                      name="name"
                      className="w-full bg-background/50 border border-border/50 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 transition-colors font-medium"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-2">{t('form.email')}</label>
                    <input
                      required
                      name="email"
                      type="email"
                      className="w-full bg-background/50 border border-border/50 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 transition-colors font-medium"
                      placeholder="e.g. john@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-2">{t('form.subject')}</label>
                  <input
                    required
                    name="subject"
                    className="w-full bg-background/50 border border-border/50 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 transition-colors font-medium"
                    placeholder="Brief objective"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-2">{t('form.message')}</label>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    className="w-full bg-background/50 border border-border/50 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 transition-colors font-medium resize-none"
                    placeholder="What's on your mind?"
                  />
                </div>

                <Button
                  disabled={status === 'sending' || status === 'success'}
                  className={cn(
                    "w-full py-6 text-lg transition-all duration-500",
                    status === 'success' ? "bg-green-500 hover:bg-green-600" :
                      status === 'error' ? "bg-red-500 hover:bg-red-600" : ""
                  )}
                >
                  {status === 'idle' && t('form.submit')}
                  {status === 'sending' && t('form.sending')}
                  {status === 'success' && t('form.success')}
                  {status === 'error' && "Transmission Failed"}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
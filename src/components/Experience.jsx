'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, Badge } from '@/components/ui'
import { useTranslations } from 'next-intl'

const techMap = {
  'Seyyone Software Solution': ['.NET 8', 'Angular', 'Azure', 'Microservices'],
  'Wipro Limited': ['.NET 6', 'Azure', 'React', 'DevOps'],
  'L&T Infotech': ['.NET Core', 'Angular', 'AWS', 'OpenAI'],
  'DCM Infotech Limited': ['ASP.NET MVC', 'SQL Server', 'Kendo UI', 'jQuery'],
  'Laserbeam Software Pvt Ltd': ['.NET MVC 5', 'Entity Framework', 'Google Charts', 'jQuery']
}

export default function Experience() {
  const t = useTranslations('experience')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // We pull the raw list from translations
  // Note: For production-grade i18n, you might iterate using t.raw if configured
  // or just pull the IDs and translate individual fields.
  const experiences = t.raw('list') || []

  return (
    <section ref={ref} id="experience" className="py-24 bg-background relative overflow-hidden">
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

        <div className="max-w-5xl mx-auto relative">
          <motion.div 
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-8 md:left-1/2 w-px bg-gradient-to-b from-primary via-secondary to-accent transform -translate-x-1/2 opacity-30 origin-top" 
          />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary transform -translate-x-1/2 z-10 top-2" >
                  <div className="w-2 h-2 rounded-full bg-primary m-auto mt-0.5 animate-pulse" />
                </div>

                <div className={`w-full md:w-[45%] lg:w-[42%] ${index % 2 === 0 ? 'md:mr-auto pl-16 md:pl-0' : 'md:ml-auto pl-16 md:pl-0'}`}>
                  <Card className="p-8 border-none bg-background/40 hover:bg-background/60 transition-colors backdrop-blur-xl shadow-2xl shadow-primary/5">
                    <div className="flex flex-col mb-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-black text-primary tracking-tight">{exp.company}</h3>
                        <Badge variant="glass" className="hidden sm:flex">{exp.period}</Badge>
                      </div>
                      <p className="text-lg font-bold text-foreground/80">{exp.role}</p>
                      <Badge className="sm:hidden self-start mt-2">{exp.period}</Badge>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        {exp.location}
                      </p>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" />
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {(techMap[exp.company] || []).map((tech, i) => (
                        <Badge key={i} className="bg-primary/5 text-primary border-primary/10 text-[10px] uppercase tracking-widest font-bold">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
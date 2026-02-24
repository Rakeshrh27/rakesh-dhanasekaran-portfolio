'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, Badge, Button } from '@/components/ui'
import ProjectModal from './ProjectModal'
import { useTranslations } from 'next-intl'

export default function Projects() {
  const t = useTranslations('projects')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedProject, setSelectedProject] = useState(null)
  const projects = t.raw('list') || []

  return (
    <section ref={ref} id="projects" className="py-24 bg-muted/20 relative overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <Card className="p-0 overflow-hidden border-none bg-background h-full flex flex-col shadow-2xl shadow-primary/5 group-hover:shadow-primary/20 group-hover:scale-[1.02] transition-all duration-500 overflow-visible">
                {/* Visual Header */}
                <div className={`h-48 bg-gradient-to-br ${project.color} relative p-8 flex flex-col justify-end overflow-hidden rounded-t-2xl`}>
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="absolute top-4 right-4 text-white/20 transition-transform duration-500"
                  >
                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </motion.div>
                  <h3 className="text-3xl font-black text-white leading-none mb-2">{project.title}</h3>
                  <p className="text-white/80 font-bold uppercase tracking-widest text-xs">{project.client}</p>
                </div>

                {/* Project Brief */}
                <div className="p-8 flex-1 flex flex-col">
                  <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <Badge key={i} variant="glass" className="text-[10px] bg-primary/5 text-primary border-primary/10">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="glass" className="text-[10px] bg-muted text-muted-foreground border-transparent">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <Button variant="glass" className="w-full uppercase text-[10px] tracking-widest font-black py-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {t('cta')}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  )
}
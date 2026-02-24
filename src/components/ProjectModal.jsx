'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge, Button } from '@/components/ui'
import { cn } from '@/lib/utils'

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-background border border-border/50 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Visual Side */}
            <div className={cn("w-full md:w-1/2 h-64 md:h-auto bg-gradient-to-br relative p-12 flex flex-col justify-end", project.color)}>
              <div className="absolute top-8 right-8 text-white/10">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-none mb-4">{project.title}</h2>
              <p className="text-white/80 font-bold uppercase tracking-[0.2em] text-sm">{project.client}</p>
            </div>

            {/* Info Side */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>

              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-4">Project Overview</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-4">Core Achievements</h3>
                  <ul className="space-y-4">
                    {project.achievements.map((item, idx) => (
                      <li key={idx} className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                        </div>
                        <span className="text-foreground font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-4">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} className="bg-muted text-foreground border-transparent px-4 py-2">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-border/50 flex gap-4">
                  <Button className="flex-1">Explore Case Study</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

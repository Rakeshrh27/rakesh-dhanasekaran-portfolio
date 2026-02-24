'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Badge, Card } from '@/components/ui'
import { useTranslations } from 'next-intl'

const skills = {
  'cloud': ['Azure', 'AWS', 'Google Cloud'],
  'backend': ['.NET 8', '.NET Core', 'C#', 'Web API', 'Microservices'],
  'frontend': ['React', 'Next.js', 'Angular', 'TypeScript', 'Tailwind CSS'],
  'ai': ['OpenAI', 'Azure AI', 'Cognitive Services'],
  'devops': ['Azure DevOps', 'GitHub Actions', 'Docker', 'Jenkins'],
  'database': ['SQL Server', 'Cosmos DB', 'Redis', 'PostgreSQL'],
}

export default function Skills() {
  const t = useTranslations('skills')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} id="skills" className="py-24 bg-muted/30">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([key, items], categoryIndex) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <Card className="h-full border-none shadow-none bg-background/50 backdrop-blur-sm p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {t(`categories.${key}`)}
                </h3>
                <motion.div 
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  className="flex flex-wrap gap-2"
                >
                  {items.map((skill, index) => (
                    <motion.div
                      key={skill}
                      variants={{
                        hidden: { opacity: 0, y: 10, scale: 0.8 },
                        show: { opacity: 1, y: 0, scale: 1 }
                      }}
                      whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 2 : -2 }}
                    >
                      <Badge className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-default border-primary/10 py-1.5 px-4 text-sm">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skills = {
  'Cloud Platforms': ['Azure', 'AWS', 'Google Cloud'],
  'Backend': ['.NET 8', '.NET Core', 'C#', 'Web API', 'Microservices'],
  'Frontend': ['React', 'Next.js', 'Angular', 'Vue.js', 'TypeScript'],
  'AI & ML': ['OpenAI', 'Azure Cognitive Services', 'AWS Rekognition'],
  'DevOps': ['Azure DevOps', 'GitHub Actions', 'Docker', 'Jenkins'],
  'Database': ['SQL Server', 'Cosmos DB', 'Redis', 'Elasticsearch'],
}

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Technical Skills
        </motion.h2>

        <div className="space-y-8">
          {Object.entries(skills).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-[#0A66C2] mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      delay: categoryIndex * 0.1 + index * 0.05 
                    }}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    className="skill-tag"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
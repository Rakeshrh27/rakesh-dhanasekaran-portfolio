'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const certifications = [
  {
    name: 'Azure AI Fundamentals',
    issuer: 'Microsoft',
    year: 2022,
    color: 'from-blue-400 to-blue-600'
  },
  {
    name: 'Azure Data Fundamentals',
    issuer: 'Microsoft',
    year: 2023,
    color: 'from-green-400 to-green-600'
  },
  {
    name: 'Azure Developer Associate',
    issuer: 'Microsoft',
    year: 2023,
    color: 'from-purple-400 to-purple-600'
  },
  {
    name: 'Azure Data Engineer Associate',
    issuer: 'Microsoft',
    year: 2023,
    color: 'from-orange-400 to-orange-600'
  },
  {
    name: 'Power BI Data Analyst Associate',
    issuer: 'Microsoft',
    year: 2024,
    color: 'from-yellow-400 to-yellow-600'
  }
]

export default function Certifications() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Certifications
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateY: 180 }}
              animate={inView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.1,
                rotateY: 10,
                transition: { type: 'spring', stiffness: 300 }
              }}
              className="group perspective"
            >
              <div className={`bg-gradient-to-br ${cert.color} p-6 rounded-xl shadow-lg text-white text-center transform transition-all group-hover:shadow-2xl`}>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </motion.div>
                
                <h3 className="font-bold text-lg mb-1">{cert.name}</h3>
                <p className="text-sm opacity-90 mb-2">{cert.issuer}</p>
                <p className="text-sm font-semibold">{cert.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
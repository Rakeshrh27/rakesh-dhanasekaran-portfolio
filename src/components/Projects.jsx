'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const projects = [
  {
    title: 'ERP System Modernization',
    client: 'Seyyone Software Solution',
    description: 'Migrated legacy WPF ERP application to modern .NET 8 microservices architecture.',
    achievements: [
      '40% performance improvement',
      '50% reduction in deployment downtime',
      '80% test coverage with NUnit'
    ],
    technologies: ['.NET 8', 'Angular', 'Azure', 'Microservices', 'NUnit'],
    color: 'from-blue-500 to-purple-500'
  },
  {
    title: 'AI-Enhanced Media Platform',
    client: 'L&T Infotech',
    description: 'Built cloud-native platform with facial recognition and AI-powered metadata extraction.',
    achievements: [
      'Integrated AWS Rekognition for facial analysis',
      'OpenAI API for intelligent search',
      'Real-time processing dashboards'
    ],
    technologies: ['.NET Core', 'Angular', 'AWS', 'OpenAI', 'Redis'],
    color: 'from-green-500 to-teal-500'
  },
  {
    title: 'Banking System Migration',
    client: 'Wipro Limited',
    description: 'Led migration of legacy banking systems from .NET Framework 4.0 to .NET 6.',
    achievements: [
      'Improved system scalability',
      'Implemented CI/CD pipelines',
      'Centralized logging with Splunk'
    ],
    technologies: ['.NET 6', 'Azure', 'React', 'DevOps', 'Splunk'],
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'Affiliate E-commerce Platform',
    client: 'Seyyone Software Solution',
    description: 'Developed serverless marketplace management platform.',
    achievements: [
      'API-first serverless architecture',
      'Separate admin and public interfaces',
      'Handles traffic spikes automatically'
    ],
    technologies: ['Next.js', 'Supabase', 'Vercel', 'TypeScript'],
    color: 'from-pink-500 to-rose-500'
  }
]

export default function Projects() {
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
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03,
                rotate: index % 2 === 0 ? 1 : -1,
                transition: { type: 'spring', stiffness: 300 }
              }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden group"
            >
              {/* Project Header with Gradient */}
              <div className={`h-32 bg-gradient-to-r ${project.color} relative overflow-hidden`}>
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full"
                />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="text-sm opacity-90">{project.client}</p>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>

                <h4 className="font-semibold text-[#0A66C2] mb-2">Key Achievements:</h4>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  {project.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.1 + i * 0.1 }}
                      className="text-gray-600 dark:text-gray-400 text-sm"
                    >
                      {achievement}
                    </motion.li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1 bg-[#E8BABD] text-[#0A66C2] rounded-full text-xs font-semibold"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
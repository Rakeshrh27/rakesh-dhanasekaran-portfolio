'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const achievements = [
    { value: 40, label: 'Performance Improvement', suffix: '%' },
    { value: 80, label: 'Test Coverage Increase', suffix: '%' },
    { value: 50, label: 'Deployment Downtime Reduction', suffix: '%' },
    { value: 9, label: 'Years Experience', suffix: '+' },
  ]

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          About Me
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center"
          >
            Experienced and results-oriented Senior .NET Developer with over 9 years 
            of expertise in designing, developing, and deploying scalable, data-centric 
            web applications for ERP, CRM, and enterprise platforms.
          </motion.p>

          {/* Achievement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="achievement-card"
              >
                <Counter value={item.value} suffix={item.suffix} />
                <p className="text-lg font-semibold">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Counter Component
function Counter({ value, suffix }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-4xl font-bold block mb-2"
    >
      {value}{suffix}
    </motion.span>
  )
}
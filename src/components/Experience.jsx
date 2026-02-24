'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const experiences = [
  {
    company: 'Seyyone Software Solution',
    role: 'Lead Software Developer',
    period: 'Jan 2024 - Present',
    location: 'Remote',
    achievements: [
      'Led modernization of legacy WPF ERP to .NET 8 microservices, achieving 40% performance improvement',
      'Reduced deployment downtime by 50% through microservices architecture',
      'Increased test coverage to 80% using NUnit and SonarQube',
    ],
    technologies: ['.NET 8', 'Angular', 'Azure', 'Microservices']
  },
  {
    company: 'Wipro Limited',
    role: 'Senior Software Engineer',
    period: 'Mar 2022 - Jan 2024',
    location: 'India',
    achievements: [
      'Migrated legacy banking systems from .NET Framework 4.0 to .NET 6',
      'Implemented CI/CD pipelines with Azure DevOps and Jenkins',
      'Set up centralized logging with Splunk and Azure Monitor',
    ],
    technologies: ['.NET 6', 'Azure', 'React', 'DevOps']
  },
  {
    company: 'L&T Infotech',
    role: 'Senior Software Engineer',
    period: 'Feb 2020 - Mar 2022',
    location: 'India',
    achievements: [
      'Developed AI-enhanced media platform with AWS Rekognition',
      'Integrated OpenAI API for intelligent search and metadata extraction',
      'Built Angular-based interfaces with RxJS for real-time processing',
    ],
    technologies: ['.NET Core', 'Angular', 'AWS', 'OpenAI']
  },
  {
    company: 'DCM Infotech Limited',
    role: 'Associate Specialist',
    period: 'May 2018 - Nov 2019',
    location: 'India',
    achievements: [
      'Developed B2B ERP and CRM solutions using ASP.NET MVC 5',
      'Built interactive UIs with Kendo UI and jQuery',
      'Optimized SQL Server stored procedures and SSRS reports',
    ],
    technologies: ['ASP.NET MVC', 'SQL Server', 'Kendo UI', 'jQuery']
  },
  {
    company: 'Laserbeam Software Pvt Ltd',
    role: 'Programmer',
    period: 'Nov 2016 - Mar 2018',
    location: 'India',
    achievements: [
      'Developed full-stack B2B ERP solutions',
      'Created interactive chart visualization bot using Google Charts',
      'Built REST APIs for third-party integrations',
    ],
    technologies: ['.NET MVC 5', 'Entity Framework', 'Google Charts', 'jQuery']
  }
]

export default function Experience() {
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
          Professional Experience
        </motion.h2>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute left-8 md:left-1/2 w-0.5 bg-[#E8BABD] transform -translate-x-1/2"
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative mb-12 flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                className="absolute left-8 md:left-1/2 w-4 h-4 bg-[#0A66C2] rounded-full transform -translate-x-1/2 z-10"
              />

              {/* Content Card */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <motion.div
                  whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#0A66C2]">{exp.company}</h3>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{exp.role}</p>
                    </div>
                    <span className="bg-[#E8BABD] text-[#0A66C2] px-3 py-1 rounded-full text-sm">
                      {exp.period}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{exp.location}</p>
                  
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.2 + i * 0.1 }}
                        className="text-gray-600 dark:text-gray-400"
                      >
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white dark:bg-gray-700 border border-[#E8BABD] rounded text-sm text-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
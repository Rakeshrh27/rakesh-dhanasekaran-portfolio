'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const blogPosts = [
  {
    title: 'How I Earned 5 Microsoft Azure Certifications in 2 Years',
    category: 'Career',
    date: 'March 15, 2025',
    readTime: '5 min read',
    excerpt: 'My journey to becoming Microsoft certified in Azure AI, Data Engineering, and Development.',
    image: '/blog/certifications.jpg',
    color: 'from-[#0A66C2] to-[#E8BABD]'
  },
  {
    title: 'A Complete Guide to F-Tax for IT Consultants in Sweden',
    category: 'Sweden',
    date: 'March 10, 2025',
    readTime: '8 min read',
    excerpt: 'Everything you need to know about registering for F-tax as a self-employed IT consultant.',
    image: '/blog/ftax.jpg',
    color: 'from-[#E8BABD] to-[#0A66C2]'
  },
  {
    title: 'Migrating Legacy ERP Systems to .NET 8 Microservices',
    category: 'Technical',
    date: 'March 5, 2025',
    readTime: '10 min read',
    excerpt: 'How we achieved 40% performance improvement and 50% less downtime.',
    image: '/blog/microservices.jpg',
    color: 'from-[#0A66C2] to-[#E8BABD]'
  },
  {
    title: 'Integrating OpenAI with .NET: A Practical Guide',
    category: 'AI',
    date: 'February 28, 2025',
    readTime: '7 min read',
    excerpt: 'Building intelligent features with OpenAI API and .NET Core.',
    image: '/blog/openai.jpg',
    color: 'from-[#E8BABD] to-[#0A66C2]'
  }
]

export default function Blog() {
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
          Latest Articles
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="blog-card group cursor-pointer"
            >
              {/* Image Placeholder with Gradient */}
              <div className={`h-48 bg-gradient-to-r ${post.color} relative overflow-hidden`}>
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.2"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  }}
                />
                
                {/* Category Tag */}
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#0A66C2] px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {post.category}
                </motion.span>
                
                {/* Date Badge */}
                <span className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                  {post.date}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0A66C2] mb-2 group-hover:text-[#E8BABD] transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-[#0A66C2] font-semibold flex items-center gap-2 group-hover:text-[#E8BABD] transition-colors"
                  >
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#0A66C2] text-white px-8 py-3 rounded-lg hover:bg-[#E8BABD] hover:text-[#0A66C2] transition-all duration-300 font-semibold"
          >
            View All Articles
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
'use client'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, #E8BABD 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, #E8BABD 0%, transparent 50%)',
            'radial-gradient(circle at 0% 100%, #E8BABD 0%, transparent 50%)',
            'radial-gradient(circle at 100% 0%, #E8BABD 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Avatar with Float Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8 relative"
          >
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#0A66C2] to-[#E8BABD] p-1">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-[#0A66C2]">RD</span>
              </div>
            </div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-[#E8BABD] blur-xl -z-10"
            />
          </motion.div>

          {/* Title with Slide Up */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-[#0A66C2] mb-4"
          >
            Rakesh Dhanasekaran
          </motion.h1>

          {/* Subtitle with Slide Up */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-4"
          >
            Senior .NET Full-Stack Developer
          </motion.p>

          {/* Experience Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-2 mb-8"
          >
            <span className="bg-[#E8BABD] text-[#0A66C2] px-4 py-2 rounded-full text-sm font-semibold">
              9+ Years Experience
            </span>
            <span className="bg-[#0A66C2] text-white px-4 py-2 rounded-full text-sm font-semibold">
              Azure & AI Specialist
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0A66C2] text-white px-8 py-3 rounded-lg 
                       hover:bg-[#E8BABD] hover:text-[#0A66C2] 
                       transition-all duration-300 font-semibold"
            >
              View My Work
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#E8BABD] text-[#0A66C2] px-8 py-3 rounded-lg 
                       hover:bg-[#0A66C2] hover:text-white 
                       transition-all duration-300 font-semibold"
            >
              Read My Blog
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-[#0A66C2] rounded-full flex justify-center">
              <div className="w-1 h-3 bg-[#0A66C2] rounded-full mt-2" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const [isPointer, setIsPointer] = useState(false)
  
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Smooth springs for the cursor follow
  const springConfig = { damping: 20, stiffness: 200 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      
      const target = e.target
      const isClickable = target.closest('button, a, .clickable')
      setIsPointer(!!isClickable)
    }

    const handleMouseDown = () => setIsPointer(true)
    const handleMouseUp = () => setIsPointer(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Outer Ring */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 2.5 : 1,
          opacity: isPointer ? 0.3 : 0.8,
        }}
        className="w-10 h-10 border-2 border-primary rounded-full"
      />
      
      {/* Inner Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 0 : 1,
        }}
        className="fixed w-2 h-2 bg-primary rounded-full top-0 left-0"
      />
      
      {/* Glow Effect */}
      {isPointer && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="fixed w-32 h-32 bg-primary blur-3xl rounded-full top-0 left-0"
        />
      )}
    </div>
  )
}

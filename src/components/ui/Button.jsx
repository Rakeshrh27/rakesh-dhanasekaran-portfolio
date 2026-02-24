'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import useMagnetic from '@/hooks/use-magnetic'

export default function Button({ children, variant = 'solid', className, ...props }) {
  const { ref, position, handleMouseMove, reset } = useMagnetic()
  
  const variants = {
    solid: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20',
    subtle: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg shadow-secondary/20',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
    ghost: 'hover:bg-muted text-foreground',
    glass: 'glass hover:bg-white/20 dark:hover:bg-black/20 text-foreground'
  }

  const { x, y } = position

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'inline-flex items-center justify-center rounded-full px-8 py-3 font-black uppercase tracking-widest text-[10px] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed clickable',
        variants[variant],
        className
      )}
      {...props}
    >
      <motion.span 
        animate={{ x: x * 0.5, y: y * 0.5 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className="pointer-events-none"
      >
        {children}
      </motion.span>
    </motion.button>
  )
}

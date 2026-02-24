import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export default function Card({ children, className, ...props }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      className={cn(
        "premium-card",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

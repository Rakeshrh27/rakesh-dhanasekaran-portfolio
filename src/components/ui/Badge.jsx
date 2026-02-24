import { cn } from '@/lib/utils'

export default function Badge({ children, className, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from '@/navigation'
import { useLocale } from 'next-intl'

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const locales = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  ]

  const toggle = () => setIsOpen(!isOpen)

  const selectLocale = (code) => {
    setIsOpen(false)
    router.replace(pathname, { locale: code })
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggle}
        className="glass p-3 rounded-full flex items-center justify-center gap-2 min-w-[60px]"
      >
        <span className="text-lg leading-none">
          {locales.find(l => l.code === locale)?.flag}
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
          {locale}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute top-full right-0 mt-4 glass rounded-2xl p-2 min-w-[150px] overflow-hidden"
          >
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => selectLocale(l.code)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-black uppercase tracking-widest",
                  locale === l.code ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
              >
                <span>{l.flag}</span>
                <span>{l.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

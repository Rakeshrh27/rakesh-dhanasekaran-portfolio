'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useRouter, usePathname } from '@/navigation'
import { useLocale, useTranslations } from 'next-intl'

const actions = [
  { id: 'nav-home', label: 'Go to Home', icon: '🏠', link: '#hero', category: 'Navigation' },
  { id: 'nav-about', label: 'Go to About', icon: '👤', link: '#about', category: 'Navigation' },
  { id: 'nav-skills', label: 'Go to Skills', icon: '🛠️', link: '#skills', category: 'Navigation' },
  { id: 'nav-exp', label: 'Go to Experience', icon: '💼', link: '#experience', category: 'Navigation' },
  { id: 'nav-projects', label: 'Go to Projects', icon: '🚀', link: '#projects', category: 'Navigation' },
  { id: 'nav-blog', label: 'Go to Blog', icon: '✍️', link: '#blog', category: 'Navigation' },
  { id: 'nav-contact', label: 'Go to Contact', icon: '📧', link: '#contact', category: 'Navigation' },
  { id: 'theme-light', label: 'Switch to Light Mode', icon: '☀️', category: 'System', action: 'theme-light' },
  { id: 'theme-dark', label: 'Switch to Dark Mode', icon: '🌙', category: 'System', action: 'theme-dark' },
  { id: 'lang-en', label: 'Switch to English', icon: '🇬🇧', category: 'Language', action: 'lang-en' },
  { id: 'lang-sv', label: 'Switch to Swedish', icon: '🇸🇪', category: 'Language', action: 'lang-sv' },
]

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('nav')

  const filteredActions = actions.filter(action =>
    action.label.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase())
  )

  const handleAction = useCallback((action) => {
    if (action.link) {
      if (action.link.startsWith('#')) {
        window.location.hash = action.link
      } else {
        router.push(action.link)
      }
    } else if (action.action) {
      if (action.action.startsWith('theme-')) {
        const theme = action.action.split('-')[1]
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
      } else if (action.action.startsWith('lang-')) {
        const newLocale = action.action.split('-')[1]
        router.replace(pathname, { locale: newLocale })
      }
    }
    setIsOpen(false)
    setQuery('')
  }, [router, pathname])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }

      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % filteredActions.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredActions[selectedIndex]) {
          handleAction(filteredActions[selectedIndex])
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredActions, selectedIndex, handleAction])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-background/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-border/50 flex items-center gap-3">
              <span className="text-xl">🔍</span>
              <input
                autoFocus
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                className="flex-1 bg-transparent border-none outline-none text-lg font-medium placeholder:text-muted-foreground"
              />
              <div className="flex gap-1">
                <kbd className="px-2 py-1 bg-muted rounded text-[10px] font-black tracking-widest uppercase">ESC</kbd>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredActions.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground font-medium">
                  No results found for "{query}"
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredActions.map((action, idx) => (
                    <button
                      key={action.id}
                      onClick={() => handleAction(action)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200",
                        selectedIndex === idx ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]" : "hover:bg-muted text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xl">{action.icon}</span>
                        <div className="text-left">
                          <p className="font-bold text-sm leading-none">{action.label}</p>
                          <p className={cn("text-[10px] uppercase tracking-widest font-black mt-1", selectedIndex === idx ? "text-primary-foreground/70" : "text-muted-foreground")}>
                            {action.category}
                          </p>
                        </div>
                      </div>
                      {selectedIndex === idx && (
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Execute</span>
                          <span className="text-lg">↵</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-muted/30 border-t border-border/50 flex justify-between items-center">
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px] font-bold">↑↓</kbd>
                  <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px] font-bold">Enter</kbd>
                  <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Select</span>
                </div>
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Command Center v1.0
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

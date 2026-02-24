'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function TerminalFooter() {
  const [logs, setLogs] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef(null)
  const t = useTranslations('nav')

  const systemMessages = [
    "[SYS] Authentication successful: ROLE_SENIOR_DEV",
    "[SYS] Initializing portfolio v3.0.0...",
    "[NET] Connection established via 127.0.0.1",
    "[MEM] Cache cleared: 40% performance gain",
    "[GIT] Committed: Dynamic localized routing implemented",
    "[SYS] AI Engine: ONLINE",
    "[SYS] Ready for deployment.",
  ]

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < systemMessages.length) {
        setLogs(prev => [...prev, { id: i, text: systemMessages[i], time: new Date().toLocaleTimeString() }])
        i++
      } else {
        clearInterval(interval)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] px-4 pb-4">
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="max-w-7xl mx-auto glass rounded-2xl overflow-hidden border-primary/20 shadow-2xl shadow-primary/10"
      >
        {/* Terminal Header */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between px-6 py-3 bg-primary/10 border-b border-primary/20 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">Terminal Console</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-muted-foreground hidden md:block">Active: rak@prod-server</span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="text-xs text-primary"
            >
              ▲
            </motion.span>
          </div>
        </div>

        {/* Terminal Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 200 }}
              exit={{ height: 0 }}
              className="bg-black/80 backdrop-blur-xl overflow-hidden"
            >
              <div 
                ref={containerRef}
                className="p-6 h-full overflow-y-auto font-mono text-xs space-y-2 scrollbar-hide"
              >
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-4"
                  >
                    <span className="text-primary/40 shrink-0">[{log.time}]</span>
                    <span className={log.text?.includes('[SYS]') ? "text-primary font-bold" : "text-muted-foreground"}>
                      {log.text}
                    </span>
                  </motion.div>
                ))}
                <div className="flex gap-2 text-primary animate-pulse">
                  <span>{">"}</span>
                  <span className="w-2 h-4 bg-primary" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

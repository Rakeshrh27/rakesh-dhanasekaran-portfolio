'use client'
import { useEffect, useRef } from 'react'

export default function HeroVisual() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: null, y: null, radius: 150 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const handleMouseMove = (event) => {
      mouse.current.x = event.clientX
      mouse.current.y = event.clientY
    }

    class Particle {
      constructor() {
        this.baseX = Math.random() * canvas.width
        this.baseY = Math.random() * canvas.height
        this.x = this.baseX
        this.y = this.baseY
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 2 + 1
        this.density = (Math.random() * 30) + 1
      }

      update() {
        // Normal movement
        this.baseX += this.vx
        this.baseY += this.vy

        if (this.baseX < 0 || this.baseX > canvas.width) this.vx *= -1
        if (this.baseY < 0 || this.baseY > canvas.height) this.vy *= -1

        // Mouse interaction (Magnetic repulsion)
        let dx = mouse.current.x - this.x
        let dy = mouse.current.y - this.y
        let distance = Math.sqrt(dx * dx + dy * dy)
        let forceDirectionX = dx / distance
        let forceDirectionY = dy / distance
        let maxDistance = mouse.current.radius
        let force = (maxDistance - distance) / maxDistance
        let directionX = forceDirectionX * force * this.density
        let directionY = forceDirectionY * force * this.density

        if (distance < mouse.current.radius) {
          this.x -= directionX
          this.y -= directionY
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX
            this.x -= dx / 10
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY
            this.y -= dy / 10
          }
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(124, 58, 237, 0.4)'
        ctx.fill()
      }
    }

    const initParticles = () => {
      particles = []
      const count = Math.min(Math.floor(canvas.width / 12), 150)
      for (let i = 0; i < count; i++) {
        particles.push(new Particle())
      }
    }

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.15 * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(p => {
        p.update()
        p.draw()
      })
      
      drawLines()
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    resize()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 z-0"
    />
  )
}

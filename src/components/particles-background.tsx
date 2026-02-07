'use client'

import React, { useEffect, useRef } from 'react'

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 150, // Repulsion radius
    }

    class Particle {
      x: number
      y: number
      dx: number
      dy: number
      size: number
      color: string
      density: number

      constructor(x: number, y: number, canvas: HTMLCanvasElement) {
        this.x = x
        this.y = y
        // Random velocity between -0.5 and 0.5
        this.dx = (Math.random() - 0.5)
        this.dy = (Math.random() - 0.5)
        this.size = Math.random() * 2 + 1
        
        // Determine theme: check 'dark' class on html element OR system preference
        const isDark = document.documentElement.classList.contains('dark') || 
                      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

        if (isDark) {
             this.color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})` // White in dark mode, slightly more visible
        } else {
             this.color = `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.1})` // Black in light mode, slightly more visible
        }
        
        this.density = (Math.random() * 30) + 1
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
      }

      update() {
        // Wall collision detection
        if (this.x + this.size > canvas!.width || this.x - this.size < 0) {
          this.dx = -this.dx
        }
        if (this.y + this.size > canvas!.height || this.y - this.size < 0) {
          this.dy = -this.dy
        }

        // Mouse interaction
        let dx = mouse.x - this.x
        let dy = mouse.y - this.y
        let distance = Math.sqrt(dx * dx + dy * dy)
        let forceDirectionX = dx / distance
        let forceDirectionY = dy / distance
        let maxDistance = mouse.radius
        let force = (maxDistance - distance) / maxDistance
        let directionX = forceDirectionX * force * this.density
        let directionY = forceDirectionY * force * this.density

        if (distance < mouse.radius) {
          this.x -= directionX
          this.y -= directionY
        } else {
          // Return to normal velocity
           if (this.x !== this.x + this.dx) {
                this.x += this.dx
           }
           if (this.y !== this.y + this.dy) {
                this.y += this.dy
           }
        }

        this.draw()
      }
    }

    const init = () => {
      particles = []
      // Number of particles relative to screen size
      const particleCount = (canvas.width * canvas.height) / 9000
      for (let i = 0; i < particleCount; i++) {
        let size = (Math.random() * 5) + 1
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2)
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2)
        particles.push(new Particle(x, y, canvas))
      }
    }

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
      }
    }

    const handleResize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight 
        
        if(canvas.parentElement) {
            canvas.width = canvas.parentElement.offsetWidth
            canvas.height = canvas.parentElement.offsetHeight
        }
        init()
    }
    
    // Initial setup
    handleResize()
    
    // Check dark mode changes (system preference)
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleThemeChange = (e: MediaQueryListEvent) => {
        init()
    }
    darkModeQuery.addEventListener('change', handleThemeChange)

    // Check dark mode changes (class toggle on html element)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
           init()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    window.addEventListener('resize', handleResize)
    
    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
        // Need to account for canvas position relative to viewport
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    }
    
    window.addEventListener('mousemove', handleMouseMove)

    // Clear mouse position when leaving window
    const handleMouseLeave = () => {
        mouse.x = -1000
        mouse.y = -1000
    }
    window.addEventListener('mouseout', handleMouseLeave)

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseLeave)
      darkModeQuery.removeEventListener('change', handleThemeChange)
      observer.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10"
    />
  )
}

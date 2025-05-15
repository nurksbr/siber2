'use client'

import React, { useEffect, useRef } from 'react'

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Canvas boyutunu ayarla
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = 64 // Sadece navbar yüksekliği kadar
    }
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Matrix karakterleri
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%'
    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)
    const drops = new Array(columns).fill(1)

    // Matrix efekti
    function draw() {
      // Yarı saydam arka plan
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Daha parlak yeşil metin
      ctx.fillStyle = '#00ff00'
      ctx.font = `${fontSize}px monospace`

      // Karakterleri çiz
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-16 pointer-events-none z-[2]">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-80"
        style={{ background: 'transparent' }}
      />
    </div>
  )
}

export default MatrixRain 
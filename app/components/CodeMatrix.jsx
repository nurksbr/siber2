'use client'

import { useEffect, useRef } from 'react'

function CodeMatrix({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    // Canvas boyutları
    const setCanvasDimensions = () => {
      const computedStyle = getComputedStyle(canvas)
      const width = parseInt(computedStyle.getPropertyValue('width'), 10)
      const height = parseInt(computedStyle.getPropertyValue('height'), 10)
      
      // Canvas'ın boyutunu fiziksel piksel oranına göre ayarla
      const devicePixelRatio = window.devicePixelRatio || 1
      canvas.width = width * devicePixelRatio
      canvas.height = height * devicePixelRatio
      
      // Context ölçeklendirme
      ctx.scale(devicePixelRatio, devicePixelRatio)
      
      // Canvas CSS boyutunu geri ayarla
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      
      return { width, height }
    }

    let dimensions = setCanvasDimensions()
    
    // Pencere boyutu değiştiğinde canvas'ı yeniden boyutlandır
    const handleResize = () => {
      dimensions = setCanvasDimensions()
      setupMatrix()
    }
    
    window.addEventListener('resize', handleResize)

    // Matrix karakterleri
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[]/\\|><@#$%^&*()_+-='
    
    // Font boyutu
    const fontSize = 14
    
    // Sütun sayısı
    const columns = Math.floor(dimensions.width / fontSize)
    
    // Damlaların y pozisyonlarını tutan dizi
    let drops = []
    
    const setupMatrix = () => {
      // Damlaları başlangıç pozisyonlarına ayarla
      drops = []
      for (let i = 0; i < columns; i++) {
        // Her sütun için rastgele başlangıç y pozisyonu
        drops[i] = Math.random() * -100
      }
    }
    
    setupMatrix()
    
    // Matrix animasyonu
    const animate = () => {
      // Yarı saydam siyah arkaplan, eski karakterleri soldurmak için
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)
      
      // Metin özellikleri
      ctx.fillStyle = '#22d3ee' // Cyan rengi
      ctx.font = `bold ${fontSize}px monospace`
      ctx.textAlign = 'center'
      
      // Her sütun için damla çiz
      for (let i = 0; i < drops.length; i++) {
        // Rastgele bir karakter seç
        const char = characters[Math.floor(Math.random() * characters.length)]
        
        // X koordinatı (sütun)
        const x = i * fontSize + fontSize / 2
        
        // Y koordinatı (satır)
        const y = drops[i] * fontSize
        
        // Rastgele parlak karakterler ekle
        if (Math.random() > 0.95) {
          ctx.fillStyle = '#ffffff' // Beyaz renk
        } else {
          // Rastgele ton değişimi
          const opacity = Math.random() * 0.5 + 0.5 // 0.5 ile 1 arasında
          ctx.fillStyle = `rgba(34, 211, 238, ${opacity})` // Cyan rengi farklı opaklıklarda
        }
        
        // Karakteri çiz
        ctx.fillText(char, x, y)
        
        // Eğer damla ekranın altındaysa veya rastgele olasılık
        if (y > dimensions.height || Math.random() > 0.98) {
          drops[i] = 0
        }
        
        // Damlayı aşağı hareket ettir
        drops[i]++
      }
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    // Animasyonu başlat
    let animationFrameId = requestAnimationFrame(animate)
    
    // Temizlik fonksiyonu
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full absolute top-0 left-0 ${className}`}
      style={{ pointerEvents: 'none' }} // Mouse olaylarının altındaki elementlere geçmesini sağlar
    />
  )
}

export default CodeMatrix 
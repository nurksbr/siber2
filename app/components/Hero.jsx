import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

function Hero() {
  const [scroll, setScroll] = useState(0)
  const canvasRef = useRef(null)
  const [attackCount, setAttackCount] = useState(134000)
  const [mostAttackedCountry, setMostAttackedCountry] = useState('Türkiye')

  // Kayan banda animasyon için
  useEffect(() => {
    const timer = setInterval(() => {
      setScroll(prev => (prev - 1) % -1000)
    }, 30)
    return () => clearInterval(timer)
  }, [])

  // Siber tehdit haritası animasyonu için
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    // Dünya haritası koordinatları (daha kapsamlı)
    const locations = [
      { x: width * 0.2, y: height * 0.3, name: 'Kuzey Amerika', size: 5 },  
      { x: width * 0.4, y: height * 0.3, name: 'Avrupa', size: 5 },  
      { x: width * 0.45, y: height * 0.25, name: 'Rusya', size: 4 },
      { x: width * 0.55, y: height * 0.3, name: 'Asya', size: 5 }, 
      { x: width * 0.6, y: height * 0.4, name: 'Orta Doğu', size: 4 },
      { x: width * 0.45, y: height * 0.5, name: 'Afrika', size: 4 }, 
      { x: width * 0.25, y: height * 0.6, name: 'Güney Amerika', size: 4 },  
      { x: width * 0.7, y: height * 0.6, name: 'Avustralya', size: 4 },
      { x: width * 0.48, y: height * 0.32, name: 'Türkiye', size: 4 },
      { x: width * 0.65, y: height * 0.35, name: 'Çin', size: 5 },
      { x: width * 0.7, y: height * 0.3, name: 'Japonya', size: 4 },
      { x: width * 0.15, y: height * 0.4, name: 'Meksika', size: 3 },
      { x: width * 0.35, y: height * 0.35, name: 'İtalya', size: 3 },
    ]

    // Saldırı tipleri
    const attackTypes = [
      { name: 'Malware', color: 'rgba(255, 100, 100, 0.8)' },
      { name: 'DDoS', color: 'rgba(100, 255, 100, 0.8)' },
      { name: 'Phishing', color: 'rgba(100, 100, 255, 0.8)' },
      { name: 'Ransomware', color: 'rgba(255, 255, 100, 0.8)' },
      { name: 'Data Breach', color: 'rgba(255, 100, 255, 0.8)' },
    ]

    // Saldırı yolları
    const attacks = []

    // Sayaç artışı
    const countInterval = setInterval(() => {
      setAttackCount(prev => prev + Math.floor(Math.random() * 10))
      
      // En çok saldırı alan ülkeyi rastgele değiştir (demo amaçlı)
      if (Math.random() > 0.9) {
        const countries = ['Türkiye', 'ABD', 'Rusya', 'Çin', 'Almanya', 'Japonya', 'Brezilya', 'Hindistan']
        setMostAttackedCountry(countries[Math.floor(Math.random() * countries.length)])
      }
    }, 3000)

    // Kara kroki çizimi
    const drawWorldMap = () => {
      ctx.fillStyle = 'rgba(26, 188, 156, 0.1)'
      // Kuzey Amerika
      ctx.beginPath()
      ctx.moveTo(width * 0.1, height * 0.25)
      ctx.bezierCurveTo(width * 0.15, height * 0.2, width * 0.25, height * 0.2, width * 0.28, height * 0.4)
      ctx.bezierCurveTo(width * 0.22, height * 0.45, width * 0.15, height * 0.4, width * 0.1, height * 0.25)
      ctx.fill()
      
      // Güney Amerika
      ctx.beginPath()
      ctx.moveTo(width * 0.22, height * 0.48)
      ctx.bezierCurveTo(width * 0.25, height * 0.55, width * 0.28, height * 0.7, width * 0.22, height * 0.75)
      ctx.bezierCurveTo(width * 0.18, height * 0.68, width * 0.18, height * 0.55, width * 0.22, height * 0.48)
      ctx.fill()
      
      // Avrupa + Afrika
      ctx.beginPath()
      ctx.moveTo(width * 0.35, height * 0.2)
      ctx.bezierCurveTo(width * 0.45, height * 0.2, width * 0.5, height * 0.35, width * 0.45, height * 0.7)
      ctx.bezierCurveTo(width * 0.4, height * 0.65, width * 0.35, height * 0.5, width * 0.35, height * 0.2)
      ctx.fill()
      
      // Asya
      ctx.beginPath()
      ctx.moveTo(width * 0.5, height * 0.2)
      ctx.bezierCurveTo(width * 0.7, height * 0.25, width * 0.75, height * 0.45, width * 0.6, height * 0.5)
      ctx.bezierCurveTo(width * 0.55, height * 0.45, width * 0.5, height * 0.4, width * 0.5, height * 0.2)
      ctx.fill()
      
      // Avustralya
      ctx.beginPath()
      ctx.moveTo(width * 0.7, height * 0.55)
      ctx.bezierCurveTo(width * 0.8, height * 0.55, width * 0.8, height * 0.7, width * 0.7, height * 0.7)
      ctx.bezierCurveTo(width * 0.65, height * 0.65, width * 0.65, height * 0.6, width * 0.7, height * 0.55)
      ctx.fill()
    }

    // Arka plan grid çizimi
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(26, 188, 156, 0.05)'
      ctx.lineWidth = 1
      
      // Yatay çizgiler
      for (let i = 0; i < height; i += 20) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(width, i)
        ctx.stroke()
      }
      
      // Dikey çizgiler
      for (let i = 0; i < width; i += 20) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, height)
        ctx.stroke()
      }
    }

    // Saldırı animasyonu
    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Grid arka plan
      drawGrid()
      
      // Dünya haritası krokisi
      drawWorldMap()
      
      // Dünya haritası (nokta şeklinde arka plan)
      ctx.fillStyle = 'rgba(26, 188, 156, 0.05)'
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const radius = Math.random() * 1 + 0.5
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Veri merkezleri
      locations.forEach(loc => {
        // Dış halka
        ctx.fillStyle = 'rgba(26, 188, 156, 0.2)'
        ctx.beginPath()
        ctx.arc(loc.x, loc.y, loc.size + 6, 0, Math.PI * 2)
        ctx.fill()
        
        // Orta halka
        ctx.fillStyle = 'rgba(26, 188, 156, 0.4)'
        ctx.beginPath()
        ctx.arc(loc.x, loc.y, loc.size + 3, 0, Math.PI * 2)
        ctx.fill()
        
        // İç halka
        ctx.fillStyle = 'rgba(26, 188, 156, 0.7)'
        ctx.beginPath()
        ctx.arc(loc.x, loc.y, loc.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Pulse efekti
        ctx.strokeStyle = 'rgba(26, 188, 156, 0.3)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(loc.x, loc.y, loc.size + 10 + Math.sin(Date.now() / 500) * 5, 0, Math.PI * 2)
        ctx.stroke()
      })
      
      // Yeni saldırı oluştur
      if (Math.random() < 0.1) {
        const from = locations[Math.floor(Math.random() * locations.length)]
        const to = locations[Math.floor(Math.random() * locations.length)]
        if (from !== to) {
          const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)]
          attacks.push({
            from,
            to,
            progress: 0,
            color: attackType.color,
            type: attackType.name,
            speed: 1 + Math.random()
          })
        }
      }
      
      // Saldırıları çiz
      attacks.forEach((attack, index) => {
        ctx.strokeStyle = attack.color
        ctx.lineWidth = 1.5
        
        // Saldırı izini çiz
        ctx.beginPath()
        ctx.moveTo(attack.from.x, attack.from.y)
        
        // Kavisli yol
        const mid = {
          x: (attack.from.x + attack.to.x) / 2,
          y: (attack.from.y + attack.to.y) / 2 - 20 - Math.random() * 20
        }
        
        // Saldırı ilerlemesi
        const t = attack.progress / 100
        const curPoint = {
          x: Math.pow(1-t, 2) * attack.from.x + 2 * (1-t) * t * mid.x + Math.pow(t, 2) * attack.to.x,
          y: Math.pow(1-t, 2) * attack.from.y + 2 * (1-t) * t * mid.y + Math.pow(t, 2) * attack.to.y
        }
        
        ctx.quadraticCurveTo(mid.x, mid.y, curPoint.x, curPoint.y)
        ctx.stroke()
        
        // Saldırı ucu (ok benzeri)
        const angle = Math.atan2(curPoint.y - (t > 0.01 ? Math.pow(1-(t-0.01), 2) * attack.from.x + 2 * (1-(t-0.01)) * (t-0.01) * mid.x + Math.pow(t-0.01, 2) * attack.to.x : attack.from.x), 
                               curPoint.x - (t > 0.01 ? Math.pow(1-(t-0.01), 2) * attack.from.y + 2 * (1-(t-0.01)) * (t-0.01) * mid.y + Math.pow(t-0.01, 2) * attack.to.y : attack.from.y))
        
        ctx.fillStyle = attack.color
        ctx.beginPath()
        ctx.arc(curPoint.x, curPoint.y, 2, 0, Math.PI * 2)
        ctx.fill()
        
        // Saldırı tipi etiketi
        if (attack.progress > 20 && attack.progress < 80) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
          ctx.fillRect(curPoint.x + 10, curPoint.y - 10, 70, 20)
          ctx.fillStyle = attack.color
          ctx.font = '12px Arial'
          ctx.fillText(attack.type, curPoint.x + 15, curPoint.y + 5)
        }
        
        // İlerlemeyi güncelle
        attack.progress += attack.speed
        
        // Tamamlanan saldırıları kaldır
        if (attack.progress >= 100) {
          attacks.splice(index, 1)
        }
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      clearInterval(countInterval)
    }
  }, [])

  return (
    <div className="relative overflow-hidden bg-gray-900">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -bottom-1/4 -right-1/4 h-96 w-96 rounded-full bg-cyan-600 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 h-64 w-64 rounded-full bg-purple-600 blur-3xl"></div>
        <div className="absolute h-96 w-96 -top-1/4 -left-1/4 rounded-full bg-blue-600 blur-3xl"></div>
      </div>
      
      {/* Kod akışı arka plan deseni */}
      <div className="absolute inset-0 z-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900 via-gray-900 to-gray-900"></div>
      
      {/* Kayan Tehdit Uyarı Bandı */}
      <div className="relative z-20 bg-gray-800 text-white overflow-hidden py-2 px-4 border-b border-cyan-700/50">
        <div className="flex whitespace-nowrap" style={{ transform: `translateX(${scroll}px)` }}>
          <div className="flex items-center mx-8">
            <span className="inline-block w-3 h-3 bg-cyan-500 rounded-full mr-2 animate-pulse"></span>
            <span className="font-medium text-cyan-100">Son 24 saatte {attackCount.toLocaleString()} siber saldırı tespit edildi</span>
          </div>
          <div className="flex items-center mx-8">
            <span className="inline-block w-3 h-3 bg-cyan-500 rounded-full mr-2 animate-pulse"></span>
            <span className="font-medium text-cyan-100">Fidye yazılım saldırıları %23 arttı</span>
          </div>
          <div className="flex items-center mx-8">
            <span className="inline-block w-3 h-3 bg-cyan-500 rounded-full mr-2 animate-pulse"></span>
            <span className="font-medium text-cyan-100">Kritik altyapılara yönelik saldırılar devam ediyor</span>
          </div>
          <div className="flex items-center mx-8">
            <span className="inline-block w-3 h-3 bg-cyan-500 rounded-full mr-2 animate-pulse"></span>
            <span className="font-medium text-cyan-100">Yeni phishing kampanyası tespit edildi</span>
          </div>
          <div className="flex items-center mx-8">
            <span className="inline-block w-3 h-3 bg-cyan-500 rounded-full mr-2 animate-pulse"></span>
            <span className="font-medium text-cyan-100">Son 24 saatte {attackCount.toLocaleString()} siber saldırı tespit edildi</span>
          </div>
          <div className="flex items-center mx-8">
            <span className="inline-block w-3 h-3 bg-cyan-500 rounded-full mr-2 animate-pulse"></span>
            <span className="font-medium text-cyan-100">Fidye yazılım saldırıları %23 arttı</span>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-wide">
              <span className="block italic transform hover:scale-105 transition-transform duration-300">"Siber güvenlik yoksa,</span>
              <span className="block text-cyan-400 text-glow font-black animate-pulse">teknoloji sadece risktir."</span>
            </h1>
          </div>
          
          {/* Animasyonlu Siber Tehdit Haritası */}
          <div className="mt-12 mb-12 w-full">
            <div className="relative w-full border border-gray-700/50 rounded-lg overflow-hidden bg-black">
              <canvas 
                ref={canvasRef} 
                width={1200} 
                height={600} 
                className="w-full h-full object-cover"
              ></canvas>

              {/* Harita Başlığı */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                <div className="bg-gray-900/80 backdrop-blur-sm py-2 px-4 rounded-md border border-cyan-700/50">
                  <h2 className="text-lg font-bold text-cyan-300">CYBERLY TEHDİT HARİTASI</h2>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-gray-900/80 backdrop-blur-sm py-1 px-3 rounded-md border border-cyan-700/50 text-cyan-300 text-sm">
                    Küre Görünümü
                  </button>
                  <button className="bg-gray-900/80 backdrop-blur-sm py-1 px-3 rounded-md border border-cyan-700/50 text-cyan-300 text-sm">
                    Dünya Görünümü
                  </button>
                </div>
              </div>
              
              {/* Sol İstatistik Paneli */}
              <div className="absolute top-20 left-3 bg-gray-900/80 backdrop-blur-sm py-3 px-4 rounded-md border border-cyan-700/50 w-64">
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-400">EN ÇOK SALDIRI ALAN ÜLKE</h3>
                  <p className="text-xl font-bold text-cyan-300">{mostAttackedCountry}</p>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-400">MALWARE</span>
                      <span className="text-xs text-cyan-300">{Math.floor(attackCount * 0.4).toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-400">DDOS</span>
                      <span className="text-xs text-cyan-300">{Math.floor(attackCount * 0.2).toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-400">PHISHING</span>
                      <span className="text-xs text-cyan-300">{Math.floor(attackCount * 0.25).toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-400">RANSOMWARE</span>
                      <span className="text-xs text-cyan-300">{Math.floor(attackCount * 0.15).toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Alt Bilgi Paneli */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                <div className="bg-gray-900/80 backdrop-blur-sm py-2 px-4 rounded-md border border-cyan-700/50">
                  <div className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mr-2 animate-pulse"></span>
                    <span className="text-sm font-semibold text-cyan-100">Canlı Siber Tehdit Haritası</span>
                  </div>
                  <div className="text-xs text-cyan-200 mt-1">
                    Tespit edilen saldırılar: <span className="font-semibold">{attackCount.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="bg-gray-900/80 backdrop-blur-sm py-2 px-4 rounded-md border border-cyan-700/50 text-xs text-cyan-300">
                  Veriler CYBERLY Tehdit İstihbaratı tarafından sağlanmaktadır. © 2025 CYBERLY. Tüm hakları saklıdır.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero 
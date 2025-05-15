'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'

export default function PasswordCheckerPage() {
  const [password, setPassword] = useState('')
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<string[]>([])
  const [showPassword, setShowPassword] = useState(false)
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [strengthLabel, setStrengthLabel] = useState('')
  const [strengthColor, setStrengthColor] = useState('')

  // Şifre gücünü değerlendiren fonksiyon
  const evaluatePassword = (pass: string) => {
    let currentScore = 0
    const currentFeedback = []
    const currentRecommendations = []

    // Şifre uzunluğu kontrolü
    if (pass.length === 0) {
      setScore(0)
      setFeedback([])
      setRecommendations([])
      setStrengthLabel('')
      setStrengthColor('')
      return
    }
    
    if (pass.length < 8) {
      currentScore -= 1
      currentFeedback.push('Şifreniz çok kısa')
      currentRecommendations.push('En az 12 karakter kullanın')
    } else if (pass.length >= 12) {
      currentScore += 2
      currentFeedback.push('Şifre uzunluğu yeterli')
    } else {
      currentScore += 1
      currentFeedback.push('Şifre uzunluğu kabul edilebilir')
      currentRecommendations.push('Daha güvenli bir şifre için 12+ karakter kullanın')
    }

    // Büyük harf kontrolü
    if (/[A-Z]/.test(pass)) {
      currentScore += 1
      currentFeedback.push('Büyük harf içeriyor')
    } else {
      currentRecommendations.push('Büyük harf ekleyin')
    }

    // Küçük harf kontrolü
    if (/[a-z]/.test(pass)) {
      currentScore += 1
      currentFeedback.push('Küçük harf içeriyor')
    } else {
      currentRecommendations.push('Küçük harf ekleyin')
    }

    // Sayı kontrolü
    if (/\d/.test(pass)) {
      currentScore += 1
      currentFeedback.push('Sayı içeriyor')
    } else {
      currentRecommendations.push('Sayı ekleyin')
    }

    // Özel karakter kontrolü
    if (/[^A-Za-z0-9]/.test(pass)) {
      currentScore += 1
      currentFeedback.push('Özel karakter içeriyor')
    } else {
      currentRecommendations.push('Özel karakter ekleyin (örn. !@#$%^&*)')
    }
    
    // Yaygın şifre kontrolleri
    const commonPasswords = ['123456', '123456789', 'qwerty', 'password', 'admin', '1234567890', 'letmein', 'welcome']
    if (commonPasswords.includes(pass.toLowerCase())) {
      currentScore = -5
      currentFeedback.length = 0
      currentFeedback.push('Bu şifre çok yaygın!')
      currentRecommendations.push('Yaygın şifreleri kullanmaktan kaçının')
    }
    
    // Tekrarlayan karakterler kontrolü
    if (/(.)\1{2,}/.test(pass)) {
      currentScore -= 1
      currentFeedback.push('Tekrarlayan karakterler içeriyor')
      currentRecommendations.push('Tekrarlayan karakterlerden kaçının')
    }
    
    // Ardışık karakterler kontrolü
    const sequences = ['abcdefghijklmnopqrstuvwxyz', '01234567890', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm']
    for (const seq of sequences) {
      for (let i = 0; i < seq.length - 2; i++) {
        const fragment = seq.substring(i, i + 3)
        if (pass.toLowerCase().includes(fragment)) {
          currentScore -= 1
          currentFeedback.push('Ardışık karakter dizileri içeriyor')
          currentRecommendations.push('Ardışık karakterlerden kaçının (abc, 123, qwerty)')
          break
        }
      }
    }

    // Şifre gücü değerlendirmesi
    if (currentScore <= 0) {
      setStrengthLabel('Çok Zayıf')
      setStrengthColor('bg-red-600')
    } else if (currentScore <= 2) {
      setStrengthLabel('Zayıf')
      setStrengthColor('bg-red-500')
    } else if (currentScore <= 4) {
      setStrengthLabel('Orta')
      setStrengthColor('bg-yellow-500')
    } else if (currentScore <= 6) {
      setStrengthLabel('Güçlü')
      setStrengthColor('bg-green-500')
    } else {
      setStrengthLabel('Çok Güçlü')
      setStrengthColor('bg-green-600')
    }

    // Benzersiz önerileri filtrele
    const uniqueRecommendations = Array.from(new Set(currentRecommendations))
    
    setScore(currentScore)
    setFeedback(currentFeedback)
    setRecommendations(uniqueRecommendations)
  }

  // Şifre değiştiğinde değerlendirmeyi güncelle
  useEffect(() => {
    evaluatePassword(password)
  }, [password])

  // Güçlü şifre oluşturmak için ipuçları
  const passwordTips = [
    'En az 12-16 karakter kullanın',
    'Büyük harf, küçük harf, sayı ve özel karakterleri birlikte kullanın',
    'Kişisel bilgilerinizi (doğum tarihi, isim vb.) şifrenizde kullanmayın',
    'Her hesap için farklı şifre kullanın',
    'Şifre yöneticisi kullanarak karmaşık şifreleri güvenli bir şekilde saklayın',
    'İki faktörlü kimlik doğrulamayı etkinleştirin',
    'Şifrelerinizi düzenli olarak değiştirin (3-6 ay arası)',
    'Rastgele kelime kombinasyonları kullanarak hatırlanması kolay ama tahmin edilmesi zor şifreler oluşturun'
  ]

  return (
    <>
      <Navbar />
      
      <main className="bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="relative py-16 bg-gray-900">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute -top-1/4 -right-1/4 h-96 w-96 rounded-full bg-cyan-600 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Şifre Güvenliği</span>
                <span className="block text-cyan-400">Değerlendirme Aracı</span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                Şifrelerinizin güvenliğini test edin ve daha güçlü şifreler oluşturmak için öneriler alın
              </p>
            </div>
          </div>
        </section>
        
        {/* Şifre Değerlendirme Aracı */}
        <section className="py-12 bg-gray-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 shadow-xl">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Şifre Gücü Testi</h2>
              
              <div className="mb-8">
                <p className="text-gray-300 mb-4">
                  Şifrenizi girin ve güvenlik seviyesini kontrol edin. Merak etmeyin, girdiğiniz şifre saklanmaz veya herhangi bir sunucuya gönderilmez.
                </p>
                
                <div className="relative mt-6">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şifrenizi buraya girin"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              
              {password && (
                <div className="mt-8 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Şifre Gücü: <span className={`px-2 py-1 rounded text-sm ${strengthColor} text-white`}>{strengthLabel}</span></h3>
                  
                  <div className="w-full bg-gray-700 rounded-full h-4 mt-4">
                    <div 
                      className={`${strengthColor} h-4 rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${Math.max(0, Math.min(100, (score / 8) * 100))}%` }}
                    ></div>
                  </div>
                  
                  {feedback.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-white font-semibold mb-2">Analiz:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {feedback.map((item, index) => (
                          <li key={index} className="text-gray-300">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {recommendations.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-white font-semibold mb-2">İyileştirme Önerileri:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {recommendations.map((item, index) => (
                          <li key={index} className="text-gray-300">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Şifre Oluşturma İpuçları */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 shadow-xl mt-8">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Güçlü Şifre Oluşturma İpuçları</h2>
              <ul className="space-y-4">
                {passwordTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-cyan-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Güvenli Şifre Yönetimi */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 shadow-xl mt-8">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Güvenli Şifre Yönetimi</h2>
              <p className="text-gray-300 mb-4">
                Günümüzde onlarca hatta yüzlerce çevrimiçi hesaba sahip olduğumuz için, her biri için güçlü ve benzersiz şifreler oluşturmak ve hatırlamak zor olabilir. İşte bu sorunu çözmek için bazı stratejiler:
              </p>
              
              <div className="space-y-6 mt-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-3">1. Şifre Yöneticisi Kullanın</h3>
                  <p className="text-gray-300">
                    Şifre yöneticileri, tüm şifrelerinizi güvenli bir şekilde saklar ve genellikle güçlü şifreler oluşturmanıza yardımcı olur. Sadece bir ana şifre hatırlamanız gerekir.
                  </p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-3">2. İki Faktörlü Doğrulama (2FA) Kullanın</h3>
                  <p className="text-gray-300">
                    2FA, şifrenize ek bir güvenlik katmanı ekler. Şifrenizi bilseler bile, saldırganların hesabınıza erişmek için ikinci bir faktöre ihtiyacı olur (örn. telefonunuza gelen kod).
                  </p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-3">3. Şifre Resetleme Bilgilerinizi Güvende Tutun</h3>
                  <p className="text-gray-300">
                    Güvenlik sorularınızın cevapları ve şifre sıfırlama e-posta adresiniz de en az şifreniz kadar önemlidir. Güvenlik sorularınız için gerçek cevaplar yerine rastgele cevaplar kullanmayı düşünün.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Diğer Güvenlik Alıştırmalarına Linkler */}
            <div className="mt-10">
              <h3 className="text-xl font-bold text-white mb-6">Diğer Güvenlik Alıştırmaları</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/egitimler/sosyal-muhendislik" className="block">
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-all transform hover:-translate-y-1 hover:shadow-lg">
                    <div className="text-cyan-400 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Sosyal Mühendislik</h4>
                    <p className="text-gray-300">Sosyal mühendislik tekniklerini tanıma ve savunma yöntemlerini öğrenin.</p>
                  </div>
                </Link>
                
                <Link href="/egitimler/malware-detection" className="block">
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-all transform hover:-translate-y-1 hover:shadow-lg">
                    <div className="text-cyan-400 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Zararlı Yazılım Tespiti</h4>
                    <p className="text-gray-300">Zararlı yazılımları ve şüpheli dosyaları tanıma becerilerinizi geliştirin.</p>
                  </div>
                </Link>
                
                <Link href="/egitimler/data-leakage" className="block">
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-all transform hover:-translate-y-1 hover:shadow-lg">
                    <div className="text-cyan-400 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Veri Sızıntısı Riski</h4>
                    <p className="text-gray-300">Ofis ortamındaki potansiyel veri sızıntısı risklerini nasıl tespit edeceğinizi öğrenin.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
} 
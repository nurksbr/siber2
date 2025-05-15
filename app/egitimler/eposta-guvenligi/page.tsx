'use client'

import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'

// Levenshtein mesafe hesaplama fonksiyonu
function levenshtein(a: string, b: string): number {
  const dp = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(0))

  for (let i = 0; i <= a.length; i++) dp[i][0] = i
  for (let j = 0; j <= b.length; j++) dp[0][j] = j

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      )
    }
  }

  return dp[a.length][b.length]
}

export default function EPostaGuvenligi() {
  const [emailInput, setEmailInput] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const suspiciousDomains = [
    'secure-paymment.com',
    'login-alert.net',
    'mail-recovery.info',
    'update-security.co',
    'bank-verify.org'
  ]

  const suspiciousExtensions = ['.exe', '.zip', '.rar', '.html', '.scr']

  const phishingKeywords = ['verify', 'account', 'login', 'update', 'urgent', 'click here']

  const analyzeEmail = () => {
    let warnings = []

    const email = emailInput.trim().toLowerCase()

    // Geçersiz yapısal e-posta kontrolü
    if (!email || !email.includes('@') || email.startsWith('@') || email.endsWith('@')) {
      setResult('❌ Bu geçerli bir e-posta adresi değil.')
      return
    }

    const [localPart, domain] = email.split('@')

    // Alan adı uzantı kontrolü (.com, .net, vs.)
    const validTlds = ['.com', '.net', '.org', '.gov', '.edu', '.info', '.co', '.tr']
    const hasValidTld = validTlds.some(tld => domain.endsWith(tld))
    if (!hasValidTld) {
      warnings.push(`⚠️ Alan adı uzantısı şüpheli görünüyor: "${domain}"`)
    }

    // Bilinen sahte alanlar
    if (suspiciousDomains.includes(domain)) {
      warnings.push('⚠️ Bu e-posta alan adı bilinen oltalama kaynakları arasında.')
    }

    // Alan adı typo (örnek: gmaill.com gibi)
    const knownBrands = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com']
    knownBrands.forEach(brand => {
      const distance = levenshtein(domain, brand)
      if (distance > 0 && distance <= 2) {
        warnings.push(`⚠️ "${domain}" alan adı, "${brand}" adresine çok benziyor. Bu bir sahte e-posta olabilir.`)
      }
    })

    phishingKeywords.forEach(keyword => {
      if (email.includes(keyword)) {
        warnings.push(`⚠️ E-posta içinde şüpheli kelime bulundu: "${keyword}"`)
      }
    })

    suspiciousExtensions.forEach(ext => {
      if (email.endsWith(ext)) {
        warnings.push(`⚠️ Şüpheli dosya uzantısı tespit edildi: "${ext}"`)
      }
    })

    if (warnings.length === 0) {
      setResult('✅ E-posta adresinde bariz bir şüpheli durum görünmüyor. Ancak yine de dikkatli ol!')
    } else {
      setResult(warnings.join('\n'))
    }
  }

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
                <span className="block text-cyan-400">📧 E-Posta Güvenliği Eğitimi</span>
              </h1>
              <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="px-4 py-2 bg-green-900/50 text-green-300 rounded-full flex items-center">
                  <span className="mr-2">🟩</span>
                  <span>Seviye: Temel</span>
                </div>
                <div className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-full flex items-center">
                  <span className="mr-2">⏱</span>
                  <span>Süre: ~40 dakika</span>
                </div>
              </div>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                <span className="mr-2">🎯</span>
                E-posta yoluyla gerçekleşen siber saldırılara karşı farkındalık kazanmak ve güvenli iletişim sağlamak
              </p>
            </div>
          </div>
        </section>

        {/* İnteraktif E-posta Kontrol Aracı */}
        <section className="py-12 bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 shadow-xl">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">🔍 Gelişmiş E-Posta Güvenliği Kontrolü</h2>
              <p className="text-gray-300 mb-6">
                Aşağıya bir e-posta adresi yaz, potansiyel tehditleri inceleyelim:
              </p>
              
              <div className="mb-6">
                <input 
                  type="text"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="örnek: login@secure-paymment.com"
                  className="p-3 rounded text-black w-full max-w-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button 
                  onClick={analyzeEmail}
                  className="mt-3 px-6 py-3 bg-cyan-600 rounded-md hover:bg-cyan-700 transition-colors font-medium"
                >
                  Analiz Et
                </button>
              </div>

              {result && (
                <div className="mt-4 p-6 bg-gray-800 rounded-lg border border-gray-700">
                  <p className="text-lg font-medium mb-1">Analiz Sonucu:</p>
                  <pre className="text-gray-300 whitespace-pre-wrap">{result}</pre>
                </div>
              )}
              
              <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-white">✅ Güvenli E-Posta Kullanım İpuçları</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>Güçlü şifre kullan ve 2FA etkinleştir</div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>Tanımadığın bağlantılara ve eklere tıklama</div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>E-posta adresini açık ortamlarda paylaşma</div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>Şifreleri e-posta ile gönderme</div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>Şüpheli e-postaları spam olarak işaretle</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* İçerik Bölümü */}
        <section className="py-12 bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 shadow-xl">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">🎓 Eğitim İçeriği</h2>
              </div>
              
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-white mb-4">1. Phishing (Oltalama) Nedir?</h3>
                <p className="text-gray-300 mb-6">
                  Oltalama saldırıları, kullanıcıları kandırarak kimlik bilgilerini, parolalarını veya finansal verilerini çalmak için kullanılan sahte e-posta yöntemidir.
                </p>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h4 className="text-lg font-medium text-white mb-4">🎯 Nasıl Anlaşılır?</h4>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <div>
                        <strong>Garip e-posta adresleri:</strong> noreply@secure-paymment.com
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <div>
                        <strong>Acele ettiren dil:</strong> "Hesabınız kapatılacak!", "Son şansınız!"
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <div>
                        <strong>Tuhaf ekler:</strong> .exe, .zip, .html
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <div>
                        <strong>Sahte bağlantılar:</strong> (linke tıklamadan üzerine gelerek kontrol et)
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-white mb-4">2. E-Posta Filtreleme Teknikleri</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      <strong>Spam filtreleri:</strong> Otomatik olarak şüpheli postaları gelen kutusundan ayırır.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      <strong>Alan adı güvenliği:</strong> DMARC, SPF, DKIM kayıtları kullanılarak sahte göndericiler engellenir.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      <strong>Kara liste / Beyaz liste:</strong> Güvenilmeyen ve güvenilen adresleri sınıflandırma.
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-white mb-4">3. Güvenli E-Posta Kullanım Kuralları</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      E-posta adresini herkese açık paylaşma
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      E-posta eklerine ve bağlantılara dikkatle yaklaş
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      Şifreleri e-posta ile paylaşma
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      İki faktörlü doğrulama (2FA) etkinleştir
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      E-posta istemcisini ve cihazını güncel tut
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-white mb-4">4. Güvenli İletişim Yöntemleri</h3>
                <p className="text-gray-300 mb-4">
                  Hassas içerikler için şifreli e-posta hizmetleri kullan:
                </p>
                <ul className="space-y-4 text-gray-300 mb-6">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      ProtonMail
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      Tutanota
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      Outlook S/MIME
                    </div>
                  </li>
                </ul>
                <p className="text-gray-300">
                  E-posta üzerinden değil, kurum içi sistemler üzerinden kritik bilgi paylaşımı tercih et.
                </p>
              </div>
              
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-white mb-4">✅ Eğitimin Kazanımları</h3>
                <p className="text-gray-300 mb-4">
                  Bu eğitimi tamamlayan birey:
                </p>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      Phishing e-postalarını tanıyabilir
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      Zararlı ek ve linkleri ayırt edebilir
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      E-posta hesaplarını daha güvenli hale getirebilir
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      Güvenli iletişim kurallarını uygulayabilir
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">📚 Ek Kaynaklar</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-medium text-white mb-2">Google Phishing Quiz</h4>
                    <p className="text-gray-300 mb-3">İngilizce interaktif oltalama testi</p>
                    <a href="https://phishingquiz.withgoogle.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      https://phishingquiz.withgoogle.com/
                    </a>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-medium text-white mb-2">BTK Akademi – E-Posta Güvenliği Eğitimi</h4>
                    <p className="text-gray-300 mb-3">Ücretsiz, sertifikalı, Türkçe</p>
                    <a href="https://www.btkakademi.gov.tr" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      https://www.btkakademi.gov.tr
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* İlgili Eğitimler */}
        <section className="py-12 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-6">İlgili Eğitimler</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/egitimler/temel-siber-guvenlik" className="block">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-2">💻 Siber Güvenlik Temelleri Eğitimi</h3>
                  <p className="text-gray-300 mb-4">Siber güvenliğin temel kavramları, tehdit türleri ve kişisel güvenlik önlemleri</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">45 dakika</span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-900 text-green-300">Temel</span>
                  </div>
                </div>
              </Link>
              
              <Link href="/egitimler/phishing-simulasyonu" className="block">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-2">Phishing Simülasyonu</h3>
                  <p className="text-gray-300 mb-4">Oltalama saldırılarını tespit etme ve gerçek/sahte e-postaları ayırt etme alıştırmaları</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">25 dakika</span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-900 text-green-300">Temel</span>
                  </div>
                </div>
              </Link>
              
              <Link href="/egitimler/sosyal-muhendislik" className="block">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-2">Sosyal Mühendislik Teknikleri</h3>
                  <p className="text-gray-300 mb-4">Sosyal mühendislik saldırılarını tanıma, savunma ve bilgi güvenliği farkındalığı</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">50 dakika</span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-900 text-yellow-300">Orta</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
} 
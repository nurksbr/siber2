import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'

export default function SiberGuvenlikTemelleri() {
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
                <span className="block text-cyan-400">💻 Siber Güvenlik Temelleri Eğitimi</span>
              </h1>
            </div>
          </div>
        </section>

        {/* İçerik Bölümü */}
        <section className="py-12 bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 shadow-xl">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">🔐 1. Siber Güvenliğin Temel Kavramları</h2>
                <p className="text-gray-300 mb-4">
                  <strong>Siber güvenlik:</strong> Bilgi sistemlerinin gizliliğini, bütünlüğünü ve erişilebilirliğini korumak.
                </p>
                
                <h3 className="text-xl font-semibold text-white mt-6 mb-4">CIA üçgeni:</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      <strong>C (Confidentiality / Gizlilik):</strong> Bilgiyi yetkisiz erişimden koruma.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      <strong>I (Integrity / Bütünlük):</strong> Bilginin doğruluğunun ve tutarlılığının korunması.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      <strong>A (Availability / Erişilebilirlik):</strong> Yetkili kullanıcıların bilgilere ihtiyaç duyduklarında ulaşabilmesi.
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">🛡️ 2. Tehdit Türleri</h2>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      <strong>Zararlı yazılımlar (Malware):</strong> Virüs, trojan, ransomware, worm.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      <strong>Sosyal mühendislik:</strong> Kullanıcıları kandırarak bilgi elde etme (örnek: phishing).
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      <strong>Sızma (intrusion) ve ağ saldırıları:</strong> DDoS, Man-in-the-Middle, brute force.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      <strong>İç tehditler:</strong> Kurum içindeki kötü niyetli veya dikkatsiz kullanıcılar.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      <strong>Zero-day açıklar:</strong> Üretici tarafından henüz bilinmeyen güvenlik açıkları.
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">🧍‍♂️ 3. Kişisel Güvenlik Önlemleri</h2>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      Güçlü ve benzersiz şifreler kullan (parola yöneticisi önerilir).
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      2FA (iki faktörlü kimlik doğrulama) etkinleştir.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      Phishing e-postalarına dikkat et, eklere tıklama.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      Güncel antivirüs kullan ve sistemini güncel tut.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      Herkese açık Wi-Fi ağlarında VPN kullan.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      Kamera ve mikrofon izinlerini denetle.
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">📚 Önerilen Eğitim Kaynakları</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">🔸 Türkçe</h3>
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-medium text-white mb-2">BTK Akademi – Siber Güvenliğe Giriş</h4>
                    <p className="text-gray-300 mb-3">Ücretsiz, sertifikalı, Türkçe</p>
                    <a href="https://www.btkakademi.gov.tr" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      https://www.btkakademi.gov.tr
                    </a>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">🔸 İngilizce</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                      <h4 className="text-lg font-medium text-white mb-2">Coursera – Introduction to Cyber Security (NYU)</h4>
                      <p className="text-gray-300 mb-3">Temel konular, sertifikalı</p>
                      <a href="https://coursera.org" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                        https://coursera.org
                      </a>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                      <h4 className="text-lg font-medium text-white mb-2">Cybrary – Cybersecurity for Beginners</h4>
                      <p className="text-gray-300 mb-3">Kapsamlı içerik, kariyere hazırlık odaklı</p>
                      <a href="https://www.cybrary.it" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                        https://www.cybrary.it
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">🎓 Hedef Kitle</h2>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      Bireyler, öğrenciler ve IT sektörüne giriş yapmak isteyen herkes.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      Kurumsal çalışanlar için farkındalık eğitimi olarak da uygundur.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Diğer Eğitimler */}
        <section className="py-12 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-6">Diğer Eğitimler</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/egitimler/password-checker" className="block">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-2">🔑 Güçlü Parola Oluşturma Rehberi</h3>
                  <p className="text-gray-300 mb-4">Güvenli şifre oluşturma, şifre yöneticileri ve çok faktörlü kimlik doğrulama</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">30 dakika</span>
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
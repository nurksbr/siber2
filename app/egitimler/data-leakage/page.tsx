'use client'

import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Image from 'next/image'

// Ofis ortamı veri sızıntısı risk senaryoları
const scenarios = [
  {
    id: 1,
    title: 'Açık Ekran Politikası',
    image: 'https://placehold.co/600x400',
    description: 'Müşteri bilgilerini gösteren bir ekran açık bırakılmış ve çalışan yerinde yok.',
    riskPoints: [
      { x: 45, y: 35, description: 'Kimlik bilgileri içeren açık bırakılmış ekran' },
      { x: 80, y: 55, description: 'Gözetimsiz bilgisayar istasyonu' },
      { x: 20, y: 70, description: 'Kayıt defterinde müşteri bilgileri' }
    ],
    explanation: 'Açık bırakılan ekranlar, hassas verilere yetkisiz erişim riski oluşturur. Her çalışan, kısa bir süre için bile olsa masasından ayrıldığında bilgisayarını kilitlemelidir (Windows için Win+L tuşları). Ayrıca, fiziksel belgeler de (örn. kayıt defteri) hassas bilgiler içeriyorsa güvenli şekilde saklanmalıdır.',
    preventionTips: [
      'Bilgisayarınızdan ayrılırken ekranı kilitleyin (Win+L)',
      'Otomatik ekran kilitleme süresini en fazla 5 dakika olarak ayarlayın',
      'Fiziksel belgeleri güvenli bir şekilde saklayın',
      'Temiz masa politikası uygulayın'
    ]
  },
  {
    id: 2,
    title: 'Yazıcı ve Ortak Alanlar',
    image: 'https://placehold.co/600x400',
    description: 'Şirket yazıcısının yanında unutulmuş belgeler ve şüpheli bir USB bellek var.',
    riskPoints: [
      { x: 75, y: 30, description: 'Yazıcıda unutulmuş hassas belgeler' },
      { x: 30, y: 50, description: 'İşaretsiz, sahipsiz USB bellek' },
      { x: 60, y: 65, description: 'Kilitlenmemiş belge dolabı' }
    ],
    explanation: 'Yazıcılar gibi ortak alanlar, veri sızıntısı için kritik noktalardır. Burada unutulan belgeler herkes tarafından görülebilir. Ayrıca, sahipsiz USB bellekler güvenlik riski oluşturur - bu tür cihazlar zararlı yazılım taşıyabilir veya veri çalmak için yerleştirilmiş olabilir.',
    preventionTips: [
      'Yazdırılan belgeleri hemen alın',
      'Gizli belgeler için güvenli yazdırma kullanın (kimlik doğrulama ile)',
      'Bulduğunuz USB bellekleri asla bilgisayarınıza takmayın',
      'Belge dolaplarını her zaman kilitli tutun'
    ]
  },
  {
    id: 3,
    title: 'Toplantı Odası Riskleri',
    image: 'https://placehold.co/600x400',
    description: 'Bir toplantı odası: tahta üzerinde gizli proje bilgileri, video konferans ekranı açık ve not kağıtları masa üzerinde dağınık durumda.',
    riskPoints: [
      { x: 20, y: 25, description: 'Silinmemiş tahta üzerinde gizli proje bilgileri' },
      { x: 70, y: 40, description: 'Bağlantısı kesilmemiş video konferans' },
      { x: 40, y: 80, description: 'Masada bırakılmış toplantı notları' }
    ],
    explanation: 'Toplantı odaları, çeşitli veri sızıntısı riskleri barındırır. Beyaz tahtalar üzerinde hassas bilgilerin silinmeden bırakılması, aktif video konferans bağlantılarının kapatılmaması ve masa üzerinde bırakılan notlar, gizli bilgilerin istenmeyen kişilere sızmasına neden olabilir.',
    preventionTips: [
      'Toplantı bittikten sonra tahtaları temizleyin',
      'Video konferans uygulamalarından tamamen çıkış yapın',
      'Toplantı notlarını asla masa üzerinde bırakmayın',
      'Toplantı odasını terk etmeden önce kontrol listesi uygulayın'
    ]
  },
  {
    id: 4,
    title: 'Uzaktan Çalışma Ortamı',
    image: 'https://placehold.co/600x400',
    description: 'Bir kafe ortamında dizüstü bilgisayarla çalışan kişi, ekranı açıkça görülebilir durumda ve hassas bir belge üzerinde çalışıyor.',
    riskPoints: [
      { x: 35, y: 30, description: 'Herkese açık alanda görülebilir ekran' },
      { x: 70, y: 50, description: 'Güvensiz Wi-Fi bağlantısı' },
      { x: 20, y: 70, description: 'Masada bırakılmış şirket kimlik kartı' }
    ],
    explanation: 'Uzaktan çalışma, özellikle kamuya açık alanlarda, ekran görünürlüğü, güvensiz ağ bağlantıları ve fiziksel belge güvenliği açısından riskler oluşturur. Hassas bilgilerin kamuya açık alanlarda görüntülenmesi hem fiziksel gözetleme hem de siber saldırı riskleri yaratır.',
    preventionTips: [
      'Gizlilik filtresi kullanın',
      'Halka açık Wi-Fi ağlarında VPN kullanın',
      'Kimlik bilgilerinizi her zaman güvende tutun',
      'Hassas bilgiler üzerinde çalışırken etrafınıza dikkat edin'
    ]
  },
  {
    id: 5,
    title: 'Masa Üstü ve Doküman Güvenliği',
    image: 'https://placehold.co/600x400',
    description: 'Bir ofis masası: yapışkan notlarda şifreler, kağıtlar üzerinde müşteri verileri ve kilitsiz çekmecede dosyalar görülüyor.',
    riskPoints: [
      { x: 75, y: 25, description: 'Ekrana yapıştırılmış şifre notları' },
      { x: 30, y: 60, description: 'Açıkta bırakılmış müşteri verileri' },
      { x: 50, y: 80, description: 'Kilitlenmemiş çekmecede hassas dosyalar' }
    ],
    explanation: 'Çalışma masası, veri güvenliği için kritik bir alandır. Yapışkan notlarda yazılı şifreler, açıkta bırakılan belgeler ve güvenli olmayan depolama, veri ihlallerine davetiye çıkarır. Hatta ekranın kendisi de (arka plan, dosya ve klasör adları) hassas bilgileri gösterebilir.',
    preventionTips: [
      'Şifreleri yapışkan notlara yazmak yerine şifre yöneticisi kullanın',
      'Gün sonunda masayı tamamen temizleyin',
      'Hassas belgeleri kilitli dolaplarda saklayın',
      'Dosya ve klasör adlarında gizli bilgileri kullanmaktan kaçının'
    ]
  }
]

export default function DataLeakagePage() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [foundRisks, setFoundRisks] = useState<Record<number, number[]>>({})
  const [showingAnswer, setShowingAnswer] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [totalScore, setTotalScore] = useState(0)

  // Bir risk noktasına tıklandığında
  const handleRiskClick = (scenarioId: number, riskIndex: number) => {
    if (gameCompleted) return

    // Daha önce bulunmuş riski tekrar tıklamayı engelle
    if (foundRisks[scenarioId]?.includes(riskIndex)) return

    // Yeni bulunan riski ekle
    setFoundRisks(prev => ({
      ...prev,
      [scenarioId]: [...(prev[scenarioId] || []), riskIndex]
    }))

    // Puanı güncelle
    setTotalScore(prev => prev + 10)
  }

  // Sonraki senaryoya geç
  const goToNextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1)
      setShowingAnswer(false)
    } else {
      setGameCompleted(true)
    }
  }

  // Cevapları göster/gizle
  const toggleShowAnswer = () => {
    setShowingAnswer(prev => !prev)
  }

  // Oyunu yeniden başlat
  const restartGame = () => {
    setCurrentScenario(0)
    setFoundRisks({})
    setShowingAnswer(false)
    setGameCompleted(false)
    setTotalScore(0)
  }

  // Mevcut senaryo
  const scenario = scenarios[currentScenario]

  // Mevcut senaryoda bulunan risk sayısı
  const foundRiskCount = foundRisks[scenario.id]?.length || 0
  const totalRiskCount = scenario.riskPoints.length

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
                <span className="block">Veri Sızıntısı</span>
                <span className="block text-cyan-400">Risk Tespiti</span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                Ofis ortamındaki veri sızıntısı risklerini tespit etme ve önleme becerilerinizi geliştirin
              </p>
            </div>
          </div>
        </section>

        {/* Alıştırma Açıklaması */}
        <section className="py-12 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {!gameCompleted ? (
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 shadow-xl mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-cyan-400">Senaryo {currentScenario + 1}: {scenario.title}</h2>
                  <div className="flex items-center space-x-2">
                    <div className="text-gray-300">Skor:</div>
                    <div className="bg-cyan-900 px-3 py-1 rounded-lg text-lg font-semibold text-cyan-100">{totalScore}</div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-8">
                  {scenario.description}
                </p>
                
                <div className="bg-cyan-900 bg-opacity-30 p-4 rounded-lg border border-cyan-700 mb-6">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">Göreviniz</h3>
                  <p className="text-gray-300">
                    Aşağıdaki görüntüde, potansiyel veri sızıntısı risklerini temsil eden noktaları bulun. Görüntüdeki risk noktalarına tıklayarak onları işaretleyin.
                  </p>
                </div>
                
                <div className="mb-6">
                  <div className="text-right text-gray-400 mb-2">
                    Bulunan: {foundRiskCount} / {totalRiskCount}
                  </div>
                  
                  <div className="relative w-full border border-gray-700 rounded-lg overflow-hidden" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="relative" style={{ paddingBottom: '66.67%' }}>
                      <div className="absolute inset-0">
                        {/* Resim yerleşimi */}
                        <Image 
                          src={scenario.image} 
                          alt={scenario.title} 
                          layout="fill" 
                          objectFit="cover"
                          priority
                        />
                        
                        {/* Riskli noktalar */}
                        {scenario.riskPoints.map((point, index) => (
                          <div 
                            key={index}
                            className={`absolute rounded-full cursor-pointer hover:opacity-80 transition-opacity
                              ${(showingAnswer || foundRisks[scenario.id]?.includes(index)) 
                                ? 'w-6 h-6 bg-cyan-500 border-2 border-white shadow-lg' 
                                : 'w-12 h-12 bg-transparent'}`} 
                            style={{ 
                              left: `${point.x}%`, 
                              top: `${point.y}%`, 
                              transform: 'translate(-50%, -50%)' 
                            }}
                            onClick={() => handleRiskClick(scenario.id, index)}
                          >
                            {(showingAnswer || foundRisks[scenario.id]?.includes(index)) && (
                              <div className="flex items-center justify-center w-full h-full text-xs font-bold text-white">
                                {index + 1}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Açıklamalar (cevaplar gösterildiğinde) */}
                {showingAnswer && (
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Risk Açıklamaları</h3>
                    <ul className="space-y-3">
                      {scenario.riskPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm mr-3">
                            {index + 1}
                          </div>
                          <div className="text-gray-300">{point.description}</div>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-white mb-2">Senaryo Açıklaması</h4>
                      <p className="text-gray-300 mb-4">{scenario.explanation}</p>
                      
                      <h4 className="text-lg font-semibold text-white mb-2">Önleme İpuçları</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {scenario.preventionTips.map((tip, index) => (
                          <li key={index} className="text-gray-300">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row sm:justify-between mt-8">
                  <button
                    onClick={toggleShowAnswer}
                    className="px-4 py-2 rounded-lg text-white bg-gray-700 hover:bg-gray-600 transition-colors mb-4 sm:mb-0"
                  >
                    {showingAnswer ? 'Cevapları Gizle' : 'Cevapları Göster'}
                  </button>
                  
                  <button
                    onClick={goToNextScenario}
                    className="px-6 py-2 rounded-lg text-white bg-cyan-600 hover:bg-cyan-700 transition-colors"
                  >
                    {currentScenario < scenarios.length - 1 ? 'Sonraki Senaryo' : 'Sonuçları Göster'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 shadow-xl mb-10">
                <h2 className="text-3xl font-bold text-center text-cyan-400 mb-8">Alıştırma Tamamlandı!</h2>
                
                <div className="flex justify-center mb-8">
                  <div className="bg-gray-800 py-6 px-10 rounded-xl border border-gray-700 flex flex-col items-center">
                    <div className="text-2xl text-gray-300 mb-2">Toplam Puanınız</div>
                    <div className="text-5xl font-bold text-white">{totalScore}</div>
                    <div className="text-gray-400 mt-2">Maksimum: {scenarios.reduce((total, s) => total + (s.riskPoints.length * 10), 0)}</div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Alıştırma Özeti</h3>
                  <p className="text-gray-300 mb-6">
                    Bu alıştırmada, ofis ortamındaki potansiyel veri sızıntısı risklerini tespit etmeyi ve bu risklere karşı alınabilecek önlemleri öğrendiniz. Kurumsal verilerin korunması, yalnızca teknik önlemlerle değil, aynı zamanda tüm çalışanların günlük davranışlarıyla da sağlanır.
                  </p>
                  
                  <div className="bg-cyan-900 bg-opacity-30 p-6 rounded-lg border border-cyan-700">
                    <h4 className="text-lg font-semibold text-cyan-400 mb-3">Veri Sızıntısını Önlemek İçin Temel İlkeler</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-cyan-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-300">Temiz masa, temiz ekran politikasını uygulayın</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-cyan-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-300">Hassas bilgileri fiziksel olarak her zaman güvende tutun</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-cyan-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-300">Şifreleri ve kimlik bilgilerini asla açıkta bırakmayın</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-cyan-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-300">Dosya paylaşırken "bilmesi gereken" ilkesini uygulayın</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-cyan-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-300">Şüpheli durumları hemen raporlayın</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={restartGame}
                    className="px-8 py-3 rounded-lg text-white font-medium bg-cyan-600 hover:bg-cyan-700 transition-colors"
                  >
                    Alıştırmayı Tekrar Başlat
                  </button>
                </div>
              </div>
            )}
            
            {/* Diğer Güvenlik Eğitimlerine Linkler */}
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
                
                <Link href="/egitimler/password-checker" className="block">
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-all transform hover:-translate-y-1 hover:shadow-lg">
                    <div className="text-cyan-400 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Şifre Güvenliği</h4>
                    <p className="text-gray-300">Şifrelerinizin ne kadar güvenli olduğunu test edin ve güçlü şifreler oluşturmayı öğrenin.</p>
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
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
} 
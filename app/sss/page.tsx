'use client'

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    category: "Genel Siber Güvenlik",
    question: "Siber güvenlik nedir ve neden önemlidir?",
    answer: "Siber güvenlik, bilgisayar sistemleri, ağlar, programlar ve verilerin dijital saldırılardan korunması için uygulanan teknolojiler, süreçler ve uygulamaların bütünüdür. Önemlidir çünkü: 1) Kişisel ve kurumsal verilerinizi korur, 2) Finansal kayıpları önler, 3) İtibarınızı korur, 4) Yasal yükümlülükleri yerine getirmenizi sağlar, 5) İş sürekliliğini garanti eder."
  },
  {
    category: "Genel Siber Güvenlik",
    question: "En yaygın siber güvenlik tehditleri nelerdir?",
    answer: "En yaygın siber güvenlik tehditleri: 1) Fidye yazılımları (Ransomware), 2) Kimlik avı (Phishing) saldırıları, 3) Kötü amaçlı yazılımlar (Malware), 4) Sosyal mühendislik saldırıları, 5) DDoS (Distributed Denial of Service) saldırıları, 6) Veri sızıntıları, 7) Şifre saldırıları, 8) Sıfır gün açıkları."
  },
  {
    category: "Genel Siber Güvenlik",
    question: "Siber güvenlik riskleri nasıl değerlendirilir?",
    answer: "Siber güvenlik riskleri şu adımlarla değerlendirilir: 1) Varlıkların tespiti ve sınıflandırılması, 2) Tehditlerin belirlenmesi ve analizi, 3) Zafiyetlerin tespiti, 4) Risk skorlaması, 5) Önceliklendirme, 6) Risk azaltma stratejilerinin belirlenmesi, 7) Sürekli izleme ve güncelleme. Risk değerlendirmesi düzenli olarak tekrarlanmalıdır."
  },
  {
    category: "Kişisel Güvenlik",
    question: "Güçlü bir şifre nasıl oluşturulur?",
    answer: "Güçlü bir şifre oluşturmak için: 1) En az 12 karakter kullanın, 2) Büyük ve küçük harfler kullanın, 3) Sayılar ekleyin, 4) Özel karakterler kullanın, 5) Tahmin edilebilir kelimelerden kaçının, 6) Her hesap için farklı şifre kullanın, 7) Şifre yöneticisi kullanmayı düşünün. Örnek: 'P@ssw0rd123!' yerine 'K9#mP$vL2@nX5' gibi karmaşık bir şifre kullanın."
  },
  {
    category: "Kişisel Güvenlik",
    question: "İki faktörlü doğrulama (2FA) nedir ve neden kullanmalıyım?",
    answer: "İki faktörlü doğrulama, hesabınıza giriş yaparken iki farklı doğrulama yöntemi kullanmanızı gerektiren bir güvenlik önlemidir. Örneğin: 1) Şifreniz (bildiğiniz bir şey), 2) Telefonunuza gelen kod (sahip olduğunuz bir şey). Kullanmanız önerilir çünkü: 1) Hesabınızı %99.9 daha güvenli hale getirir, 2) Şifreniz çalınsa bile hesabınıza erişimi engeller, 3) Çoğu büyük platform ücretsiz olarak sunuyor."
  },
  {
    category: "Kişisel Güvenlik",
    question: "Sosyal medya güvenliği nasıl sağlanır?",
    answer: "Sosyal medya güvenliği için: 1) Güçlü şifreler kullanın, 2) İki faktörlü doğrulama aktif edin, 3) Gizlilik ayarlarını düzenli kontrol edin, 4) Şüpheli bağlantılara tıklamayın, 5) Kişisel bilgilerinizi paylaşmayın, 6) Düzenli güvenlik kontrolleri yapın, 7) Güvenilir olmayan uygulamalara izin vermeyin, 8) Oturum açık kalmış hesapları kapatın."
  },
  {
    category: "Kurumsal Güvenlik",
    question: "Şirketim için temel siber güvenlik önlemleri nelerdir?",
    answer: "Temel kurumsal siber güvenlik önlemleri: 1) Güvenlik duvarı ve antivirüs yazılımları, 2) Düzenli güvenlik güncellemeleri, 3) Çalışan eğitimleri, 4) Veri yedekleme sistemleri, 5) Erişim kontrolü ve yetkilendirme, 6) Olay müdahale planı, 7) Güvenlik politikaları ve prosedürleri, 8) Düzenli güvenlik denetimleri."
  },
  {
    category: "Kurumsal Güvenlik",
    question: "Veri sızıntısı durumunda ne yapılmalıdır?",
    answer: "Veri sızıntısı durumunda yapılması gerekenler: 1) Olayı hemen tespit edin ve izole edin, 2) Güvenlik ekibini ve yönetimi bilgilendirin, 3) Etkilenen sistemleri güvenli hale getirin, 4) Yasal gereklilikleri yerine getirin (KVKK, GDPR vb.), 5) Müşterileri ve paydaşları bilgilendirin, 6) Olayı belgelendirin ve analiz edin, 7) Önleyici tedbirleri güncelleyin."
  },
  {
    category: "Kurumsal Güvenlik",
    question: "Çalışan siber güvenlik eğitimi nasıl yapılır?",
    answer: "Çalışan siber güvenlik eğitimi için: 1) Düzenli eğitim programları oluşturun, 2) Gerçek senaryolar üzerinden pratik yapın, 3) Phishing simülasyonları düzenleyin, 4) Güvenlik politikalarını anlatın, 5) Olay raporlama prosedürlerini öğretin, 6) Güncel tehditler hakkında bilgilendirin, 7) Eğitim sonrası değerlendirme yapın, 8) Sürekli güncelleme ve tekrar sağlayın."
  },
  {
    category: "Yasal ve Düzenleyici",
    question: "KVKK (Kişisel Verilerin Korunması Kanunu) nedir?",
    answer: "KVKK, kişisel verilerin işlenmesi ve korunmasına ilişkin kuralları belirleyen bir kanundur. Önemli noktalar: 1) Kişisel verilerin işlenmesi için açık rıza gereklidir, 2) Veri güvenliği önlemleri alınmalıdır, 3) Veri sızıntısı durumunda bildirim yapılmalıdır, 4) Veri sahiplerinin hakları korunmalıdır, 5) Veri işleme kayıtları tutulmalıdır, 6) Veri koruma görevlisi atanmalıdır."
  },
  {
    category: "Yasal ve Düzenleyici",
    question: "Siber suçların yasal sonuçları nelerdir?",
    answer: "Siber suçların yasal sonuçları: 1) TCK'da tanımlanan suçlar (madde 243-245), 2) Ağır para cezaları, 3) Hapis cezaları, 4) Tazminat yükümlülükleri, 5) İtibar kaybı, 6) Lisans iptalleri, 7) İş yapma yasağı. Örnek: KVKK ihlali durumunda 1.8 milyon TL'ye varan para cezaları uygulanabilir."
  },
  {
    category: "Yasal ve Düzenleyici",
    question: "Siber sigorta nedir ve neden önemlidir?",
    answer: "Siber sigorta, siber saldırılar ve veri sızıntıları sonucu oluşabilecek maddi kayıpları karşılayan bir sigorta türüdür. Önemlidir çünkü: 1) Finansal kayıpları karşılar, 2) İtibar yönetimi maliyetlerini karşılar, 3) Yasal savunma giderlerini karşılar, 4) İş kesintisi kayıplarını karşılar, 5) Veri kurtarma maliyetlerini karşılar, 6) Müşteri bildirim maliyetlerini karşılar."
  },
  {
    category: "Güncel Tehditler",
    question: "Yapay zeka ve siber güvenlik ilişkisi nedir?",
    answer: "Yapay zeka ve siber güvenlik ilişkisi: 1) Yapay zeka saldırıları tespit etmek için kullanılır, 2) Otomatik tehdit analizi yapabilir, 3) Sahte e-postaları tespit edebilir, 4) Anormal davranışları belirleyebilir, 5) Güvenlik açıklarını önceden tespit edebilir. Ancak yapay zeka aynı zamanda siber saldırganlar tarafından da kullanılabilir."
  },
  {
    category: "Güncel Tehditler",
    question: "Kripto para ve blockchain güvenliği nasıl sağlanır?",
    answer: "Kripto para ve blockchain güvenliği için: 1) Güvenli cüzdan kullanımı, 2) İki faktörlü doğrulama, 3) Soğuk depolama çözümleri, 4) Güvenilir borsaların kullanımı, 5) Özel anahtarların güvenli saklanması, 6) Düzenli güvenlik denetimleri, 7) Şüpheli işlemlerin takibi, 8) Yedekleme stratejileri önemlidir."
  },
  {
    category: "Güncel Tehditler",
    question: "IoT (Nesnelerin İnterneti) güvenliği nasıl sağlanır?",
    answer: "IoT güvenliği için: 1) Güçlü şifreler kullanın, 2) Cihazları güncel tutun, 3) Güvenlik duvarı kullanın, 4) Ağ segmentasyonu yapın, 5) Varsayılan ayarları değiştirin, 6) Düzenli güvenlik taramaları yapın, 7) Güvenilir markaların ürünlerini kullanın, 8) Cihaz erişimlerini sınırlayın, 9) Veri şifreleme kullanın."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', ...new Set(faqData.map(item => item.category))]

  const filteredFAQs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory)

  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-900">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute -top-1/4 -right-1/4 h-96 w-96 rounded-full bg-cyan-600 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Sıkça Sorulan</span>
                <span className="block text-cyan-400">Sorular</span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                Siber güvenlik hakkında merak ettiğiniz tüm soruların cevapları.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category === 'all' ? 'Tümü' : category}
                </button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-800 transition-colors"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className="text-lg font-medium text-white">{faq.question}</span>
                    <svg
                      className={`w-6 h-6 text-gray-400 transform transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 py-4 bg-gray-800">
                      <p className="text-gray-300 whitespace-pre-line">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
} 
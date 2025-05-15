import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'

export default function SocialEngineeringPage() {
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
                <span className="block">Sosyal Mühendislik</span>
                <span className="block text-cyan-400">Senaryoları</span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                Sosyal mühendislik tekniklerini tanıma ve savunma yöntemlerini öğrenme alıştırmaları
              </p>
            </div>
          </div>
        </section>

        {/* Senaryo Açıklaması */}
        <section className="py-12 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 shadow-xl">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Telefon Görüşmesi Senaryosu</h2>
              <p className="text-gray-300 mb-6">
                Bu interaktif senaryoda, bir sosyal mühendislik saldırısı sırasında kullanılan telefon görüşmesi tekniklerini tanıma ve analiz etme becerilerinizi test edeceksiniz. Aşağıdaki senaryoyu dikkatlice okuyun ve soruları cevaplayın.
              </p>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-8">
                <h3 className="text-xl font-bold text-white mb-3">Senaryo: "IT Destek Çağrısı"</h3>
                <p className="text-gray-300 mb-4">
                  Siz ABC Şirketi'nin İnsan Kaynakları departmanında çalışan Ayşe'siniz. Pazartesi sabahı, masanızdaki telefonunuz çalar. Arayan kişi kendisini şirketinizin IT departmanından "Mehmet Yılmaz" olarak tanıtır:
                </p>
                
                <div className="bg-gray-700 p-4 rounded-lg mb-4 border-l-4 border-cyan-500">
                  <p className="text-white italic">
                    "Merhaba, ben IT departmanından Mehmet. Geçen hafta sonu şirket ağımızda bazı güvenlik sorunları tespit ettik ve tüm çalışanların hesaplarını güncellememiz gerekiyor. Bu sizin için uygun bir zaman mı?"
                  </p>
                </div>
                
                <p className="text-gray-300 mb-4">
                  Siz kibarca 'evet' dersiniz. Mehmet devam eder:
                </p>
                
                <div className="bg-gray-700 p-4 rounded-lg mb-4 border-l-4 border-cyan-500">
                  <p className="text-white italic">
                    "Harika, çok zamanınızı almayacağım. Öncelikle, sizden şirket kullanıcı adınızı ve mevcut şifrenizi almanın bir yolu var mı? Bu bilgilerle hesabınızı güncellememiz gerekiyor. Ayrıca, şirket portalına giriş yaparken kullandığınız güvenlik sorusu nedir? Tüm bu bilgileri güncelleyeceğiz."
                  </p>
                </div>
                
                <p className="text-gray-300 mb-4">
                  Siz biraz tereddüt edersiniz, ancak Mehmet hemen ekleme yapar:
                </p>
                
                <div className="bg-gray-700 p-4 rounded-lg mb-4 border-l-4 border-cyan-500">
                  <p className="text-white italic">
                    "Anlıyorum, şifrenizi paylaşmak konusunda endişeleriniz olabilir. Ama bu güncellemeler çok önemli. Bilgisayarınızdan açılan veritabanlarına erişim sağlanmış olabilir. Ayrıca, müdürünüz Hakan Bey bu güncellemelerin bugün tamamlanması gerektiğini özellikle belirtti. Tüm departman yöneticilerine zaten haber verilmişti."
                  </p>
                </div>
                
                <p className="text-gray-300">
                  Ardından, kullanıcı adınızı, şifrenizi ve güvenlik sorunuzu vermenizi ısrarla ister.
                </p>
              </div>
              
              {/* Soru ve Cevaplar */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Bu senaryoda hangi sosyal mühendislik teknikleri kullanılmıştır?</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer">
                      <p className="text-gray-300">1. Yetkili kişi olarak kendini tanıtma (Pretexting)</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer">
                      <p className="text-gray-300">2. Aciliyet yaratma (Creating urgency)</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer">
                      <p className="text-gray-300">3. Korku ve endişe uyandırma (Fear tactics)</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer">
                      <p className="text-gray-300">4. Otorite figürlerine atıfta bulunma (Authority name-dropping)</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer">
                      <p className="text-gray-300">5. Hepsi</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Bu saldırıyı nasıl tespit edebilirdiniz?</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer">
                      <p className="text-gray-300">1. IT departmanını arayarak bu kişinin gerçekten orada çalışıp çalışmadığını doğrulamak</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer">
                      <p className="text-gray-300">2. Müdürünüzü arayarak böyle bir güncelleme olup olmadığını sormak</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer">
                      <p className="text-gray-300">3. Şirketin IT politikalarını hatırlamak (IT personeli genellikle telefonla şifre istemez)</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer">
                      <p className="text-gray-300">4. Arayanın iletişim bilgilerini istemek ve geri arama yapmak</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer">
                      <p className="text-gray-300">5. Yukarıdakilerin hepsi doğru önlemlerdir</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Bu tür bir sosyal mühendislik saldırısına karşı en iyi savunma yöntemi nedir?</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer">
                      <p className="text-gray-300">1. Hassas bilgileri telefonla asla paylaşmamak</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer">
                      <p className="text-gray-300">2. Her zaman kimlik doğrulaması yapmak</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer">
                      <p className="text-gray-300">3. Şüpheli istekleri ilgili departman yöneticisine bildirmek</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer">
                      <p className="text-gray-300">4. Şirket politikalarını ve prosedürlerini bilmek</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer">
                      <p className="text-gray-300">5. Tüm yukarıdakiler</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Seneryo Analizi */}
              <div className="mt-12 bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">Senaryo Analizi</h3>
                <p className="text-gray-300 mb-4">
                  Bu senaryoda, saldırgan birkaç yaygın sosyal mühendislik tekniğini bir arada kullanmaktadır:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-4">
                  <li><strong className="text-white">Pretexting (Bahane Uydurma):</strong> Saldırgan kendisini şirketin IT departmanından biri olarak tanıtarak güven kazanmaya çalışmaktadır.</li>
                  <li><strong className="text-white">Aciliyet Oluşturma:</strong> "Güvenlik sorunu" ve "bugün tamamlanması gerekiyor" gibi ifadelerle kurbanın düşünmeden hareket etmesini sağlamaya çalışmaktadır.</li>
                  <li><strong className="text-white">Korku Taktikleri:</strong> "Veritabanlarına erişim sağlanmış olabilir" ifadesiyle endişe yaratarak mantıklı düşünme yeteneğini zayıflatmayı amaçlamaktadır.</li>
                  <li><strong className="text-white">Otorite Kullanımı:</strong> Müdürün adını kullanarak talebe meşruiyet kazandırmaya çalışmaktadır.</li>
                </ul>
                <p className="text-gray-300">
                  Bu tür saldırılara karşı en iyi savunma, şirket politikalarını bilmek, kimlik doğrulama protokollerine uymak ve şüphelenmek için kendinize izin vermektir. Unutmayın: Meşru IT personeli asla telefonla şifrenizi istemez.
                </p>
              </div>
              
              {/* Diğer Senaryolara Link */}
              <div className="mt-10">
                <h3 className="text-xl font-bold text-white mb-6">Diğer Eğitim Senaryoları</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Link href="/egitimler/password-checker" className="block">
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-all transform hover:-translate-y-1 hover:shadow-lg">
                      <div className="text-cyan-400 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">Şifre Güvenliği Değerlendirmesi</h4>
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
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
} 
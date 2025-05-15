import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'

// Takım üyeleri verileri
const teamMembers = [
  {
    name: 'Fevziye Nur Kesebir',
    title: 'Kurucu & Geliştirici',
    bio: 'Siber güvenlik alanında tutkulu bir yazılım geliştirici olan Fevziye Nur, CYBERLY platformunun teknik altyapısını ve kullanıcı deneyimini oluşturdu.',
    image: 'https://placehold.co/150',
  },
  {
    name: 'Nisanur Gökçen Usta',
    title: 'Kurucu & Siber Güvenlik Uzmanı',
    bio: 'Siber güvenlik konusunda uzmanlaşan Nisanur, CYBERLY için içerik stratejisi ve güvenlik eğitim modüllerinin geliştirilmesinden sorumludur.',
    image: 'https://placehold.co/150',
  },
]

// Team üyesi kartı bileşeni
function TeamMemberCard({ member }: { member: typeof teamMembers[0] }) {
  return (
    <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300 shadow-xl">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-600 mb-6">
          <Image
            src={member.image}
            alt={member.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
            priority={true}
          />
        </div>
        <h3 className="text-2xl font-bold text-white text-center">{member.name}</h3>
        <p className="text-cyan-400 mb-4 text-center">{member.title}</p>
        <p className="text-gray-300 text-center">{member.bio}</p>
        
        <div className="mt-6 flex space-x-4">
          <a 
            href={member.name === 'Fevziye Nur Kesebir' ? 'https://github.com/nurksbr' : 'https://github.com/gokiceynn'} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-cyan-400 hover:bg-cyan-700 hover:text-white transition-colors" 
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a 
            href={member.name === 'Fevziye Nur Kesebir' ? 'https://www.linkedin.com/in/fevziyenurkesebir/' : 'https://www.linkedin.com/in/g%C3%B6k%C3%A7en-usta-271227295/'} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-cyan-400 hover:bg-cyan-700 hover:text-white transition-colors" 
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
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
                <span className="block">Hakkımızda</span>
                <span className="block text-cyan-400">CYBERLY</span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                Siber güvenlik alanında farkındalık oluşturmak ve toplumu bilinçlendirmek için çalışıyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                <h2 className="text-3xl font-bold text-cyan-400 mb-4">Misyonumuz</h2>
                <p className="text-gray-300">
                  Siber güvenlik konusunda toplumsal farkındalık oluşturmak, bireyleri ve kurumları dijital tehditlere karşı bilinçlendirmek ve korumak için kapsamlı eğitimler, araçlar ve çözümler sunmak. Herkesin güvenli bir dijital ortamda yaşamasını sağlamak için çalışmak.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                <h2 className="text-3xl font-bold text-cyan-400 mb-4">Vizyonumuz</h2>
                <p className="text-gray-300">
                  Türkiye'nin önde gelen siber güvenlik eğitim ve farkındalık platformu olmak, global standartlarda içerikler üretmek ve siber güvenlik alanında toplumsal dönüşüme öncülük etmek. Geleceğin dijital dünyasında güvenli bir ortam oluşturmak için yenilikçi çözümler geliştirmek.
                </p>
              </div>
            </div>

            {/* About Text */}
            <div className="mt-12 bg-gray-900 rounded-xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-cyan-400 mb-6">Neden CYBERLY?</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-4">
                  CYBERLY olarak, dijital dünyanın giderek karmaşıklaşan tehditlerine karşı toplumu güçlendirmeyi hedefliyoruz. Modern siber tehditler, sadece teknik bilgi gerektirmekle kalmıyor, aynı zamanda sürekli güncellenen bir farkındalık ve eğitim sürecini de zorunlu kılıyor.
                </p>
                <p className="text-gray-300 mb-4">
                  Platformumuz, kullanıcılarımıza:
                </p>
                <ul className="text-gray-300 list-disc pl-6 mb-4">
                  <li>Güncel siber güvenlik tehditleri hakkında bilgi</li>
                  <li>Pratik güvenlik önlemleri ve en iyi uygulamalar</li>
                  <li>İnteraktif eğitim içerikleri</li>
                  <li>Güvenlik araçları ve kaynakları</li>
                  <li>Uzman görüşleri ve analizler</li>
                </ul>
                <p className="text-gray-300">
                  sunarak, dijital dünyada güvenli bir şekilde var olmalarını sağlamayı amaçlıyor. Her yaştan ve her seviyeden kullanıcıya hitap eden içeriklerimizle, siber güvenlik konusunda toplumsal bir farkındalık oluşturmayı hedefliyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Ekibimiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
} 
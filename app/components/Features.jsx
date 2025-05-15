function Features() {
  const features = [
    {
      title: 'Phishing Simülasyonu',
      description: 'Gerçekçi phishing sayfaları ve e-posta örnekleriyle siber saldırıları tanımayı öğrenin.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 12H8m11 4v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2m4-6V4h4v6m-6 6 2-6m4 6 2-6" />
        </svg>
      ),
      link: '/egitimler/phishing-simulasyonu'
    },
    {
      title: 'Siber Farkındalık Nedir?',
      description: 'Dijital dünyada güvenliğinizi artıran farkındalık eğitimleri ve teknikleri hakkında bilgi edinin.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
      link: 'https://www.mimecast.com/content/cyber-security-awareness-training/'
    },
    {
      title: 'Web Güvenliği',
      description: 'Web sitelerinin ve uygulamaların güvenliği için önemli adımlar ve modern koruma yöntemleri.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
          <path d="M16.5 9.4 7.55 4.24" />
          <polyline points="3.29 7 12 12 20.71 7" />
          <line x1="12" y1="22" x2="12" y2="12" />
          <circle cx="18.5" cy="15.5" r="2.5" />
          <path d="M20.27 17.27 22 19" />
        </svg>
      ),
      link: '/siber-tehditler'
    },
    {
      title: 'Veri Koruma Yöntemleri',
      description: 'Kişisel ve kurumsal verilerinizi güvende tutmak için etkili stratejiler ve en iyi uygulamalar.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7H2Z" />
          <path d="M6 11V7H4" />
          <path d="M10 11V7H8" />
          <path d="M14 11V7h-2" />
          <path d="M18 11V7h-2" />
          <rect x="10" y="3" width="4" height="4" />
        </svg>
      ),
      link: '/ipuclari'
    },
    {
      title: 'Güvenli Yazılım Geliştirme',
      description: 'Yazılım geliştirme süreçlerinde güvenliği ön planda tutan yöntemler ve prensiplerin tanıtımı.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          <circle cx="12" cy="16" r="1" />
        </svg>
      ),
      link: '/blog'
    },
    {
      title: 'Kişisel Güvenlik İpuçları',
      description: 'Günlük dijital yaşantınızda uygulayabileceğiniz pratik güvenlik ipuçları ve önlemler.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      link: '/ipuclari'
    },
    {
      title: 'Güvenlik Teknolojileri',
      description: 'Modern güvenlik teknolojileri, yazılımları ve araçları hakkında detaylı incelemeler ve karşılaştırmalar.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      link: '/kaynaklar'
    },
  ]

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Dijital Güvenliğiniz İçin <span className="text-cyan-400 text-glow">Kapsamlı Rehberler</span>
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
            Güvenli bir dijital yaşam için ihtiyacınız olan tüm bilgiler ve kaynaklar.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-cyan-700 transition-colors shadow-xl hover:border-glow">
                <div className="w-12 h-12 rounded-md flex items-center justify-center bg-cyan-900 text-cyan-400">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-gray-400">
                  {feature.description}
                </p>
                <div className="mt-6">
                  <a href={feature.link} className="text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:text-glow transition-all">
                    Daha fazla bilgi &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features 
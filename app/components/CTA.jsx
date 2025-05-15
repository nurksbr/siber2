'use client'

function CTA() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Form gönderimi işlemi
    alert('Form başarıyla gönderildi! En kısa sürede size dönüş yapacağız.')
    // Form alanlarını temizle
    e.target.reset()
  }

  return (
    <section id="iletisim" className="relative py-24 bg-gray-900">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -bottom-1/4 -right-1/4 h-96 w-96 rounded-full bg-cyan-600 blur-3xl"></div>
        <div className="absolute -top-1/4 -left-1/4 h-96 w-96 rounded-full bg-blue-600 blur-3xl"></div>
      </div>
      
      <div className="absolute inset-0 z-0 opacity-10 bg-gradient-to-r from-transparent via-cyan-900 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Siber güvenliğinizi</span>
                  <span className="block text-cyan-400">bugün güçlendirin.</span>
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                  Ücretsiz güvenlik değerlendirmemiz ile sistemlerinizin ve verilerinizin ne kadar güvende olduğunu öğrenin.
                </p>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href="#"
                    className="px-8 py-3 rounded-md text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 font-medium text-center shadow-lg transform transition hover:-translate-y-1"
                  >
                    Ücretsiz Değerlendirme
                  </a>
                  <a
                    href="#"
                    className="px-8 py-3 rounded-md bg-transparent border border-cyan-600 text-white font-medium text-center hover:bg-gray-700 transition-colors"
                  >
                    Bize Ulaşın
                  </a>
                </div>
                
                <div className="mt-8 flex items-center">
                  <div className="flex -space-x-2">
                    <div className="inline-block h-10 w-10 rounded-full ring-2 ring-gray-800 bg-gray-700 flex items-center justify-center text-xs text-gray-300">T1</div>
                    <div className="inline-block h-10 w-10 rounded-full ring-2 ring-gray-800 bg-gray-700 flex items-center justify-center text-xs text-gray-300">T2</div>
                    <div className="inline-block h-10 w-10 rounded-full ring-2 ring-gray-800 bg-gray-700 flex items-center justify-center text-xs text-gray-300">T3</div>
                  </div>
                  <p className="ml-4 text-sm text-gray-300">
                    <span className="font-medium text-cyan-400">500+</span> şirket bizimle çalışıyor
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6 sm:p-10 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Bizimle İletişime Geçin</h3>
                
                <div className="mb-6 space-y-4">
                  <div className="flex items-center p-4 rounded-lg bg-gray-800 border border-gray-700">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-800 flex items-center justify-center text-cyan-200 text-xl font-bold">
                      FK
                    </div>
                    <div className="ml-4">
                      <h4 className="text-white font-medium">Fevziye Nur Kesebir</h4>
                      <p className="text-gray-400 text-sm">Yazılım Mühendisi</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 rounded-lg bg-gray-800 border border-gray-700">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-800 flex items-center justify-center text-cyan-200 text-xl font-bold">
                      NU
                    </div>
                    <div className="ml-4">
                      <h4 className="text-white font-medium">Nisanur Gökçen Usta</h4>
                      <p className="text-gray-400 text-sm">Yazılım Mühendisi</p>
                    </div>
                  </div>
                </div>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="full-name" className="sr-only">Ad Soyad</label>
                    <input
                      id="full-name"
                      name="full-name"
                      type="text"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Ad Soyad"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">E-posta</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="E-posta adresiniz"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="sr-only">Şirket</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Şirket Adı"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">Mesaj</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Nasıl yardımcı olabiliriz?"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full px-8 py-3 rounded-md text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 font-medium text-center shadow-lg"
                    >
                      Gönder
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA 
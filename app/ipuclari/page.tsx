'use client'

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function TipsPage() {
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
                <span className="block">Siber Güvenlik</span>
                <span className="block text-cyan-400">İpuçları</span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                Dijital dünyada güvende kalmanız için önemli ipuçları ve öneriler.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Password Security */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Güçlü Şifreler</h2>
                <ul className="text-gray-300 space-y-2">
                  <li>• En az 12 karakter uzunluğunda şifreler kullanın</li>
                  <li>• Büyük/küçük harf, rakam ve özel karakterler içermeli</li>
                  <li>• Her hesap için farklı şifre kullanın</li>
                  <li>• Şifrelerinizi güvenli bir şekilde saklayın</li>
                </ul>
              </div>

              {/* Two-Factor Authentication */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">İki Faktörlü Doğrulama</h2>
                <ul className="text-gray-300 space-y-2">
                  <li>• Mümkün olduğunca 2FA kullanın</li>
                  <li>• SMS yerine authenticator uygulamaları tercih edin</li>
                  <li>• Yedek kodlarınızı güvenli bir yerde saklayın</li>
                </ul>
              </div>

              {/* Software Updates */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Yazılım Güncellemeleri</h2>
                <ul className="text-gray-300 space-y-2">
                  <li>• Sistem ve uygulamalarınızı güncel tutun</li>
                  <li>• Otomatik güncellemeleri etkinleştirin</li>
                  <li>• Güvenlik yamalarını hemen uygulayın</li>
                </ul>
              </div>

              {/* Safe Browsing */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Güvenli Gezinme</h2>
                <ul className="text-gray-300 space-y-2">
                  <li>• HTTPS kullanan siteleri tercih edin</li>
                  <li>• Şüpheli bağlantılara tıklamayın</li>
                  <li>• Güvenlik yazılımı kullanın</li>
                  <li>• Tarayıcı eklentilerini sınırlı tutun</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
} 
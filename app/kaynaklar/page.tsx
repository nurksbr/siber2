'use client'

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ResourcesPage() {
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
                <span className="block">Kaynaklar ve</span>
                <span className="block text-cyan-400">Araçlar</span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                Siber güvenlik alanında kullanabileceğiniz faydalı kaynaklar ve araçlar.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Learning Resources */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Öğrenme Kaynakları</h2>
                <ul className="text-gray-300 space-y-2">
                  <li>• Online Kurslar</li>
                  <li>• E-Kitaplar</li>
                  <li>• Video Eğitimler</li>
                  <li>• Webinarlar</li>
                </ul>
              </div>

              {/* Security Tools */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Güvenlik Araçları</h2>
                <ul className="text-gray-300 space-y-2">
                  <li>• Antivirüs Yazılımları</li>
                  <li>• Güvenlik Duvarı Araçları</li>
                  <li>• Şifre Yöneticileri</li>
                  <li>• VPN Servisleri</li>
                </ul>
              </div>

              {/* Community Resources */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Topluluk Kaynakları</h2>
                <ul className="text-gray-300 space-y-2">
                  <li>• Forumlar</li>
                  <li>• Discord Sunucuları</li>
                  <li>• LinkedIn Grupları</li>
                  <li>• Konferanslar</li>
                </ul>
              </div>

              {/* News & Updates */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Haberler ve Güncellemeler</h2>
                <ul className="text-gray-300 space-y-2">
                  <li>• Güvenlik Bültenleri</li>
                  <li>• Blog Yazıları</li>
                  <li>• Podcast&apos;ler</li>
                  <li>• Araştırma Raporları</li>
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
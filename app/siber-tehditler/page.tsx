'use client'

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function CyberThreatsPage() {
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
                <span className="block">Siber Tehditler</span>
                <span className="block text-cyan-400">Güncel Tehditler</span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                Güncel siber tehditler ve saldırı türleri hakkında bilgi edinin.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Malware */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Malware</h2>
                <p className="text-gray-300">
                  Zararlı yazılımlar, sistemlerinize ve verilerinize zarar verebilecek kötü amaçlı programlardır. Virüsler, solucanlar, truva atları ve fidye yazılımları gibi çeşitli türleri vardır.
                </p>
              </div>

              {/* Phishing */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Phishing</h2>
                <p className="text-gray-300">
                  Kimlik avı saldırıları, kullanıcıları kandırarak hassas bilgilerini ele geçirmeyi amaçlayan sosyal mühendislik saldırılarıdır.
                </p>
              </div>

              {/* DDoS */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">DDoS Saldırıları</h2>
                <p className="text-gray-300">
                  Dağıtık Hizmet Reddi saldırıları, sistemleri ve ağları aşırı yükleyerek hizmetlerin kesintiye uğramasına neden olur.
                </p>
              </div>

              {/* Ransomware */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Ransomware</h2>
                <p className="text-gray-300">
                  Fidye yazılımları, verilerinizi şifreleyerek fidye talep eden kötü amaçlı yazılımlardır.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { FaUsers, FaBookOpen, FaChartLine, FaShieldAlt, FaSitemap, FaBell } from 'react-icons/fa'

export default function AdminPanelPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Sayfa yüklendiğinde oturum ve admin kontrolü
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/giris?callbackUrl=' + encodeURIComponent('/admin-panel'))
      } else if (user.role !== 'ADMIN') {
        // Kullanıcı admin değilse ana sayfaya yönlendir
        router.push('/')
      }
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user || user.role !== 'ADMIN') {
    return null // Router zaten yönlendirme yapacak
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Yönetim Paneli</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Kullanıcı Yönetimi */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-cyan-100 dark:bg-cyan-800 p-3 rounded-full">
              <FaUsers className="h-6 w-6 text-cyan-600 dark:text-cyan-300" />
            </div>
            <h2 className="ml-4 text-xl font-semibold">Kullanıcı Yönetimi</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Kullanıcıları ekleyin, düzenleyin veya yönetin. Rol atayın ve izinleri düzenleyin.
          </p>
          <button
            onClick={() => router.push('/admin-panel/kullanicilar')}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md text-sm font-medium w-full"
          >
            Kullanıcıları Yönet
          </button>
        </div>
        
        {/* Eğitim Yönetimi */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-full">
              <FaBookOpen className="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
            <h2 className="ml-4 text-xl font-semibold">Eğitim Yönetimi</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Eğitim içeriklerini ekleyin, düzenleyin. Kursları, bölümleri ve sınavları yapılandırın.
          </p>
          <button
            onClick={() => router.push('/admin-panel/egitimler')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium w-full"
          >
            Eğitimleri Yönet
          </button>
        </div>
        
        {/* İstatistikler */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
              <FaChartLine className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <h2 className="ml-4 text-xl font-semibold">İstatistikler</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Platform kullanım istatistiklerini, kullanıcı etkileşimlerini ve eğitim tamamlama oranlarını görüntüleyin.
          </p>
          <button
            onClick={() => router.push('/admin-panel/istatistikler')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium w-full"
          >
            İstatistikleri Görüntüle
          </button>
        </div>
        
        {/* Güvenlik Yönetimi */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 dark:bg-red-800 p-3 rounded-full">
              <FaShieldAlt className="h-6 w-6 text-red-600 dark:text-red-300" />
            </div>
            <h2 className="ml-4 text-xl font-semibold">Güvenlik Yönetimi</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Sistem güvenlik ayarlarını yapılandırın, log kayıtlarını inceleyin ve güvenlik önlemlerini düzenleyin.
          </p>
          <button
            onClick={() => router.push('/admin-panel/guvenlik')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium w-full"
          >
            Güvenliği Yönet
          </button>
        </div>
        
        {/* İçerik Yönetimi */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-orange-100 dark:bg-orange-800 p-3 rounded-full">
              <FaSitemap className="h-6 w-6 text-orange-600 dark:text-orange-300" />
            </div>
            <h2 className="ml-4 text-xl font-semibold">İçerik Yönetimi</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Blog yazıları, haberler ve siber güvenlik duyurularını ekleyin ve düzenleyin.
          </p>
          <button
            onClick={() => router.push('/admin-panel/icerik')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium w-full"
          >
            İçerikleri Yönet
          </button>
        </div>
        
        {/* Bildirim Yönetimi */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
              <FaBell className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <h2 className="ml-4 text-xl font-semibold">Bildirim Yönetimi</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Kullanıcılara bildirimler gönderin, bildirim şablonlarını düzenleyin ve bildirim ayarlarını yapılandırın.
          </p>
          <button
            onClick={() => router.push('/admin-panel/bildirimler')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium w-full"
          >
            Bildirimleri Yönet
          </button>
        </div>
      </div>
      
      {/* Özet İstatistikler */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Platform Özeti</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Toplam Kullanıcı</p>
            <p className="text-2xl font-bold">1,248</p>
            <p className="text-green-600 text-sm">↑ 12% geçen aya göre</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Aktif Eğitimler</p>
            <p className="text-2xl font-bold">36</p>
            <p className="text-green-600 text-sm">↑ 4 yeni eğitim</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Tamamlanan Eğitimler</p>
            <p className="text-2xl font-bold">8,562</p>
            <p className="text-green-600 text-sm">↑ 8% geçen aya göre</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Sertifika Alan Kullanıcılar</p>
            <p className="text-2xl font-bold">756</p>
            <p className="text-green-600 text-sm">↑ 15% geçen aya göre</p>
          </div>
        </div>
      </div>
    </div>
  )
} 
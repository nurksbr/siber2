'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import { FaPalette, FaSun, FaMoon, FaDesktop, FaCheck, FaSave } from 'react-icons/fa'

export default function TemaAyarlari() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [selectedTheme, setSelectedTheme] = useState('SYSTEM')
  const [message, setMessage] = useState({ text: '', type: '' })

  // Tema seçenekleri
  const themeOptions = [
    { id: 'LIGHT', name: 'Açık Tema', icon: <FaSun className="text-yellow-400" />, desc: 'Açık renkli, gözü yormayan tema' },
    { id: 'DARK', name: 'Koyu Tema', icon: <FaMoon className="text-gray-300" />, desc: 'Koyu renkli, gece kullanımına uygun tema' },
    { id: 'SYSTEM', name: 'Sistem Teması', icon: <FaDesktop className="text-cyan-400" />, desc: 'Cihazınızın sistem ayarlarını kullanır' }
  ]

  useEffect(() => {
    if (!user) {
      router.push('/giris')
      return
    }

    // Tema ayarlarını API'den al
    const fetchThemeSettings = async () => {
      try {
        const response = await fetch('/api/settings')
        if (response.ok) {
          const data = await response.json()
          if (data.settings?.theme) {
            setSelectedTheme(data.settings.theme)
          }
        }
      } catch (error) {
        console.error('Tema ayarları alınamadı:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchThemeSettings()
  }, [user, router])

  // Tema seçimi
  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId)
  }

  // Tema ayarlarını kaydet
  const handleSaveTheme = async () => {
    setSaving(true)
    setMessage({ text: '', type: '' })

    try {
      const response = await fetch('/api/settings/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          theme: selectedTheme
        })
      })

      if (response.ok) {
        setMessage({ text: 'Tema ayarlarınız başarıyla güncellendi.', type: 'success' })
        
        // Tema değişikliğini sayfaya uygula
        document.documentElement.setAttribute('data-theme', selectedTheme.toLowerCase())
      } else {
        const data = await response.json()
        setMessage({ text: data.error || 'Tema güncellenirken bir hata oluştu.', type: 'error' })
      }
    } catch (error) {
      console.error('Tema güncelleme hatası:', error)
      setMessage({ text: 'Tema güncellenirken bir hata oluştu.', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Tema Ayarları</h1>
          <div className="animate-pulse bg-gray-800 p-4 rounded-md h-64"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <FaPalette className="text-cyan-500 text-2xl mr-2" />
          <h1 className="text-2xl font-bold">Tema Ayarları</h1>
        </div>

        {message.text && (
          <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-800/30 text-green-300' : 'bg-red-800/30 text-red-300'}`}>
            {message.text}
          </div>
        )}

        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Tema Seçimi</h2>
          <p className="text-gray-400 mb-6">Site temasını tercihlerinize göre ayarlayabilirsiniz.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {themeOptions.map((theme) => (
              <div 
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                className={`flex flex-col p-4 rounded-lg cursor-pointer transition-all
                  ${selectedTheme === theme.id 
                    ? 'bg-cyan-900/30 border-2 border-cyan-500 shadow-md shadow-cyan-500/20' 
                    : 'bg-gray-700/50 border border-gray-600 hover:bg-gray-700'}
                `}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <div className="mr-3">{theme.icon}</div>
                    <h3 className="font-medium text-gray-200">{theme.name}</h3>
                  </div>
                  {selectedTheme === theme.id && (
                    <div className="bg-cyan-500 rounded-full p-1">
                      <FaCheck className="text-gray-900 text-xs" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-400">{theme.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveTheme}
              disabled={saving}
              className={`flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md transition-colors ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <FaSave />
              <span>{saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</span>
            </button>
          </div>
        </div>

        <div className="mt-8 bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Tema Önizlemesi</h2>
          <p className="text-gray-400 mb-6">Seçtiğiniz tema aşağıdaki gibi görünecektir:</p>
          
          <div className={`rounded-lg p-4 ${
            selectedTheme === 'LIGHT' 
            ? 'bg-gray-100 text-gray-900 border border-gray-300' 
            : selectedTheme === 'DARK' 
              ? 'bg-gray-900 text-white border border-gray-700' 
              : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white border border-gray-700'}
          `}>
            <h3 className={`text-lg font-semibold ${selectedTheme === 'LIGHT' ? 'text-gray-900' : 'text-white'}`}>
              {selectedTheme === 'LIGHT' ? 'Açık Tema' : selectedTheme === 'DARK' ? 'Koyu Tema' : 'Sistem Teması'}
            </h3>
            <p className={`${selectedTheme === 'LIGHT' ? 'text-gray-700' : 'text-gray-300'}`}>
              Bu şekilde görünecek içerik örneği. Bu yazı seçtiğiniz temaya göre renk alır.
            </p>
            <div className="flex items-center mt-4">
              <button 
                className={`${
                  selectedTheme === 'LIGHT' 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                  : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                } px-4 py-2 rounded-md mr-3`}
              >
                Örnek Buton
              </button>
              <button 
                className={`${
                  selectedTheme === 'LIGHT' 
                  ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100' 
                  : 'bg-gray-700 border border-gray-600 text-gray-200 hover:bg-gray-600'
                } px-4 py-2 rounded-md`}
              >
                İkincil Buton
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
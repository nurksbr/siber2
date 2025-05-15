'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import { FaUserEdit, FaSave, FaUserCircle } from 'react-icons/fa'

export default function ProfilAyarlari() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: ''
  })
  const [message, setMessage] = useState({ text: '', type: '' })

  useEffect(() => {
    if (!user) {
      router.push('/giris')
      return
    }

    // Kullanıcı bilgilerini form verilerine yükle
    setFormData({
      name: user.name || '',
      email: user.email || '',
      bio: ''
    })
    
    // Profil bilgilerini API'den al
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/settings')
        if (response.ok) {
          const data = await response.json()
          
          // Bio bilgisi varsa ekle
          if (data.settings?.bio) {
            setFormData(prev => ({
              ...prev,
              bio: data.settings.bio
            }))
          }
        }
      } catch (error) {
        console.error('Profil bilgileri alınamadı:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [user, router])

  // Form değişikliklerini izle
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Formu kaydet
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ text: '', type: '' })

    try {
      const response = await fetch('/api/settings/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          bio: formData.bio
        })
      })

      if (response.ok) {
        setMessage({ text: 'Profil bilgileriniz başarıyla güncellendi.', type: 'success' })
      } else {
        const data = await response.json()
        setMessage({ text: data.error || 'Profil güncellenirken bir hata oluştu.', type: 'error' })
      }
    } catch (error) {
      console.error('Profil güncelleme hatası:', error)
      setMessage({ text: 'Profil güncellenirken bir hata oluştu.', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Profil Ayarları</h1>
          <div className="animate-pulse bg-gray-800 p-4 rounded-md h-64"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <FaUserEdit className="text-cyan-500 text-2xl mr-2" />
          <h1 className="text-2xl font-bold">Profil Ayarları</h1>
        </div>

        {message.text && (
          <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-800/30 text-green-300' : 'bg-red-800/30 text-red-300'}`}>
            {message.text}
          </div>
        )}

        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-xl">
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
              <FaUserCircle className="text-gray-300 text-6xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-cyan-400">{formData.name}</h2>
              <p className="text-gray-400">{formData.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Ad Soyad</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-posta Adresi</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">E-posta adresinizi değiştirmek için yönetici ile iletişime geçin.</p>
            </div>

            <div className="mb-6">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">Hakkımda</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Kendiniz hakkında kısa bir bilgi ekleyin..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className={`flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md transition-colors ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <FaSave />
                <span>{saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 
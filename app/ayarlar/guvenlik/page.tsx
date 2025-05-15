'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { FaLock, FaShieldAlt, FaKey, FaToggleOn, FaToggleOff, FaSave, FaExclamationTriangle } from 'react-icons/fa';

export default function GuvenlikAyarlari() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [settings, setSettings] = useState({
    twoFactorEnabled: false,
    securityLevel: 'BEGINNER'
  });
  
  const [message, setMessage] = useState({ text: '', type: '' });

  // Güvenlik seviyesi seçenekleri
  const securityLevels = [
    { id: 'BEGINNER', name: 'Başlangıç', desc: 'Temel güvenlik önlemleri' },
    { id: 'INTERMEDIATE', name: 'Orta', desc: 'Daha güçlü güvenlik için gerekli tedbirler' },
    { id: 'ADVANCED', name: 'Gelişmiş', desc: 'En yüksek güvenlik düzeyi' }
  ];

  useEffect(() => {
    if (!user) {
      router.push('/giris');
      return;
    }

    // Güvenlik ayarlarını API'den al
    const fetchSecuritySettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          
          setSettings({
            twoFactorEnabled: data.twoFactorEnabled || false,
            securityLevel: data.settings?.securityLevel || 'BEGINNER'
          });
        }
      } catch (error) {
        console.error('Güvenlik ayarları alınamadı:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSecuritySettings();
  }, [user, router]);

  // İki faktörlü doğrulama durumunu değiştir
  const handleToggleTwoFactor = () => {
    setSettings(prev => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled
    }));
  };

  // Güvenlik seviyesi değiştir
  const handleSecurityLevelChange = (level: string) => {
    setSettings(prev => ({
      ...prev,
      securityLevel: level
    }));
  };

  // Güvenlik ayarlarını kaydet
  const handleSaveSettings = async () => {
    setSaving(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('/api/settings/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          twoFactorEnabled: settings.twoFactorEnabled,
          securityLevel: settings.securityLevel
        })
      });

      if (response.ok) {
        setMessage({ text: 'Güvenlik ayarlarınız başarıyla güncellendi.', type: 'success' });
      } else {
        const data = await response.json();
        setMessage({ text: data.error || 'Güvenlik ayarları güncellenirken bir hata oluştu.', type: 'error' });
      }
    } catch (error) {
      console.error('Güvenlik ayarları güncelleme hatası:', error);
      setMessage({ text: 'Güvenlik ayarları güncellenirken bir hata oluştu.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Güvenlik Ayarları</h1>
          <div className="animate-pulse bg-gray-800 p-4 rounded-md h-64"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <FaLock className="text-cyan-500 text-2xl mr-2" />
          <h1 className="text-2xl font-bold">Güvenlik Ayarları</h1>
        </div>

        {message.text && (
          <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-800/30 text-green-300' : 'bg-red-800/30 text-red-300'}`}>
            {message.text}
          </div>
        )}

        {/* İki Faktörlü Doğrulama */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-xl mb-6">
          <div className="flex items-start mb-4">
            <FaKey className="text-yellow-500 text-xl mt-1 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-200">İki Faktörlü Kimlik Doğrulama</h2>
              <p className="text-gray-400 text-sm mt-1">Hesabınızı korumak için ek bir güvenlik katmanı ekleyin.</p>
            </div>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-md mb-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">İki faktörlü doğrulama</span>
              <button 
                onClick={handleToggleTwoFactor}
                className="text-2xl focus:outline-none"
                aria-label="İki faktörlü doğrulamayı aç/kapat"
              >
                {settings.twoFactorEnabled ? (
                  <FaToggleOn className="text-cyan-500" />
                ) : (
                  <FaToggleOff className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {settings.twoFactorEnabled && (
            <div className="bg-cyan-900/20 border border-cyan-800 p-4 rounded-md mb-4">
              <p className="text-cyan-300 text-sm">
                İki faktörlü doğrulama aktif. Giriş yaparken ek doğrulama kodu istenecektir.
              </p>
            </div>
          )}

          {!settings.twoFactorEnabled && (
            <div className="bg-yellow-900/20 border border-yellow-800 p-4 rounded-md">
              <div className="flex items-start">
                <FaExclamationTriangle className="text-yellow-500 mt-1 mr-2" />
                <p className="text-yellow-300 text-sm">
                  İki faktörlü doğrulama devre dışı. Hesap güvenliğinizi artırmak için etkinleştirmenizi öneririz.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Güvenlik Seviyesi */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-xl mb-6">
          <div className="flex items-start mb-4">
            <FaShieldAlt className="text-green-500 text-xl mt-1 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-200">Güvenlik Seviyesi</h2>
              <p className="text-gray-400 text-sm mt-1">Hesabınız için güvenlik seviyesini ayarlayın.</p>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            {securityLevels.map((level) => (
              <div 
                key={level.id}
                className={`flex items-center p-3 rounded-md cursor-pointer transition-all
                  ${settings.securityLevel === level.id 
                    ? 'bg-cyan-900/30 border border-cyan-700' 
                    : 'bg-gray-700/50 border border-gray-600 hover:bg-gray-700'}
                `}
                onClick={() => handleSecurityLevelChange(level.id)}
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-200">{level.name}</h3>
                  <p className="text-sm text-gray-400">{level.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border ${
                  settings.securityLevel === level.id 
                    ? 'border-cyan-500 bg-cyan-500' 
                    : 'border-gray-500 bg-transparent'
                } flex items-center justify-center`}>
                  {settings.securityLevel === level.id && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-700/50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Güvenlik seviyesi açıklaması:</h3>
            <p className="text-sm text-gray-400">
              {settings.securityLevel === 'BEGINNER' && 'Temel güvenlik özellikleri aktif. Giriş ve şifre değişiklikleri için e-posta bildirimleri alırsınız.'}
              {settings.securityLevel === 'INTERMEDIATE' && 'Orta düzey güvenlik önlemleri aktif. Şüpheli giriş denemeleri engellenir ve bildirim alırsınız.'}
              {settings.securityLevel === 'ADVANCED' && 'En üst düzey güvenlik önlemleri aktif. Tüm hesap aktiviteleri izlenir ve şüpheli durumlar anında bildirilir.'}
            </p>
          </div>
        </div>

        {/* Kaydet Butonu */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className={`flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md transition-colors ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <FaSave />
            <span>{saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</span>
          </button>
        </div>
      </div>
    </div>
  );
} 
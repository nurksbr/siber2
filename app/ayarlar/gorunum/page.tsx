'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { FaDesktop, FaFont, FaLanguage, FaCheck, FaSave, FaEye } from 'react-icons/fa';

interface Settings {
  preferredLanguage: string;
  contentPreferences: string[];
}

export default function GorunumAyarlari() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [settings, setSettings] = useState<Settings>({
    preferredLanguage: 'tr',
    contentPreferences: []
  });
  
  const [message, setMessage] = useState({ text: '', type: '' });

  // Dil seçenekleri
  const languageOptions = [
    { id: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { id: 'en', name: 'İngilizce', flag: '🇬🇧' },
    { id: 'de', name: 'Almanca', flag: '🇩🇪' },
    { id: 'fr', name: 'Fransızca', flag: '🇫🇷' }
  ];

  // İçerik tercihleri
  const contentOptions = [
    { id: 'cyber_news', name: 'Siber Güvenlik Haberleri', description: 'Güncel siber güvenlik haberleri' },
    { id: 'tutorials', name: 'Eğitimler', description: 'Güvenlik eğitimleri ve rehberler' },
    { id: 'threats', name: 'Tehdit Bilgileri', description: 'Güncel siber tehdit bilgileri' },
    { id: 'tools', name: 'Güvenlik Araçları', description: 'Güvenlik araçları hakkında bilgiler' },
    { id: 'privacy', name: 'Gizlilik İpuçları', description: 'Kişisel gizliliğinizi koruma ipuçları' }
  ];

  useEffect(() => {
    if (!user) {
      router.push('/giris');
      return;
    }

    // Görünüm ayarlarını API'den al
    const fetchDisplaySettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          
          setSettings({
            preferredLanguage: data.settings?.preferredLanguage || 'tr',
            contentPreferences: data.settings?.contentPreferences || []
          });
        }
      } catch (error) {
        console.error('Görünüm ayarları alınamadı:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisplaySettings();
  }, [user, router]);

  // Dil seçimi değiştir
  const handleLanguageChange = (lang: string) => {
    setSettings(prev => ({
      ...prev,
      preferredLanguage: lang
    }));
  };

  // İçerik tercihi değiştir
  const handleContentPreferenceToggle = (prefId: string) => {
    setSettings(prev => {
      // Eğer tercih zaten varsa kaldır, yoksa ekle
      const newPreferences = prev.contentPreferences.includes(prefId)
        ? prev.contentPreferences.filter(id => id !== prefId)
        : [...prev.contentPreferences, prefId];
      
      return {
        ...prev,
        contentPreferences: newPreferences
      };
    });
  };

  // Ayarları kaydet
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
          preferredLanguage: settings.preferredLanguage,
          contentPreferences: settings.contentPreferences
        })
      });

      if (response.ok) {
        setMessage({ text: 'Görünüm ayarlarınız başarıyla güncellendi.', type: 'success' });
      } else {
        const data = await response.json();
        setMessage({ text: data.error || 'Görünüm ayarları güncellenirken bir hata oluştu.', type: 'error' });
      }
    } catch (error) {
      console.error('Görünüm ayarları güncelleme hatası:', error);
      setMessage({ text: 'Görünüm ayarları güncellenirken bir hata oluştu.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Görünüm Ayarları</h1>
          <div className="animate-pulse bg-gray-800 p-4 rounded-md h-64"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <FaDesktop className="text-cyan-500 text-2xl mr-2" />
          <h1 className="text-2xl font-bold">Görünüm Ayarları</h1>
        </div>

        {message.text && (
          <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-800/30 text-green-300' : 'bg-red-800/30 text-red-300'}`}>
            {message.text}
          </div>
        )}

        {/* Dil Ayarları */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-xl mb-6">
          <div className="flex items-start mb-4">
            <FaLanguage className="text-blue-500 text-xl mt-1 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-200">Dil Ayarları</h2>
              <p className="text-gray-400 text-sm mt-1">Site içeriğinin görüntüleneceği dili seçin.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {languageOptions.map((lang) => (
              <div 
                key={lang.id}
                onClick={() => handleLanguageChange(lang.id)}
                className={`flex items-center p-3 rounded-md cursor-pointer transition-all
                  ${settings.preferredLanguage === lang.id 
                    ? 'bg-cyan-900/30 border border-cyan-700' 
                    : 'bg-gray-700/50 border border-gray-600 hover:bg-gray-700'}
                `}
              >
                <div className="mr-3 text-xl">{lang.flag}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-200">{lang.name}</p>
                </div>
                {settings.preferredLanguage === lang.id && (
                  <FaCheck className="text-cyan-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* İçerik Tercihleri */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-xl mb-6">
          <div className="flex items-start mb-4">
            <FaEye className="text-purple-500 text-xl mt-1 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-200">İçerik Tercihleri</h2>
              <p className="text-gray-400 text-sm mt-1">Görmek istediğiniz içerik türlerini seçin. Ana sayfanızı kişiselleştirmek için kullanılır.</p>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            {contentOptions.map((option) => (
              <div 
                key={option.id}
                onClick={() => handleContentPreferenceToggle(option.id)}
                className={`flex items-center p-3 rounded-md cursor-pointer transition-all
                  ${settings.contentPreferences.includes(option.id) 
                    ? 'bg-cyan-900/30 border border-cyan-700' 
                    : 'bg-gray-700/50 border border-gray-600 hover:bg-gray-700'}
                `}
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-200">{option.name}</h3>
                  <p className="text-sm text-gray-400">{option.description}</p>
                </div>
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  settings.contentPreferences.includes(option.id) 
                    ? 'border-cyan-500 bg-cyan-500/20' 
                    : 'border-gray-500'
                }`}>
                  {settings.contentPreferences.includes(option.id) && (
                    <FaCheck className="text-cyan-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yazı Tipi ve Boyutu */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-xl mb-6">
          <div className="flex items-start mb-4">
            <FaFont className="text-green-500 text-xl mt-1 mr-3" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-200">Yazı Tipi ve Boyutu</h2>
              <p className="text-gray-400 text-sm mt-1">Yazı tipi ve boyutu ayarları yakında hizmetinizde olacak.</p>
            </div>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-md">
            <p className="text-gray-300 text-sm italic">
              Bu özellik yakında kullanıma sunulacak. Site içeriğinin yazı tipi ve boyutu tercihlerinizi belirleyebileceksiniz.
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
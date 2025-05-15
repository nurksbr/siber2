'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { FaUserEdit, FaPalette, FaLock, FaDesktop, FaChevronRight } from 'react-icons/fa';

export default function AyarlarPage() {
  const { user, loading, checkAuth } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAutoLoginAttempt, setIsAutoLoginAttempt] = useState(false);

  // Ayar kategorileri
  const settingsCategories = [
    {
      id: 'profil',
      title: 'Profil Ayarları',
      description: 'Kişisel bilgilerinizi ve profil detaylarınızı düzenleyin.',
      icon: <FaUserEdit className="text-3xl text-cyan-500" />,
      path: '/ayarlar/profil',
      color: 'from-cyan-500/20 to-blue-500/10'
    },
    {
      id: 'tema',
      title: 'Tema Ayarları',
      description: 'Uygulama temasını ve görünümünü özelleştirin.',
      icon: <FaPalette className="text-3xl text-purple-500" />,
      path: '/ayarlar/tema',
      color: 'from-purple-500/20 to-pink-500/10'
    },
    {
      id: 'guvenlik',
      title: 'Güvenlik Ayarları',
      description: 'Şifrenizi ve güvenlik tercihlerinizi yönetin.',
      icon: <FaLock className="text-3xl text-green-500" />,
      path: '/ayarlar/guvenlik',
      color: 'from-green-500/20 to-emerald-500/10'
    },
    {
      id: 'gorunum',
      title: 'Görünüm Ayarları',
      description: 'Dil, yazı tipi ve diğer görünüm tercihlerinizi ayarlayın.',
      icon: <FaDesktop className="text-3xl text-amber-500" />,
      path: '/ayarlar/gorunum',
      color: 'from-amber-500/20 to-orange-500/10'
    }
  ];

  // LocalStorage'dan kullanıcı bilgisini al
  const getUserFromLocalStorage = () => {
    if (typeof window === 'undefined') return null;
    
    try {
      const userStr = localStorage.getItem('cyberly_user');
      if (!userStr) return null;
      
      const userData = JSON.parse(userStr);
      return userData && userData.id ? userData : null;
    } catch (error) {
      console.error('LocalStorage okuma hatası:', error);
      return null;
    }
  };

  // Cookie kontrolü
  const hasAuthCookie = () => {
    if (typeof window === 'undefined') return false;
    return document.cookie.split('; ').some(row => row.startsWith('auth_token='));
  };

  // Otomatik giriş denemesi
  const attemptAutoLogin = async (localUser: any) => {
    console.log('Otomatik giriş deneniyor...');
    setIsAutoLoginAttempt(true);
    
    try {
      // Session yenileme denemesi
      const response = await fetch('/api/auth/refresh-session', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          userId: localUser.id,
          email: localUser.email,
          name: localUser.name,
          role: localUser.role
        }),
        credentials: 'include'
      });
      
      if (response.ok) {
        console.log('Session başarıyla yenilendi, sayfa yenileniyor');
        window.location.reload();
        return true;
      }
      
      // Session yenileme başarısız olursa, login denemesi yap
      console.log('Session yenileme başarısız, giriş denemesi yapılıyor');
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: localUser.email,
          password: 'password' // Test şifresi
        }),
        credentials: 'include'
      });
      
      if (loginResponse.ok) {
        console.log('Giriş başarılı, sayfa yenileniyor');
        window.location.reload();
        return true;
      }
      
      console.log('Otomatik giriş başarısız');
      return false;
    } catch (error) {
      console.error('Otomatik giriş hatası:', error);
      return false;
    } finally {
      setIsAutoLoginAttempt(false);
    }
  };

  // Sayfa yüklendiğinde oturum kontrolü
  useEffect(() => {
    // Oturum kontrolü fonksiyonu
    const verifySession = async () => {
      // Kullanıcı zaten varsa ve yükleme tamamlandıysa kontrol etmeye gerek yok
      if (user && !loading) {
        console.log('Kullanıcı zaten giriş yapmış:', user.email);
        return;
      }
      
      // Yükleme devam ediyorsa bekleyelim
      if (loading) {
        console.log('Oturum durumu kontrol ediliyor, bekleniyor...');
        return;
      }
      
      // Eğer hem localStorage'da kullanıcı var hem de cookie varsa sayfa yenileme yap
      const localUser = getUserFromLocalStorage();
      const hasCookie = hasAuthCookie();
      
      if (localUser && hasCookie) {
        console.log('LocalStorage ve cookie mevcut, sayfa yenileniyor');
        // Sayfayı yenile - middleware oturumu doğrulayacak
        if (!isChecking) {
          setIsChecking(true);
          window.location.reload();
          return;
        }
      }
      
      // LocalStorage'da kullanıcı var ama cookie yoksa session yenileme
      if (localUser && !hasCookie && !isAutoLoginAttempt) {
        console.log('LocalStorage kullanıcı var ama cookie yok, otomatik giriş deneniyor');
        const success = await attemptAutoLogin(localUser);
        if (success) return;
      }
      
      setIsChecking(true);
      setError(null);
      
      try {
        console.log('Oturum kontrolü yapılıyor...');
        const isAuthenticated = await checkAuth();
        
        if (!isAuthenticated) {
          console.log('Kullanıcı giriş yapmamış, yönlendiriliyor');
          // Giriş sayfasına yönlendir
          router.push('/giris?callbackUrl=/ayarlar');
        } else {
          console.log('Oturum kontrolü başarılı');
        }
      } catch (error) {
        console.error('Oturum kontrolü hatası:', error);
        setError('Oturum kontrolü sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      } finally {
        setIsChecking(false);
      }
    };

    verifySession();
  }, [user, loading, router, checkAuth, isAutoLoginAttempt, isChecking]);

  // Ayar kategorisine yönlendirme
  const navigateToSetting = (path: string) => {
    console.log(`Yönlendiriliyor: ${path}`);
    router.push(path);
  };

  // Yükleniyor durumu
  if (loading || isChecking || isAutoLoginAttempt) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-white">{isAutoLoginAttempt ? 'Otomatik Giriş Yapılıyor...' : 'Oturum Kontrol Ediliyor...'}</p>
        </div>
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <div className="text-center p-6 bg-gray-800 rounded-lg border border-red-500/50 max-w-md">
          <div className="text-red-500 text-3xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-4">Oturum Hatası</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded"
          >
            Yeniden Dene
          </button>
        </div>
      </div>
    );
  }
  
  // Kullanıcı giriş yapmadıysa LocalStorage'dan kontrol et
  if (!user) {
    const localUser = getUserFromLocalStorage();
    if (localUser && !isChecking && !isAutoLoginAttempt) {
      // LocalStorage'da kullanıcı var ama context'te yok - otomatik giriş dene
      console.log('Context\'te kullanıcı yok ama localStorage\'da var, otomatik giriş deneniyor');
      attemptAutoLogin(localUser);
      
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
            <p className="text-white">Oturum Yenileniyor...</p>
          </div>
        </div>
      );
    }
    
    // LocalStorage'da da kullanıcı yoksa, yönlendirme yap
    console.log('Kullanıcı bilgisi bulunamadı, giriş sayfasına yönlendiriliyor');
    router.push('/giris?callbackUrl=/ayarlar');
    return null;
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Ayarlar</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsCategories.map((category) => (
            <div 
              key={category.id}
              onClick={() => navigateToSetting(category.path)}
              className={`bg-gradient-to-br ${category.color} bg-gray-800/50 rounded-xl border border-gray-700 p-6 cursor-pointer transition-all hover:shadow-lg hover:shadow-cyan-500/10 hover:border-gray-600 hover:scale-[1.01]`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">{category.icon}</div>
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">{category.title}</h2>
                    <p className="text-gray-300 text-sm">{category.description}</p>
                  </div>
                </div>
                <div className="ml-4 mt-1 text-gray-400">
                  <FaChevronRight />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Kullanıcı Özeti Kartı */}
        <div className="mt-8 bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4">Kullanıcı Bilgileri</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/80 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">E-posta</div>
              <div className="text-base text-white">{user.email}</div>
            </div>
            
            <div className="bg-gray-800/80 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Kullanıcı Adı</div>
              <div className="text-base text-white">{user.name || 'Ayarlanmamış'}</div>
            </div>
            
            <div className="bg-gray-800/80 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Hesap Türü</div>
              <div className="flex items-center">
                <span className="text-base text-white">{user.role === 'ADMIN' ? 'Yönetici' : 'Kullanıcı'}</span>
                {user.role === 'ADMIN' && (
                  <span className="ml-2 px-2 py-0.5 bg-cyan-900 text-cyan-200 text-xs rounded-md">
                    Admin
                  </span>
                )}
              </div>
            </div>
            
            <div className="bg-gray-800/80 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Hesap Durumu</div>
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                <span className="text-base text-white">Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
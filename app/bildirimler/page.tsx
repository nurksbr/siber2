'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

// Bildirim tipi
interface Notification {
  id: number;
  type: 'security' | 'info' | 'update' | string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}

export default function BildirimlerPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // Örnek bildirim verileri
  const [bildirimler, setBildirimler] = useState<Notification[]>([
    { 
      id: 1, 
      type: 'security', 
      title: 'Güvenlik Uyarısı', 
      message: 'Hesabınıza farklı bir lokasyondan giriş yapıldı. Bu siz değilseniz, lütfen şifrenizi değiştirin.', 
      date: '2023-12-15T08:30:00', 
      isRead: false 
    },
    { 
      id: 2, 
      type: 'info', 
      title: 'Eğitim Hatırlatıcısı', 
      message: 'Web Güvenliği Eğitiminizi tamamlamayı unutmayın. Tahmini süre: 45 dakika', 
      date: '2023-12-14T14:15:00', 
      isRead: true 
    },
    { 
      id: 3, 
      type: 'update', 
      title: 'Sistem Güncellemesi', 
      message: 'Platformumuz yeni özelliklerle güncellendi. Keşfetmek için tıklayın.', 
      date: '2023-12-12T16:45:00', 
      isRead: true 
    },
    { 
      id: 4, 
      type: 'security', 
      title: 'İki Faktörlü Doğrulama', 
      message: 'Hesabınızı daha güvenli hale getirmek için iki faktörlü kimlik doğrulamayı etkinleştirin.', 
      date: '2023-12-10T11:20:00', 
      isRead: false 
    },
    { 
      id: 5, 
      type: 'info', 
      title: 'Yeni Blog Yazısı', 
      message: 'Siber güvenlikte güncel trendler hakkında yeni bir blog yazısı yayınlandı.', 
      date: '2023-12-08T09:30:00', 
      isRead: true 
    }
  ]);

  // Sayfa yüklendiğinde oturum kontrolü
  useEffect(() => {
    if (!loading && !user) {
      router.push('/giris?callbackUrl=' + encodeURIComponent('/bildirimler'));
    }
  }, [user, loading, router]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const markAsRead = (id: number): void => {
    setBildirimler(prevBildirimler => 
      prevBildirimler.map(bildirim => 
        bildirim.id === id ? { ...bildirim, isRead: true } : bildirim
      )
    );
  };

  const markAllAsRead = (): void => {
    setBildirimler(prevBildirimler => 
      prevBildirimler.map(bildirim => ({ ...bildirim, isRead: true }))
    );
  };

  const deleteNotification = (id: number): void => {
    setBildirimler(prevBildirimler => 
      prevBildirimler.filter(bildirim => bildirim.id !== id)
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Router zaten yönlendirme yapacak
  }

  // Bildirim tiplerine göre simge ve renk belirleme
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'security':
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-800/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 dark:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'update':
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-800/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bildirimler</h1>
        <button 
          onClick={markAllAsRead}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Tümünü Okundu İşaretle
        </button>
      </div>
      
      {bildirimler.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <p className="text-lg text-gray-600 dark:text-gray-300">Henüz bildiriminiz bulunmuyor</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bildirimler.map((bildirim) => (
            <div 
              key={bildirim.id} 
              className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex ${
                bildirim.isRead ? 'border-l-4 border-transparent' : 'border-l-4 border-cyan-500'
              }`}
            >
              <div className="mr-4">
                {getNotificationIcon(bildirim.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h2 className={`text-lg font-medium ${bildirim.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-black dark:text-white font-semibold'}`}>
                    {bildirim.title}
                  </h2>
                  <div className="flex space-x-2">
                    {!bildirim.isRead && (
                      <button 
                        onClick={() => markAsRead(bildirim.id)}
                        className="text-cyan-600 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300"
                        title="Okundu İşaretle"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    )}
                    <button 
                      onClick={() => deleteNotification(bildirim.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      title="Bildirimi Sil"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className={`mt-1 ${bildirim.isRead ? 'text-gray-600 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                  {bildirim.message}
                </p>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                  {formatDate(bildirim.date)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 
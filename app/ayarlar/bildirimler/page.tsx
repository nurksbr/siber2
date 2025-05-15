'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function BildirimAyarlariPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Bildirim tercihleri
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [pageInfo, setPageInfo] = useState<string | null>('Bildirim ayarlarınızı burada yönetebilirsiniz.');

  // Sayfa yüklendiğinde bilgi mesajını 5 saniye sonra kaldır
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageInfo(null);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // Kullanıcı oturum kontrolü
  useEffect(() => {
    if (!loading && !user) {
      try {
        console.log('Kullanıcı oturumu yok, giriş sayfasına yönlendiriliyor...');
        const callbackUrl = encodeURIComponent('/ayarlar/bildirimler');
        
        // setTimeout ile küçük bir gecikme ekleyelim
        setTimeout(() => {
          router.push('/giris?callbackUrl=' + callbackUrl);
        }, 100);
      } catch (error) {
        console.error('Yönlendirme hatası:', error);
        // Hata durumunda doğrudan window.location kullan
        window.location.href = '/giris?callbackUrl=' + encodeURIComponent('/ayarlar/bildirimler');
      }
    }
  }, [user, loading, router]);

  // Kullanıcı bildirim ayarlarını getir
  useEffect(() => {
    if (user) {
      fetchNotificationSettings();
    }
  }, [user]);

  // Bildirim ayarlarını getir
  const fetchNotificationSettings = async () => {
    try {
      const response = await fetch('/api/settings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Bildirim ayarları getirilemedi');
      }

      const data = await response.json();
      
      // Önce data ve settings varlığını kontrol et
      if (!data || !data.settings) {
        console.warn('Ayarlar verileri bulunamadı, varsayılan değerler kullanılıyor');
        // Varsayılan değerleri kullan
        setEmailNotifications(true);
        setPushNotifications(true);
        setSecurityAlerts(true);
        setMarketingEmails(false);
        setCourseUpdates(true);
        return;
      }
      
      const notifications = data.settings.notifications || {};
      
      // Bildirim ayarlarını güncelle (değer yoksa varsayılan değerleri kullan)
      setEmailNotifications(notifications.emailNotifications !== undefined ? notifications.emailNotifications : true);
      setPushNotifications(notifications.pushNotifications !== undefined ? notifications.pushNotifications : true);
      setSecurityAlerts(notifications.securityAlerts !== undefined ? notifications.securityAlerts : true);
      setMarketingEmails(notifications.marketingEmails !== undefined ? notifications.marketingEmails : false);
      setCourseUpdates(notifications.courseUpdates !== undefined ? notifications.courseUpdates : true);
    } catch (error) {
      console.error('Bildirim ayarları yüklenirken hata:', error);
      
      // Hataya rağmen UI göstermek için varsayılan değerleri ayarla
      setEmailNotifications(true);
      setPushNotifications(true);
      setSecurityAlerts(true);
      setMarketingEmails(false);
      setCourseUpdates(true);
      
      setSaveMessage({
        type: 'error',
        text: 'Bildirim ayarları yüklenemedi, varsayılan değerler gösteriliyor.'
      });
      
      // 3 saniye sonra mesajı kaldır
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  // Bildirim ayarlarını kaydet
  const saveNotificationSettings = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/settings/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notificationPreferences: {
            email: emailNotifications,
            push: pushNotifications,
            security: securityAlerts,
            marketing: marketingEmails,
            courses: courseUpdates,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Bildirim ayarları güncellenemedi');
      }

      setSaveMessage({
        type: 'success',
        text: 'Bildirim ayarlarınız başarıyla güncellendi.'
      });
    } catch (error) {
      console.error('Bildirim ayarları kaydedilirken hata:', error);
      setSaveMessage({
        type: 'error',
        text: 'Bildirim ayarlarınız güncellenirken bir hata oluştu.'
      });
    } finally {
      setIsSaving(false);
      
      // 3 saniye sonra mesajı kaldır
      setTimeout(() => setSaveMessage(null), 3000);
    }
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link 
          href="/ayarlar"
          className="text-cyan-500 hover:text-cyan-700 dark:hover:text-cyan-400 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Ayarlara Geri Dön
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Bildirim Ayarları</h1>
      
      {pageInfo && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg border border-blue-200 dark:border-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
          </svg>
          {pageInfo}
        </div>
      )}
      
      {saveMessage && (
        <div className={`mb-4 p-3 rounded ${saveMessage.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-200'}`}>
          {saveMessage.text}
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          Bildirim Kanalları
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Hangi bildirim kanallarından iletişim kurmamızı istediğinizi seçin.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="email-notifications"
                name="email-notifications"
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                autoComplete="off"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="email-notifications" className="font-medium text-gray-700 dark:text-gray-300">
                E-posta Bildirimleri
              </label>
              <p className="text-gray-500 dark:text-gray-400">
                Önemli güncellemeler ve etkinlikler hakkında e-posta bildirimleri alın.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="push-notifications"
                name="push-notifications"
                type="checkbox"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                autoComplete="off"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="push-notifications" className="font-medium text-gray-700 dark:text-gray-300">
                Anlık Bildirimler (Tarayıcı)
              </label>
              <p className="text-gray-500 dark:text-gray-400">
                Tarayıcı üzerinden anlık bildirimler alın. (Henüz Beta aşamasında)
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Bildirim Türleri
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Hangi tür bildirimleri almak istediğinizi özelleştirin.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="security-alerts"
                name="security-alerts"
                type="checkbox"
                checked={securityAlerts}
                onChange={(e) => setSecurityAlerts(e.target.checked)}
                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                autoComplete="off"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="security-alerts" className="font-medium text-gray-700 dark:text-gray-300">
                Güvenlik Uyarıları
              </label>
              <p className="text-gray-500 dark:text-gray-400">
                Hesabınızla ilgili güvenlik uyarıları ve tavsiyeleri alın.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="course-updates"
                name="course-updates"
                type="checkbox"
                checked={courseUpdates}
                onChange={(e) => setCourseUpdates(e.target.checked)}
                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                autoComplete="off"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="course-updates" className="font-medium text-gray-700 dark:text-gray-300">
                Eğitim Güncellemeleri
              </label>
              <p className="text-gray-500 dark:text-gray-400">
                Yeni eğitim içerikleri, görevler ve kurs güncellemeleri hakkında bildirimler alın.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="marketing-emails"
                name="marketing-emails"
                type="checkbox"
                checked={marketingEmails}
                onChange={(e) => setMarketingEmails(e.target.checked)}
                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                autoComplete="off"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="marketing-emails" className="font-medium text-gray-700 dark:text-gray-300">
                Pazarlama E-postaları
              </label>
              <p className="text-gray-500 dark:text-gray-400">
                Kampanyalar, öneriler ve haber bültenleri hakkında e-postalar alın.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={saveNotificationSettings}
          disabled={isSaving}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
        >
          {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </div>
    </div>
  );
} 
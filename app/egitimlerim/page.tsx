'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// Direkt erişim kontrolü
if (typeof window !== 'undefined') {
  try {
    console.log('[Egitimlerim] Sayfa URL ile yükleniyor: ' + window.location.pathname);
    
    // Sayfa yüklenirken sorun olmaması için LocalStorage kontrolü
    const storedUser = localStorage.getItem('cyberly_user');
    if (!storedUser) {
      console.log('[Egitimlerim] Kullanıcı bulunamadı, giriş sayfasına yönlendiriliyor');
      // Router burada kullanamıyoruz çünkü henüz bileşen yüklenmedi
      // window.location.replace kullanmak yerine route değişikliği için yönlendirme yapacağız
      setTimeout(() => {
        window.location.href = '/giris?callbackUrl=/egitimlerim';
      }, 100);
    } else {
      console.log('[Egitimlerim] Kullanıcı bulundu, sayfa yükleniyor');
    }
  } catch (e) {
    console.error('[Egitimlerim] Hata:', e);
  }
}

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  imageUrl: string;
  category: string;
  level: 'Başlangıç' | 'Orta' | 'İleri';
  videoUrl?: string; // Eğitim videosu URL'si
}

// Sertifikalı Kurs türü
interface CertifiedCourse {
  title: string;
  description: string;
  instructor: string;
  platform: string;
  duration: string;
  level: string;
  link: string;
  logo: string;
}

// Video playlist kursu
const videoCourse: Course = {
  id: 'video-course-1',
  title: '0\'dan Siber Güvenlik Eğitimi',
  description: 'Kapsamlı siber güvenlik eğitim serisi. Temel kavramlardan ileri tekniklere kadar siber güvenlik konularını öğrenin.',
  progress: 30,
  imageUrl: 'https://placehold.co/600x400/111827/60A5FA?text=Siber+Güvenlik+Eğitimi',
  category: 'Video Eğitim Serisi',
  level: 'Başlangıç',
  videoUrl: 'https://youtube.com/playlist?list=PLGWmuqrfJZRtILSgqBaa7Ur1IegoQCrDU&si=cifoQL9s1hfHRH0v'
};

// Yeni eğitim serisi
const videoCourse2: Course = {
  id: 'video-course-2',
  title: 'İleri Seviye Siber Güvenlik Eğitimi',
  description: 'İleri seviye siber güvenlik teknikleri ve uygulamaları. Derinlemesine öğrenmek isteyenler için hazırlanmış kapsamlı eğitim serisi.',
  progress: 0,
  imageUrl: 'https://placehold.co/600x400/111827/60A5FA?text=İleri+Siber+Güvenlik',
  category: 'İleri Seviye Eğitim',
  level: 'İleri',
  videoUrl: 'https://youtube.com/playlist?list=PL_Dg4ySjnD8OLHw2v49wyEk_KtrElVV9F&si=BeekZ7jrPyoEz04s'
};

// Üçüncü eğitim serisi
const videoCourse3: Course = {
  id: 'video-course-3',
  title: 'Siber Güvenlik Uygulamaları',
  description: 'Siber güvenlik alanında pratik uygulamalar, gerçek dünya senaryoları ve çözümleri içeren kapsamlı bir eğitim serisi.',
  progress: 15,
  imageUrl: 'https://placehold.co/600x400/111827/60A5FA?text=Siber+Güvenlik+Uygulamaları',
  category: 'Uygulama Eğitimleri',
  level: 'Orta',
  videoUrl: 'https://youtube.com/playlist?list=PLGWmuqrfJZRtsnlik14O9JscT4cuDKwJy&si=7YfrlanLqQ3bznrb'
};

// Sertifikalı Eğitimler
const certifiedCourses: CertifiedCourse[] = [
  {
    title: 'Siber Güvenlik: Etik Hacker Olma Rehberi',
    description: 'Sıfırdan ileri seviyeye kapsamlı bir siber güvenlik kursu. Ağ güvenliği, zafiyet taraması, sosyal mühendislik ve daha fazlasını öğrenin.',
    instructor: 'Gökhan Muharremoğlu',
    platform: 'Udemy',
    duration: '23 saat',
    level: 'Başlangıç-İleri',
    link: 'https://www.udemy.com/course/gokhanmuharremoglu/',
    logo: 'https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg'
  },
  {
    title: 'Siber Güvenlik Kursu',
    description: 'Kapsamlı siber güvenlik eğitimi ve uygulamaları içeren interaktif kurs.',
    instructor: 'Gökhan Muharremoğlu',
    platform: 'Udemy',
    duration: '20 saat',
    level: 'Başlangıç-Orta',
    link: 'https://www.udemy.com/course/gokhanmuharremoglu/',
    logo: 'https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg'
  }
];

export default function CoursesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [openTabs, setOpenTabs] = useState<{[key: string]: boolean}>({
    'video-course-1': false,
    'video-course-2': false,
    'video-course-3': false
  });

  // Sertifikalı Kurs kartı bileşeni
  const CertifiedCourseCard = ({ course }: { course: CertifiedCourse }) => (
    <a href={course.link} target="_blank" rel="noopener noreferrer" className="block">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all shadow-lg h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-white">{course.title}</h3>
            <img src={course.logo} alt={course.platform} className="h-6" />
          </div>
          
          <p className="text-gray-300 mb-4">{course.description}</p>
          
          <div className="mt-auto space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Eğitmen: {course.instructor}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Süre: {course.duration}</span>
              </div>
              
              <div className="flex items-center">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-900 text-cyan-300">
                  {course.level}
                </span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-medium text-center transition-all mt-4">
              Kursa Git
            </div>
          </div>
        </div>
      </div>
    </a>
  );

  useEffect(() => {
    setMounted(true);
    
    // Kullanıcı kontrolü
    if (typeof window !== 'undefined') {
      const checkAuth = async () => {
        const storedUser = localStorage.getItem('cyberly_user');
        
        if (storedUser) {
          console.log('Eğitimlerim: Kullanıcı localStorage\'da bulundu');
          setIsAuthorized(true);
        } else if (!loading && !user) {
          console.log('Eğitimlerim: Kullanıcı giriş yapmamış, yönlendiriliyor');
          router.push('/giris?callbackUrl=' + encodeURIComponent('/egitimlerim'));
        } else if (user) {
          setIsAuthorized(true);
        }
      };
      
      checkAuth();
    }
  }, [user, loading, router]);

  const toggleTab = (tabId: string) => {
    setOpenTabs(prev => ({
      ...prev,
      [tabId]: !prev[tabId]
    }));
  };

  // Kullanıcı giriş yapmamışsa ve SSR ise
  if (!mounted || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }
  
  // Kullanıcı giriş yapmamışsa ve istemci tarafındayız
  if (!isAuthorized && mounted) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center">
          <p className="text-xl text-gray-400 mb-4">Bu sayfayı görüntülemek için giriş yapmalısınız.</p>
          <button
            onClick={() => router.push('/giris?callbackUrl=' + encodeURIComponent('/egitimlerim'))}
            className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      
      <main className="bg-gray-900 min-h-screen pb-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-cyan-400 mb-8">Eğitimlerim</h1>
          
          {/* Sertifikalı Eğitimler */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-blue-300 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              Sertifikalı Kurslarım
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifiedCourses.map((course, index) => (
                <CertifiedCourseCard key={index} course={course} />
              ))}
            </div>
          </div>
          
          {/* Sekmeli Video Eğitim Serisi */}
          <div className="max-w-3xl mx-auto mb-12 space-y-4">
            {/* İlk Eğitim - Başlangıç Seviyesi - Kırmızı */}
            <div className="bg-[#111827] rounded-lg overflow-hidden border border-gray-700 shadow-lg">
              {/* Sekme Başlığı */}
              <div 
                className={`flex items-center justify-between p-4 cursor-pointer ${openTabs['video-course-1'] ? 'border-b border-gray-700' : ''}`}
                onClick={() => toggleTab('video-course-1')}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{videoCourse.title}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-400 mr-3">{videoCourse.category}</span>
                      <span className="text-xs font-semibold text-red-400">YouTube Eğitim Serisi</span>
                    </div>
                  </div>
                </div>
                <div className="text-gray-400">
                  <svg 
                    className={`w-5 h-5 transform transition-transform ${openTabs['video-course-1'] ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Sekme İçeriği */}
              {openTabs['video-course-1'] && (
                <div className="p-4 bg-gray-800">
                  <div className="mb-4">
                    <p className="text-gray-300">{videoCourse.description}</p>
                  </div>
                  
                  <div className="aspect-video w-full mb-4 bg-black rounded overflow-hidden">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/videoseries?list=PLGWmuqrfJZRtILSgqBaa7Ur1IegoQCrDU`} 
                      title="YouTube video player" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-xs text-gray-400 mr-2">Seviye:</span>
                      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">{videoCourse.level}</span>
                    </div>
                    
                    <a 
                      href={videoCourse.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors flex items-center text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                      </svg>
                      YouTube'da Görüntüle
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Üçüncü Eğitim - Orta Seviye - Yeşil */}
            <div className="bg-[#111827] rounded-lg overflow-hidden border border-gray-700 shadow-lg">
              {/* Sekme Başlığı */}
              <div 
                className={`flex items-center justify-between p-4 cursor-pointer ${openTabs['video-course-3'] ? 'border-b border-gray-700' : ''}`}
                onClick={() => toggleTab('video-course-3')}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{videoCourse3.title}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-400 mr-3">{videoCourse3.category}</span>
                      <span className="text-xs font-semibold text-green-400">YouTube Eğitim Serisi</span>
                    </div>
                  </div>
                </div>
                <div className="text-gray-400">
                  <svg 
                    className={`w-5 h-5 transform transition-transform ${openTabs['video-course-3'] ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Sekme İçeriği */}
              {openTabs['video-course-3'] && (
                <div className="p-4 bg-gray-800">
                  <div className="mb-4">
                    <p className="text-gray-300">{videoCourse3.description}</p>
                  </div>
                  
                  <div className="aspect-video w-full mb-4 bg-black rounded overflow-hidden">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/videoseries?list=PLGWmuqrfJZRtsnlik14O9JscT4cuDKwJy`} 
                      title="YouTube video player" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-xs text-gray-400 mr-2">Seviye:</span>
                      <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">{videoCourse3.level}</span>
                    </div>
                    
                    <a 
                      href={videoCourse3.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                      </svg>
                      YouTube'da Görüntüle
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* İkinci Eğitim - İleri Seviye - Mor */}
            <div className="bg-[#111827] rounded-lg overflow-hidden border border-gray-700 shadow-lg">
              {/* Sekme Başlığı */}
              <div 
                className={`flex items-center justify-between p-4 cursor-pointer ${openTabs['video-course-2'] ? 'border-b border-gray-700' : ''}`}
                onClick={() => toggleTab('video-course-2')}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{videoCourse2.title}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-400 mr-3">{videoCourse2.category}</span>
                      <span className="text-xs font-semibold text-purple-400">YouTube Eğitim Serisi</span>
                    </div>
                  </div>
                </div>
                <div className="text-gray-400">
                  <svg 
                    className={`w-5 h-5 transform transition-transform ${openTabs['video-course-2'] ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Sekme İçeriği */}
              {openTabs['video-course-2'] && (
                <div className="p-4 bg-gray-800">
                  <div className="mb-4">
                    <p className="text-gray-300">{videoCourse2.description}</p>
                  </div>
                  
                  <div className="aspect-video w-full mb-4 bg-black rounded overflow-hidden">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/videoseries?list=PL_Dg4ySjnD8OLHw2v49wyEk_KtrElVV9F`} 
                      title="YouTube video player" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-xs text-gray-400 mr-2">Seviye:</span>
                      <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">{videoCourse2.level}</span>
                    </div>
                    
                    <a 
                      href={videoCourse2.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors flex items-center text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                      </svg>
                      YouTube'da Görüntüle
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
}
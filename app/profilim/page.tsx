'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaChevronDown, FaChevronUp, FaLinkedin, FaGithub, FaTwitter, FaGlobe, FaGraduationCap, FaBriefcase, FaMapMarkerAlt, FaEnvelope, FaPhone, FaUser, FaAward, FaCode } from 'react-icons/fa'

// Direkt erişim kontrolü
if (typeof window !== 'undefined') {
  try {
    console.log('[Profilim] Sayfa URL ile yükleniyor: ' + window.location.pathname);
    
    // Sayfa yüklenirken sorun olmaması için LocalStorage kontrolü
    const storedUser = localStorage.getItem('cyberly_user');
    if (!storedUser) {
      console.log('[Profilim] Kullanıcı bulunamadı, giriş sayfasına yönlendiriliyor');
      // Router burada kullanamıyoruz çünkü henüz bileşen yüklenmedi
      setTimeout(() => {
        window.location.href = '/giris?callbackUrl=/profilim';
      }, 100);
    } else {
      console.log('[Profilim] Kullanıcı bulundu, sayfa yükleniyor');
    }
  } catch (e) {
    console.error('[Profilim] Hata:', e);
  }
}

// Kullanıcı tipi
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
};

// Panel props tip tanımı
type CollapsiblePanelProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

// Genişletilebilir panel bileşeni
function CollapsiblePanel({ title, icon, children, defaultOpen = false }: CollapsiblePanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <div className="border border-gray-700 rounded-md overflow-hidden mb-4">
      <button 
        className="w-full flex items-center justify-between bg-gray-700 px-4 py-3 text-white hover:bg-gray-600 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-2 font-medium">{title}</span>
        </div>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-800">
          {children}
        </div>
      )}
    </div>
  )
}

export default function ProfilPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [userData, setUserData] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Demo amaçlı ekstra kullanıcı bilgileri
  const [userDetails, setUserDetails] = useState({
    title: 'Siber Güvenlik Uzmanı',
    location: 'İstanbul, Türkiye',
    phone: '+90 555 123 4567',
    bio: 'Siber güvenlik konusunda 5 yıllık deneyime sahibim. Ağ güvenliği, penetrasyon testleri ve güvenlik analizi konularında uzmanlığım var.',
    education: [
      { id: 1, school: 'İstanbul Teknik Üniversitesi', degree: 'Bilgisayar Mühendisliği', year: '2018-2022' },
      { id: 2, school: 'Siber Güvenlik Akademisi', degree: 'Siber Güvenlik Sertifikası', year: '2020' }
    ],
    experience: [
      { id: 1, company: 'Güvenlik A.Ş.', position: 'Siber Güvenlik Uzmanı', year: '2022-Şu anda' },
      { id: 2, company: 'Teknoloji Ltd.', position: 'Jr. Güvenlik Analisti', year: '2020-2022' }
    ],
    social: {
      linkedin: 'https://linkedin.com/in/username',
      github: 'https://github.com/username',
      twitter: 'https://twitter.com/username',
      website: 'https://example.com'
    },
    certificates: [
      { id: 1, name: 'Certified Ethical Hacker (CEH)', issuer: 'EC-Council', year: '2021' },
      { id: 2, name: 'CompTIA Security+', issuer: 'CompTIA', year: '2020' }
    ],
    skills: ['Ağ Güvenliği', 'Penetrasyon Testleri', 'SIEM', 'Güvenlik Duvarları', 'Linux', 'Python', 'JavaScript']
  })
  
  useEffect(() => {
    // Sayfa yüklendiğinde kullanıcı kontrolü
    if (typeof window !== 'undefined') {
      try {
        // Öncelikle AuthContext'ten gelen kullanıcıyı kontrol et
        if (user) {
          setUserData(user as User);
          setIsLoaded(true);
          return;
        }

        // AuthContext'ten kullanıcı yoksa localStorage'a bak
        const storedUser = localStorage.getItem('cyberly_user');
        if (storedUser) {
          setUserData(JSON.parse(storedUser));
          setIsLoaded(true);
          return;
        } 

        // Her iki kaynakta da kullanıcı yoksa ve yükleme tamamlandıysa giriş sayfasına yönlendir
        if (!loading) {
          console.log('Kullanıcı bulunamadı, giriş sayfasına yönlendiriliyor');
          router.push('/giris?callbackUrl=/profilim');
        }
      } catch (error) {
        console.error('Profil sayfası yüklenirken hata:', error);
        setIsLoaded(true);
      }
    }
  }, [user, loading, router]);
  
  // useAuth hook'undan gelen kullanıcı bilgisini izle
  useEffect(() => {
    if (user) {
      setUserData(user as User)
      setIsLoaded(true)
    }
  }, [user])

  // Yükleniyor durumu
  if ((loading && !isLoaded) || (!userData && !isLoaded)) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Kullanıcı bilgileriniz yükleniyor...</p>
        </div>
      </div>
    )
  }

  // Kullanıcı yoksa giriş sayfasına yönlendir
  if (!userData && isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Giriş sayfasına yönlendiriliyor...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <div className="px-6 py-8">
              {/* Profil Başlığı */}
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Profilim</h1>
                {userData?.role === 'ADMIN' && (
                  <span className="bg-cyan-600 text-white text-xs px-3 py-1 rounded-full">Admin</span>
                )}
                {userData?.role === 'USER' && (
                  <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">Kullanıcı</span>
                )}
              </div>
              
              <div className="flex flex-col md:flex-row md:space-x-8">
                {/* Profil fotoğrafı ve temel bilgiler */}
                <div className="flex flex-col items-center mb-8 md:mb-0">
                  <div className="relative w-32 h-32 mb-4">
                    {userData?.avatarUrl ? (
                      <Image 
                        src={userData.avatarUrl} 
                        alt="Profil fotoğrafı" 
                        fill 
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-cyan-800 flex items-center justify-center text-5xl text-white">
                        {userData?.name?.charAt(0) || (userData?.email ? userData.email.charAt(0).toUpperCase() : 'U')}
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-1">{userData?.name || 'Kullanıcı'}</h2>
                  <p className="text-gray-400 text-sm mb-2">{userData?.email || 'kullanici@ornek.com'}</p>
                  
                  {/* Sosyal Medya Bağlantıları */}
                  <div className="flex space-x-3 mt-2">
                    {userDetails.social.linkedin && (
                      <a href={userDetails.social.linkedin} target="_blank" rel="noopener noreferrer" 
                        className="text-gray-400 hover:text-blue-500 transition">
                        <FaLinkedin size={20} />
                      </a>
                    )}
                    {userDetails.social.github && (
                      <a href={userDetails.social.github} target="_blank" rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition">
                        <FaGithub size={20} />
                      </a>
                    )}
                    {userDetails.social.twitter && (
                      <a href={userDetails.social.twitter} target="_blank" rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition">
                        <FaTwitter size={20} />
                      </a>
                    )}
                    {userDetails.social.website && (
                      <a href={userDetails.social.website} target="_blank" rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition">
                        <FaGlobe size={20} />
                      </a>
                    )}
                  </div>

                  <div className="w-full mt-4">
                    <a
                      href="http://localhost:3000/ayarlar"
                      className="block w-full text-center bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md transition text-sm"
                    >
                      Profili Düzenle
                    </a>
                  </div>
                </div>
                
                {/* Profil bilgileri - Sağ taraf */}
                <div className="flex-1">
                  {/* Temel bilgiler panel */}
                  <CollapsiblePanel 
                    title="Temel Bilgiler" 
                    icon={<FaUser className="text-cyan-400" />}
                    defaultOpen={true}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-400 mb-1">Ad Soyad</div>
                        <div className="bg-gray-700 px-3 py-2 rounded-md text-white">{userData?.name || 'Belirtilmemiş'}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-400 mb-1">E-posta Adresi</div>
                        <div className="bg-gray-700 px-3 py-2 rounded-md text-white">{userData?.email || 'Belirtilmemiş'}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-400 mb-1">Ünvan</div>
                        <div className="bg-gray-700 px-3 py-2 rounded-md text-white">{userDetails.title}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-400 mb-1">Konum</div>
                        <div className="bg-gray-700 px-3 py-2 rounded-md text-white flex items-center">
                          <FaMapMarkerAlt className="text-cyan-400 mr-2" />
                          {userDetails.location}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-400 mb-1">Telefon</div>
                        <div className="bg-gray-700 px-3 py-2 rounded-md text-white flex items-center">
                          <FaPhone className="text-cyan-400 mr-2" />
                          {userDetails.phone}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-400 mb-1">Hesap Durumu</div>
                        <div className="bg-green-600/30 border border-green-500 px-3 py-2 rounded-md text-green-300">Aktif</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-400 mb-1">Hakkımda</div>
                      <div className="bg-gray-700 px-3 py-2 rounded-md text-white">
                        {userDetails.bio}
                      </div>
                    </div>
                  </CollapsiblePanel>
                  
                  {/* Eğitim Bilgileri */}
                  <CollapsiblePanel 
                    title="Eğitim Bilgileri" 
                    icon={<FaGraduationCap className="text-cyan-400" />}
                  >
                    {userDetails.education.length > 0 ? (
                      <div className="space-y-4">
                        {userDetails.education.map(edu => (
                          <div key={edu.id} className="bg-gray-700 p-3 rounded-md">
                            <div className="text-white font-medium">{edu.school}</div>
                            <div className="text-gray-300">{edu.degree}</div>
                            <div className="text-gray-400 text-sm">{edu.year}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400">Henüz eğitim bilgisi eklenmemiş.</p>
                    )}
                  </CollapsiblePanel>
                  
                  {/* İş Deneyimi */}
                  <CollapsiblePanel 
                    title="İş Deneyimi" 
                    icon={<FaBriefcase className="text-cyan-400" />}
                  >
                    {userDetails.experience.length > 0 ? (
                      <div className="space-y-4">
                        {userDetails.experience.map(exp => (
                          <div key={exp.id} className="bg-gray-700 p-3 rounded-md">
                            <div className="text-white font-medium">{exp.company}</div>
                            <div className="text-gray-300">{exp.position}</div>
                            <div className="text-gray-400 text-sm">{exp.year}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400">Henüz iş deneyimi eklenmemiş.</p>
                    )}
                  </CollapsiblePanel>
                  
                  {/* Sertifikalar */}
                  <CollapsiblePanel 
                    title="Sertifikalar" 
                    icon={<FaAward className="text-cyan-400" />}
                  >
                    {userDetails.certificates.length > 0 ? (
                      <div className="space-y-4">
                        {userDetails.certificates.map(cert => (
                          <div key={cert.id} className="bg-gray-700 p-3 rounded-md">
                            <div className="text-white font-medium">{cert.name}</div>
                            <div className="text-gray-300">{cert.issuer}</div>
                            <div className="text-gray-400 text-sm">{cert.year}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400">Henüz sertifika eklenmemiş.</p>
                    )}
                  </CollapsiblePanel>
                  
                  {/* Yetenekler */}
                  <CollapsiblePanel 
                    title="Yetenekler" 
                    icon={<FaCode className="text-cyan-400" />}
                  >
                    <div className="flex flex-wrap gap-2">
                      {userDetails.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="bg-gray-700 text-cyan-300 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CollapsiblePanel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
} 
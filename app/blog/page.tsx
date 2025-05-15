import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Blog - CYBERLY',
  description: 'Siber güvenlik, veri koruma ve dijital farkındalık hakkında güncel makaleler ve analizler',
}

// Blog kategorileri
const categories = [
  { name: 'Tümü', count: 24 },
  { name: 'Siber Tehditler', count: 8 },
  { name: 'Güvenlik Önlemleri', count: 6 },
  { name: 'Veri Güvenliği', count: 5 },
  { name: 'Sosyal Mühendislik', count: 3 },
  { name: 'Etik Hacking', count: 2 },
]

// Öne çıkan blog yazısı
const featuredPost = {
  title: 'Yeni Nesil Fidye Yazılımları ve Korunma Yöntemleri',
  excerpt: 'Son yıllarda evrilen fidye yazılımları, çift taraflı tehdit stratejileri ve kuruluşların alması gereken kapsamlı önlemler hakkında detaylı bir analiz.',
  date: '15 Nisan 2024',
  readTime: '12 dk okuma',
  author: 'Fevziye Nur Kesebir',
  category: 'Siber Tehditler'
}

// Blog yazıları
const blogPosts = [
  {
    title: 'Zero Trust Güvenlik Modeli: Şirketler İçin Uygulama Rehberi',
    excerpt: '"Hiçbir şeye güvenme, her şeyi doğrula" prensibiyle çalışan Zero Trust modelini kurumunuza nasıl entegre edebilirsiniz?',
    date: '5 Nisan 2024',
    readTime: '10 dk okuma',
    author: 'Fevziye Nur Kesebir',
    category: 'Güvenlik Önlemleri'
  },
  {
    title: 'Sosyal Mühendislik Saldırıları: Güncel Teknikler ve Savunma',
    excerpt: 'Değişen sosyal mühendislik taktikleri, işyerinde ve günlük hayatta kendinizi ve kurumunuzu nasıl koruyabilirsiniz?',
    date: '28 Mart 2024',
    readTime: '8 dk okuma',
    author: 'Nisanur Gökçen Usta',
    category: 'Sosyal Mühendislik'
  },
  {
    title: 'API Güvenliği: REST ve GraphQL Uygulamalarında Güvenlik Riskleri',
    excerpt: 'Modern web API\'lerinde yaygın güvenlik açıkları, OWASP API Security Top 10 ve pratik güvenlik önlemleri.',
    date: '15 Mart 2024',
    readTime: '9 dk okuma',
    author: 'Fevziye Nur Kesebir',
    category: 'Güvenlik Önlemleri'
  },
  {
    title: 'KVKK ve GDPR Uyumlu Veri Koruma Stratejileri',
    excerpt: 'Kurumların veri koruma düzenlemelerine uyum sağlaması için gerekli teknik ve organizasyonel önlemler.',
    date: '3 Mart 2024',
    readTime: '11 dk okuma',
    author: 'Nisanur Gökçen Usta',
    category: 'Veri Güvenliği'
  },
  {
    title: 'Tehdit Avı (Threat Hunting): Proaktif Siber Güvenlik Yaklaşımı',
    excerpt: 'Saldırganları beklemek yerine aktif olarak tehdit avı yaparak sızma belirtilerini nasıl tespit edebilirsiniz?',
    date: '20 Şubat 2024',
    readTime: '9 dk okuma',
    author: 'Fevziye Nur Kesebir',
    category: 'Siber Tehditler'
  },
  {
    title: 'Açık Kaynak İstihbarat (OSINT) Teknikleri ve Etik Kullanımı',
    excerpt: 'Açık kaynaklardan bilgi toplama, tehdit istihbaratı ve güvenlik araştırmaları için OSINT yaklaşımları.',
    date: '5 Şubat 2024',
    readTime: '10 dk okuma',
    author: 'Nisanur Gökçen Usta',
    category: 'Etik Hacking'
  },
]

// Kategori listelemesi için bileşen
function CategoryList() {
  return (
    <ul className="space-y-3">
      {categories.map((category, index) => (
        <li key={index}>
          <a 
            href="#" 
            className={`flex justify-between items-center ${index === 0 ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'} transition-colors`}
          >
            <span>{category.name}</span>
            <span className="rounded-full bg-gray-700 px-3 py-1 text-xs font-medium">
              {category.count}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

// Blog Abonelik Formu - client component gerektirdiği için ayrı bir dosyaya taşınmalı
function NewsletterForm() {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold text-white mb-6">Abone Ol</h3>
      <p className="text-gray-400 mb-4">
        En son siber güvenlik gelişmeleri ve güvenlik uyarılarını almak için abone olun.
      </p>
      <form className="space-y-4">
        <div>
          <input
            type="email"
            required
            className="w-full px-4 py-3 border-2 border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="E-posta adresiniz"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white font-medium transition-colors"
        >
          Abone Ol
        </button>
      </form>
    </div>
  )
}

// Öne çıkan blog yazısı bileşeni 
function FeaturedPost() {
  return (
    <div className="mb-12">
      <Link href="/blog/featured" className="block">
        <div className="flex flex-col rounded-xl shadow-2xl overflow-hidden bg-gray-800 border border-gray-700 hover:border-cyan-700 transition-colors">
          <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-cyan-900 text-cyan-300">
                {featuredPost.category}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">{featuredPost.title}</h2>
            <p className="text-gray-300 mb-4">{featuredPost.excerpt}</p>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-800 flex items-center justify-center text-cyan-200 font-bold">
                {featuredPost.author.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {featuredPost.author}
                </p>
                <div className="flex space-x-1 text-sm text-gray-400">
                  <time dateTime="2020-03-16">{featuredPost.date}</time>
                  <span aria-hidden="true">&middot;</span>
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

// Blog post kartı için tip tanımı
type BlogPost = {
  title: string
  excerpt: string
  date: string
  readTime: string
  author: string
  category: string
}

// Blog post kartı bileşeni
function BlogPostCard({ post }: { post: BlogPost }) {
  // Slug oluştur (başlıktan URL için uygun bir slug oluşturma)
  const slug = post.title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');

  return (
    <Link href={`/blog/${slug}`} className="block h-full">
      <div className="flex flex-col rounded-xl overflow-hidden bg-gray-800 border border-gray-700 hover:border-cyan-700 transition-colors shadow-lg h-full">
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-900 text-cyan-300">
              {post.category}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
          <p className="text-gray-300 mb-4 flex-grow">{post.excerpt}</p>
          <div className="flex items-center mt-auto">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-800 flex items-center justify-center text-cyan-200 font-bold text-sm">
              {post.author.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                {post.author}
              </p>
              <div className="flex space-x-1 text-sm text-gray-400">
                <time dateTime="2020-03-16">{post.date}</time>
                <span aria-hidden="true">&middot;</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      
      <main className="bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-900">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute -top-1/4 -right-1/4 h-96 w-96 rounded-full bg-cyan-600 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Siber Güvenlik</span>
                <span className="block text-cyan-400">Blog ve Analizler</span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                Güncel siber tehditler, güvenlik önlemleri ve en iyi uygulamalar hakkında uzman içerikleri
              </p>
            </div>
          </div>
        </section>
        
        {/* Blog Content */}
        <section className="py-12 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Blog Yazısı Ekle Butonu - Sol Üst */}
                <div className="mb-6">
                  <Link 
                    href="/blog/yeni" 
                    className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group"
                  >
                    <div className="absolute w-full h-full -translate-x-full bg-gradient-to-r from-cyan-400 to-cyan-500 opacity-30 transform skew-x-12 transition-transform duration-300 group-hover:translate-x-full"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="hidden sm:inline">Yeni Blog Yazısı Oluştur</span>
                    <span className="sm:hidden">Yazı Ekle</span>
                  </Link>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-8">
                  <h3 className="text-xl font-bold text-white mb-6">Kategoriler</h3>
                  <CategoryList />
                  <NewsletterForm />
                </div>
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-3">
                <FeaturedPost />
                
                {/* Blog Posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {blogPosts.map((post, index) => (
                    <BlogPostCard key={index} post={post} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Floating Action Button - Sadece mobil görünümde gösterilsin */}
        <div className="fixed bottom-8 right-8 z-50 md:hidden">
          <Link
            href="/blog/yeni"
            aria-label="Blog Yazısı Ekle"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-xl hover:shadow-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
      </main>
      
      <Footer />
    </>
  )
} 
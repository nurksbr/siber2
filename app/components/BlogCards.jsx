import Image from 'next/image'

function BlogCards() {
  const blogPosts = [
    {
      title: 'Siber Saldırılara Karşı Korunmanın 10 Etkili Yolu',
      excerpt: 'Modern siber saldırılara karşı kendinizi ve işletmenizi nasıl koruyabileceğiniz hakkında en güncel öneriler.',
      date: '12 Mart 2023',
      author: 'Ahmet Yılmaz',
      authorImage: '/author1.jpg',
      image: '/blog-post1.jpg',
      category: 'Koruma'
    },
    {
      title: 'Sosyal Mühendislik Saldırılarını Tanıma ve Önleme',
      excerpt: 'İnsan psikolojisini hedef alan sosyal mühendislik saldırılarını nasıl fark edebilir ve kendinizi koruyabilirsiniz?',
      date: '5 Nisan 2023',
      author: 'Zeynep Kaya',
      authorImage: '/author2.jpg',
      image: '/blog-post2.jpg',
      category: 'Farkındalık'
    },
    {
      title: 'Kritik Altyapı Güvenliği: Enerji Sektörü Tehditleri',
      excerpt: 'Enerji sektörünü hedef alan siber saldırılar ve alınabilecek önlemler hakkında derinlemesine bir analiz.',
      date: '18 Mayıs 2023',
      author: 'Mehmet Demir',
      authorImage: '/author3.jpg',
      image: '/blog-post3.jpg',
      category: 'Endüstriyel Güvenlik'
    },
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            En Son Siber Güvenlik Makaleleri
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
            Siber güvenlik dünyasındaki en son gelişmeler, tehditler ve savunma stratejileri hakkında uzman içerikleri
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <div key={index} className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-gray-800 border border-gray-700 hover:border-cyan-700 transition-colors">
              <div className="flex-shrink-0 relative h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50 z-10"></div>
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-cyan-900 text-cyan-300">
                    {post.category}
                  </span>
                </div>
                <Image
                  className="h-48 w-full object-cover"
                  src={post.image}
                  alt={post.title}
                  width={500}
                  height={300}
                />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <a href="#" className="block">
                    <h3 className="text-xl font-semibold text-white hover:text-cyan-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-gray-400">
                      {post.excerpt}
                    </p>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0 relative">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={post.authorImage}
                      alt={post.author}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {post.author}
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-400">
                      <time dateTime="2020-03-16">{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>5 dk okuma</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/blog"
            className="inline-flex items-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-white hover:bg-gray-800 hover:border-cyan-700 transition-colors"
          >
            Tüm Makaleleri Görüntüle
            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default BlogCards 
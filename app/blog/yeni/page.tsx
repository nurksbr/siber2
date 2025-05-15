'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { submitBlogPost } from '../actions'

// Blog kategorileri
const categories = [
  { name: 'Web Geliştirme', value: 'web-gelistirme' },
  { name: 'React & Next.js', value: 'react-nextjs' },
  { name: 'UI/UX Tasarım', value: 'ui-ux-tasarim' },
  { name: 'Backend', value: 'backend' },
  { name: 'Yapay Zeka', value: 'yapay-zeka' },
]

type FormErrors = {
  title?: string[]
  category?: string[]
  excerpt?: string[]
  content?: string[]
  author?: string[]
  email?: string[]
}

export default function YeniBlogPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    author: '',
    email: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [generalError, setGeneralError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // İlgili hata varsa temizle
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError('')
    
    // FormData nesnesini oluştur
    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value)
    })
    
    // Server Action'ı çalıştır
    startTransition(async () => {
      try {
        const result = await submitBlogPost(formDataToSend)
        
        if (result.success) {
          setSuccess(true)
          setTimeout(() => {
            router.push('/blog')
          }, 2000)
        } else {
          if (result.errors) {
            setErrors(result.errors as FormErrors)
          }
          setGeneralError(result.message || 'Bir hata oluştu')
        }
      } catch (err) {
        console.error('Form gönderimi sırasında hata:', err)
        setGeneralError('Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.')
      }
    })
  }

  return (
    <>
      <Navbar />
      
      <main className="bg-gray-900 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Yeni Blog Yazısı</span>
              <span className="block text-cyan-400">Topluluğumuza Katkıda Bulunun</span>
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Siber güvenlik ve yazılım geliştirme konularında bilgi ve deneyimlerinizi paylaşın.
            </p>
          </div>

          {success ? (
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 mb-8 border border-green-500">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-white">Blog yazınız başarıyla gönderildi!</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Yazınız incelendikten sonra yayınlanacaktır. Blog sayfasına yönlendiriliyorsunuz...
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-lg p-8 mb-8 border border-gray-700">
              {generalError && (
                <div className="mb-6 bg-red-900/50 border border-red-500 text-white px-4 py-3 rounded-md">
                  <p>{generalError}</p>
                </div>
              )}
              
              <div className="space-y-6">
                {/* Başlık */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-white">
                    Başlık <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 bg-gray-700 border ${errors.title ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                    placeholder="Blog yazınız için çekici bir başlık"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title[0]}</p>
                  )}
                </div>
                
                {/* Kategori */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-white">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 bg-gray-700 border ${errors.category ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                  >
                    <option value="">Kategori seçin</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">{errors.category[0]}</p>
                  )}
                </div>
                
                {/* Özet */}
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-white">
                    Özet <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    required
                    rows={2}
                    value={formData.excerpt}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 bg-gray-700 border ${errors.excerpt ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                    placeholder="Blog yazınızın kısa bir özeti (1-2 cümle)"
                  />
                  {errors.excerpt && (
                    <p className="mt-1 text-sm text-red-500">{errors.excerpt[0]}</p>
                  )}
                </div>
                
                {/* İçerik */}
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-white">
                    İçerik <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    required
                    rows={8}
                    value={formData.content}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 bg-gray-700 border ${errors.content ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                    placeholder="Blog yazınızın içeriği"
                  />
                  {errors.content && (
                    <p className="mt-1 text-sm text-red-500">{errors.content[0]}</p>
                  )}
                </div>
                
                {/* Yazar Bilgileri */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-white">
                      Adınız <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      required
                      value={formData.author}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 bg-gray-700 border ${errors.author ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                      placeholder="Adınız ve soyadınız"
                    />
                    {errors.author && (
                      <p className="mt-1 text-sm text-red-500">{errors.author[0]}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white">
                      E-posta Adresiniz <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                      placeholder="ornek@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>
                    )}
                  </div>
                </div>
                
                {/* Gönderme Butonu */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="mr-4 inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Gönderiliyor...
                      </>
                    ) : (
                      'Blog Yazısını Gönder'
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
          
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Blog Yazısı Gönderme Kuralları</h2>
            <ul className="space-y-2 text-gray-300 list-disc pl-5">
              <li>Yazınız siber güvenlik, yazılım geliştirme veya teknoloji ile ilgili olmalıdır.</li>
              <li>Yazınız özgün olmalı, başka kaynaklardan kopyalanmış içerik içermemelidir.</li>
              <li>Yazınız en az 500 kelime olmalıdır.</li>
              <li>Yazınız saldırgan, küfürlü veya uygunsuz içerik barındırmamalıdır.</li>
              <li>Yazınız editörlerimiz tarafından incelendikten sonra yayınlanacaktır.</li>
              <li>Yazılarınızda kaynak belirtmeyi unutmayın.</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
} 
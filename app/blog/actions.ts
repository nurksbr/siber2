'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'

// Form şeması ile doğrulama
const BlogFormSchema = z.object({
  title: z.string().min(5, 'Başlık en az 5 karakter olmalıdır.').max(100, 'Başlık en fazla 100 karakter olabilir.'),
  category: z.string().min(1, 'Lütfen bir kategori seçin.'),
  excerpt: z.string().min(10, 'Özet en az 10 karakter olmalıdır.').max(200, 'Özet en fazla 200 karakter olabilir.'),
  content: z.string().min(100, 'İçerik en az 100 karakter olmalıdır.'),
  author: z.string().min(3, 'Adınız en az 3 karakter olmalıdır.'),
  email: z.string().email('Geçerli bir e-posta adresi girin.'),
})

// Blog yazısı gönderme işlemi
export async function submitBlogPost(formData: FormData) {
  try {
    // Form verilerini işleme
    const parsed = BlogFormSchema.safeParse({
      title: formData.get('title'),
      category: formData.get('category'),
      excerpt: formData.get('excerpt'),
      content: formData.get('content'),
      author: formData.get('author'),
      email: formData.get('email'),
    })

    // Doğrulama başarısızsa hata döndür
    if (!parsed.success) {
      const errors = parsed.error.format()
      return { 
        success: false, 
        errors, 
        message: 'Form alanlarını kontrol edin.' 
      }
    }

    // Simüle edilmiş veritabanı işlemi
    // Gerçek uygulamada bu kısımda veritabanına kayıt yapılır
    console.log('Blog yazısı sunucuda işlendi:', parsed.data)
    
    // Başarı mesajı döndür
    revalidatePath('/blog')
    return { 
      success: true, 
      message: 'Blog yazınız başarıyla gönderildi. İncelendikten sonra yayınlanacaktır.' 
    }
  } catch (error) {
    console.error('Blog gönderimi sırasında hata:', error)
    return { 
      success: false, 
      message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.' 
    }
  }
} 
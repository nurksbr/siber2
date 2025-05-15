'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, Typography, Input, Button, Form, Checkbox, Alert, Divider, Space, Modal, List, Avatar } from 'antd'
import { LockOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined, WarningOutlined, InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

interface FormValues {
  username: string
  password: string
  remember?: boolean
}

export default function SosyalMedyaPhishingPage() {
  const [showExplanation, setShowExplanation] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm<FormValues>()

  const phishingIndicators = [
    {
      title: 'URL Adresi',
      description: 'Gerçek sosyal medya URL\'si yerine benzer ama farklı bir domain kullanılmış (örn: faceboook.com, face-book.com)',
      icon: <WarningOutlined style={{ color: 'red' }} />
    },
    {
      title: 'HTTPS Eksikliği',
      description: 'Güvenli bağlantı (HTTPS) kullanılmamış, bu da tüm verilerinizin açık bir şekilde iletildiği anlamına gelir',
      icon: <WarningOutlined style={{ color: 'red' }} />
    },
    {
      title: 'Tasarım Farklılıkları',
      description: 'Logo, fontlar ve genel tasarım orijinal siteden farklı veya düşük kaliteli',
      icon: <InfoCircleOutlined style={{ color: 'orange' }} />
    },
    {
      title: 'Aciliyet Mesajları',
      description: 'Hesabınızın tehlikede olduğu veya acil giriş yapmanız gerektiği şeklinde endişe uyandıran ifadeler',
      icon: <InfoCircleOutlined style={{ color: 'orange' }} />
    },
    {
      title: 'Dil ve İmla Hataları',
      description: 'Profesyonel olmayan dil kullanımı, yazım ve dilbilgisi hataları',
      icon: <InfoCircleOutlined style={{ color: 'orange' }} />
    }
  ]

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleFinish = (values: FormValues) => {
    setShowExplanation(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Alert
          message="Eğitim Simülasyonu"
          description="Bu sayfa eğitim amaçlı bir phishing simülasyonudur. Gerçek bilgilerinizi girmeyin."
          type="warning"
          showIcon
          banner
        />

        {!showExplanation ? (
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Phishing Sayfası Simülasyonu */}
            <Card 
              title={
                <div className="flex items-center">
                  <div className="text-blue-500 text-2xl font-bold">Sosyal Medya</div>
                </div>
              }
              className="w-full md:w-96 shadow-lg"
              style={{ border: '1px solid #e8e8e8' }}
            >
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-5xl mb-4">
                  S
                </div>
                <Title level={3}>Giriş Yap</Title>
                <Paragraph className="text-gray-500">
                  Hesabınıza erişmek için giriş yapın
                </Paragraph>
              </div>

              <Form
                form={form}
                name="login_form"
                onFinish={handleFinish}
                layout="vertical"
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Lütfen e-posta adresinizi girin!' }]}
                >
                  <Input 
                    prefix={<UserOutlined />} 
                    placeholder="E-posta veya telefon" 
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Şifre"
                    size="large"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Beni hatırla</Checkbox>
                  <Button type="link" className="float-right p-0">
                    Şifremi unuttum
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" block>
                    Giriş Yap
                  </Button>
                </Form.Item>

                <Divider plain>veya</Divider>

                <div className="text-center">
                  <Button type="default" size="large" className="mb-3" block>
                    Yeni Hesap Oluştur
                  </Button>
                </div>
              </Form>
            </Card>

            {/* URL Bar Simulation */}
            <div className="w-full md:w-96">
              <div className="border border-gray-300 rounded mb-4 p-2 bg-gray-100 flex items-center">
                <Text code className="text-red-500">
                  http://sosyal-medya-giris.tk/login.php
                </Text>
                <Button 
                  type="link" 
                  icon={<InfoCircleOutlined />} 
                  onClick={showModal}
                  className="ml-auto"
                />
              </div>
              
              <Alert
                message="Phishing İpucu!"
                description="Bu sayfa, sosyal medya platformunun gerçek giriş sayfasına benziyor, ancak URL'sine ve güvenlik özelliklerine dikkat edin."
                type="info"
                showIcon
              />
            </div>
          </div>
        ) : (
          <Card title="Phishing Analizi" className="mt-6">
            <Alert
              message="Simülasyon Tamamlandı!"
              description="Tebrikler! Bu bir phishing simülasyonuydu. Şimdi sayfadaki güvenlik zafiyetlerini analiz edelim."
              type="success"
              showIcon
              className="mb-6"
            />

            <Title level={4}>Bu Sayfadaki Phishing Göstergeleri:</Title>
            
            <List
              itemLayout="horizontal"
              dataSource={phishingIndicators}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={item.icon} />}
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />

            <Divider />

            <Title level={4}>Nasıl Korunabilirsiniz?</Title>
            <List
              itemLayout="horizontal"
              dataSource={[
                'URL adresini her zaman kontrol edin - meşru sosyal medya siteleri "https://" ile başlar ve doğru domain adını içerir',
                'Tarayıcı adres çubuğundaki güvenlik kilidini kontrol edin',
                'Şüpheli e-posta bağlantılarına tıklamak yerine, siteye doğrudan tarayıcınızdan erişin',
                'İki faktörlü kimlik doğrulamayı etkinleştirin',
                'Farklı siteler için farklı şifreler kullanın',
                'Şüpheli görünen sayfalara giriş bilgilerinizi asla girmeyin'
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<CheckCircleOutlined style={{ color: 'green' }} />} />}
                    description={item}
                  />
                </List.Item>
              )}
            />
            
            <div className="mt-6 flex justify-between">
              <Button onClick={() => setShowExplanation(false)}>
                Simülasyona Geri Dön
              </Button>
              <Link href="/egitimler/phishing-simulasyonu">
                <Button type="primary">
                  Eğitime Devam Et
                </Button>
              </Link>
            </div>
          </Card>
        )}
        
        {/* URL Bilgi Modalı */}
        <Modal 
          title="URL Analizi" 
          open={isModalOpen} 
          onOk={handleOk} 
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Kapat
            </Button>
          ]}
        >
          <Paragraph>
            <Text strong>Şüpheli URL:</Text> <Text code className="text-red-500">http://sosyal-medya-giris.tk/login.php</Text>
          </Paragraph>
          
          <Divider />
          
          <Title level={5}>Güvenlik Problemleri:</Title>
          <List
            size="small"
            dataSource={[
              'HTTP protokolü (HTTPS yerine) - şifreleme yok',
              'Gerçek sosyal medya domaininden farklı bir domain (.tk uzantılı)',
              'Türkçe karakter içeren domain adı (güvenilir siteler genellikle kullanmaz)',
              'login.php uzantısı (meşru sosyal medya platformları genellikle böyle URL yapısı kullanmaz)'
            ]}
            renderItem={(item) => (
              <List.Item>
                <WarningOutlined style={{ color: 'red', marginRight: '8px' }} /> {item}
              </List.Item>
            )}
          />
        </Modal>
      </Space>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, Typography, Button, Alert, Space, List, Avatar, Tabs, Divider, Tag, Modal } from 'antd'
import { MailOutlined, WarningOutlined, LockOutlined, InfoCircleOutlined, CheckCircleOutlined, LinkOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography
const { TabPane } = Tabs

interface PhishingEmailProps {
  id: string
  sender: string
  subject: string
  date: string
  content: React.ReactNode
  indicators: Array<{
    type: 'url' | 'sender' | 'urgency' | 'attachment' | 'grammar' | 'branding'
    description: string
  }>
}

export default function EPostaPhishingPage() {
  const [selectedEmail, setSelectedEmail] = useState<PhishingEmailProps | null>(null)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [analysisCompleted, setAnalysisCompleted] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const phishingEmails: PhishingEmailProps[] = [
    {
      id: 'bank-alert',
      sender: 'banka-guvenlik@secure-banking.co',
      subject: 'ACİL: Hesabınızda şüpheli işlem tespit edildi',
      date: '12 Ekim 2023',
      content: (
        <div>
          <Paragraph>
            <strong>Değerli Müşterimiz,</strong>
          </Paragraph>
          <Paragraph>
            Hesabınızda şüpheli bir etkinlik tespit ettik ve güvenlik nedeniyle hesabınızı geçici olarak kısıtladık. 
            Hesabınızı yeniden etkinleştirmek ve şüpheli işlemleri önlemek için lütfen aşağıdaki bağlantıya tıklayın:
          </Paragraph>
          <Button type="link" danger icon={<LinkOutlined />}>
            Hesabımı Doğrula ve Güvenliği Sağla
          </Button>
          <Paragraph>
            <strong>DİKKAT:</strong> Bu işlemi 24 saat içinde gerçekleştirmezseniz, hesabınız kalıcı olarak askıya alınacaktır.
          </Paragraph>
          <Paragraph>
            Saygılarımızla,<br />
            Banka Güvenlik Ekibi
          </Paragraph>
        </div>
      ),
      indicators: [
        {
          type: 'sender',
          description: 'E-posta adresi resmi banka domain adresine benzemiyor (secure-banking.co)'
        },
        {
          type: 'urgency',
          description: 'Acil eylem gerektiren ve korku uyandıran dil kullanımı ("ACİL", "24 saat içinde")'
        },
        {
          type: 'url',
          description: 'Gizlenmiş URL bağlantısı - gerçek hedef görünmüyor'
        },
        {
          type: 'grammar',
          description: 'Profesyonel olmayan dil ve imla hataları'
        }
      ]
    },
    {
      id: 'password-reset',
      sender: 'noreply@mail-service365.net',
      subject: 'E-posta şifrenizi sıfırlama isteği',
      date: '15 Ekim 2023',
      content: (
        <div>
          <Paragraph>
            Merhaba,
          </Paragraph>
          <Paragraph>
            E-posta hesabınız için bir şifre sıfırlama isteği aldık. Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:
          </Paragraph>
          <Button type="link" danger icon={<LinkOutlined />}>
            Şifremi Sıfırla
          </Button>
          <Paragraph>
            Bu isteği siz yapmadıysanız, lütfen bu e-postayı görmezden gelin.
          </Paragraph>
          <Paragraph>
            E-posta Hizmetleri Ekibi
          </Paragraph>
          <div style={{ fontSize: '10px', color: '#999', marginTop: '20px' }}>
            © 2023 Mail Services Inc. Tüm hakları saklıdır.
          </div>
        </div>
      ),
      indicators: [
        {
          type: 'sender',
          description: 'E-posta adresi "mail-service365.net" domain adını kullanıyor - meşru e-posta servisi değil'
        },
        {
          type: 'branding',
          description: 'Tanınmış e-posta sağlayıcılarının tipik marka öğeleri eksik veya farklı'
        },
        {
          type: 'url',
          description: 'Şifre sıfırlama bağlantısı güvenli bir domain adresine yönlendirmiyor'
        }
      ]
    },
    {
      id: 'prize-winner',
      sender: 'prize-notification@lucky-winners.xyz',
      subject: 'TEBRİKLER! 10.000 TL değerinde çekiliş kazandınız!',
      date: '20 Ekim 2023',
      content: (
        <div>
          <Paragraph>
            <strong style={{ fontSize: '16px', color: 'green' }}>TEBRİKLER!!!</strong>
          </Paragraph>
          <Paragraph>
            E-mail adresiniz rastgele seçim ile büyük ödülümüzü kazanmıştır!!! Sizin için hazırlanmış olan 
            <strong> 10.000 TL</strong> değerindeki ödülü almak için aşağıdaki bağlantıyı tıklayın ve kişisel bilgilerinizi doğrulayın.
          </Paragraph>
          <Button type="primary" danger icon={<LinkOutlined />}>
            ÖDÜLÜMÜ ALMAK İÇİN TIKLAYIN!!!
          </Button>
          <Paragraph>
            NOT: Ödülünüzü talep etmek için hesap bilgilerinizi ve iletişim bilgilerinizi doğrulamanız gerekmektedir.
            Bu fırsat yalnızca 48 saat geçerlidir!
          </Paragraph>
          <Paragraph>
            Çekiliş Ekibi
          </Paragraph>
        </div>
      ),
      indicators: [
        {
          type: 'sender',
          description: 'Güvenilir olmayan domain adı (.xyz uzantısı)'
        },
        {
          type: 'urgency',
          description: 'Aşırı heyecan ve aciliyet bildiren dil ("TEBRİKLER!!!", "yalnızca 48 saat geçerlidir")'
        },
        {
          type: 'grammar',
          description: 'Aşırı ünlem işaretleri, büyük harfler ve profesyonel olmayan yazım tarzı'
        },
        {
          type: 'url',
          description: 'Kişisel ve finansal bilgi isteyen şüpheli bağlantı'
        }
      ]
    }
  ]

  const openEmailDetails = (email: PhishingEmailProps) => {
    setSelectedEmail(email)
    setShowAnalysis(false)
    setAnalysisCompleted(false)
  }

  const handleMarkPhishing = () => {
    setShowAnalysis(true)
    setAnalysisCompleted(true)
  }

  const handleMarkLegitimate = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const closeAnalysis = () => {
    setSelectedEmail(null)
    setShowAnalysis(false)
    setAnalysisCompleted(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Alert
          message="Eğitim Simülasyonu"
          description="Bu sayfa eğitim amaçlı bir phishing e-posta simülasyonudur. Linklere tıklamak güvenlidir, gerçek veri toplanmamaktadır."
          type="warning"
          showIcon
          banner
        />

        <Title level={2}>E-posta Phishing Tanıma Egzersizi</Title>
        <Paragraph>
          Bu egzersizde, çeşitli e-postaları inceleyecek ve hangilerinin phishing olduğunu tespit edeceksiniz.
          Her e-postayı dikkatlice inceleyin ve phishing göstergelerini belirleyin.
        </Paragraph>
        
        {!selectedEmail ? (
          <Card title="Gelen Kutusu">
            <List
              itemLayout="horizontal"
              dataSource={phishingEmails}
              renderItem={(email) => (
                <List.Item
                  actions={[
                    <Button 
                      key="view" 
                      type="primary" 
                      onClick={() => openEmailDetails(email)}
                    >
                      Görüntüle
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<MailOutlined />} style={email.id === 'prize-winner' ? { backgroundColor: 'gold' } : {}} />}
                    title={<div>{email.subject}</div>}
                    description={<div>{email.sender} • {email.date}</div>}
                  />
                </List.Item>
              )}
            />
          </Card>
        ) : (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card
              title={
                <div>
                  <div>{selectedEmail.subject}</div>
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    Kimden: {selectedEmail.sender} • {selectedEmail.date}
                  </div>
                </div>
              }
              extra={
                <Button type="text" onClick={closeAnalysis}>
                  Geri Dön
                </Button>
              }
            >
              <div className="email-content">
                {selectedEmail.content}
              </div>

              {!showAnalysis && (
                <div className="mt-6 flex justify-center space-x-4">
                  <Button 
                    type="primary" 
                    danger 
                    icon={<WarningOutlined />} 
                    onClick={handleMarkPhishing}
                  >
                    Phishing E-posta
                  </Button>
                  <Button 
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={handleMarkLegitimate}
                  >
                    Güvenli E-posta
                  </Button>
                </div>
              )}
            </Card>

            {showAnalysis && (
              <Card title="Phishing Analizi">
                <Alert
                  message="Doğru Tespit!"
                  description="Bu e-posta bir phishing saldırısı örneğidir. Aşağıda bu e-postadaki phishing göstergeleri açıklanmıştır."
                  type="success"
                  showIcon
                  className="mb-6"
                />

                <Title level={4}>Bu E-postadaki Phishing Göstergeleri:</Title>
                
                <List
                  itemLayout="horizontal"
                  dataSource={selectedEmail.indicators}
                  renderItem={(indicator) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar 
                            icon={
                              indicator.type === 'url' ? <LinkOutlined /> : 
                              indicator.type === 'urgency' ? <WarningOutlined /> :
                              indicator.type === 'sender' ? <MailOutlined /> :
                              <InfoCircleOutlined />
                            } 
                            style={{ backgroundColor: '#ff4d4f' }}
                          />
                        }
                        title={
                          <Tag color={
                            indicator.type === 'url' ? 'red' : 
                            indicator.type === 'urgency' ? 'orange' :
                            indicator.type === 'sender' ? 'purple' :
                            indicator.type === 'grammar' ? 'blue' :
                            'gold'
                          }>
                            {indicator.type === 'url' ? 'Şüpheli URL' : 
                             indicator.type === 'urgency' ? 'Aciliyet/Tehdit' :
                             indicator.type === 'sender' ? 'Şüpheli Gönderici' :
                             indicator.type === 'grammar' ? 'Dil/İmla Hataları' :
                             indicator.type === 'attachment' ? 'Şüpheli Ek' :
                             'Marka Sorunları'}
                          </Tag>
                        }
                        description={indicator.description}
                      />
                    </List.Item>
                  )}
                />

                <Divider />

                <Title level={4}>Korunma Yöntemleri:</Title>
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    'Gönderici adresini her zaman kontrol edin - özellikle domaine dikkat edin',
                    'Bağlantılara tıklamadan önce üzerine gelerek hedef URL\'yi görün',
                    'Acil eylem gerektiren, korku veya heyecan uyandıran dil kullanımına karşı dikkatli olun',
                    'Kişisel veya finansal bilgi isteyen e-postalara şüpheyle yaklaşın',
                    'Şüpheli dosya eklerini açmayın veya indirmeyin',
                    'Şüphelendiğiniz e-postaları spam olarak işaretleyin ve silin'
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<CheckCircleOutlined />} style={{ backgroundColor: 'green' }} />}
                        description={item}
                      />
                    </List.Item>
                  )}
                />
                
                <div className="mt-6 flex justify-between">
                  <Button onClick={closeAnalysis}>
                    Geri Dön
                  </Button>
                  <Link href="/egitimler/phishing-simulasyonu">
                    <Button type="primary">
                      Eğitime Devam Et
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </Space>
        )}
        
        <Modal
          title="Yanlış Tespit"
          open={modalVisible}
          onOk={closeModal}
          onCancel={closeModal}
          footer={[
            <Button key="back" type="primary" onClick={closeModal}>
              Tekrar Dene
            </Button>
          ]}
        >
          <Alert
            message="Bu bir phishing e-postasıdır!"
            description="Bu e-postayı güvenli olarak işaretlediniz, ancak aslında bir phishing saldırısıdır. Lütfen e-posta içeriğini daha dikkatli inceleyin."
            type="error"
            showIcon
          />
          <Divider />
          <Paragraph>
            Aşağıdaki ipuçlarına dikkat edin:
          </Paragraph>
          <List
            size="small"
            dataSource={[
              'Gönderici adresi (domain adı)',
              'Aciliyet bildiren dil ve ton',
              'Kişisel/finansal bilgi talepleri',
              'Profesyonel olmayan görünüm ve yazım hataları'
            ]}
            renderItem={(item) => (
              <List.Item>
                <InfoCircleOutlined style={{ color: 'red', marginRight: '8px' }} /> {item}
              </List.Item>
            )}
          />
        </Modal>
      </Space>
    </div>
  )
} 
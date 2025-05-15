'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, Typography, Steps, Button, Alert, Space, Divider } from 'antd'

const { Title, Paragraph, Text } = Typography
const { Step } = Steps

export default function PhishingSimulasyonPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const phishingScenarios = [
    {
      id: 'sosyal-medya',
      title: 'Sosyal Medya Girişi',
      path: '/egitimler/phishing-simulasyonu/sosyal-medya'
    },
    {
      id: 'e-posta',
      title: 'E-posta Servisi',
      path: '/egitimler/phishing-simulasyonu/e-posta'
    },
    {
      id: 'banka',
      title: 'Online Bankacılık',
      path: '/egitimler/phishing-simulasyonu/banka'
    },
    {
      id: 'e-ticaret',
      title: 'E-ticaret Platformu',
      path: '/egitimler/phishing-simulasyonu/e-ticaret'
    },
    {
      id: 'quiz',
      title: 'Bilgi Testi',
      path: '/egitimler/phishing-simulasyonu/quiz'
    }
  ]

  const next = () => {
    setCurrentStep(currentStep + 1)
  }

  const prev = () => {
    setCurrentStep(currentStep - 1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Alert
          message="Eğitim Amaçlı İçerik"
          description="Bu modül tamamen eğitim ve farkındalık amacıyla hazırlanmıştır. Gerçek hayattaki zararlı phishing sitelerini tanımanıza yardımcı olacak simülasyonlar içerir. Hiçbir kişisel veri toplanmamaktadır."
          type="info"
          showIcon
          banner
        />
        
        <Title level={1}>Phishing Simülasyonu Eğitim Modülü</Title>
        
        <Paragraph>
          Bu eğitim modülü, phishing (oltalama) saldırılarını tanımanıza ve bu tür saldırılardan korunmanıza yardımcı olmak için tasarlanmıştır. 
          Modül boyunca gerçekçi phishing sayfaları görecek, bu sayfalardaki güvenlik zafiyetlerini tespit etmeyi öğrenecek ve kendinizi korumak için en iyi uygulamaları keşfedeceksiniz.
        </Paragraph>
        
        <Alert
          message="Etik Bilgilendirme"
          description="Bu eğitim modülü, etik hackerlik ve bilgi güvenliği farkındalığı kapsamında hazırlanmıştır. Öğrendiğiniz bilgileri yalnızca yasal ve etik sınırlar içerisinde kullanınız."
          type="warning"
          showIcon
        />
        
        <Divider />
        
        <Title level={2}>Eğitim İçeriği</Title>
        
        <Steps current={currentStep} onChange={setCurrentStep} direction="vertical">
          {phishingScenarios.map((scenario) => (
            <Step 
              key={scenario.id} 
              title={scenario.title} 
              description={
                scenario.id === 'quiz' 
                  ? "Öğrendiklerinizi test edin" 
                  : "Gerçekçi bir phishing simülasyonu"
              } 
            />
          ))}
        </Steps>
        
        <div className="steps-content">
          <Card title={phishingScenarios[currentStep].title}>
            <Paragraph>
              {currentStep < 4 
                ? "Bu senaryoda gerçekçi bir phishing sayfası görecek ve güvenlik zafiyetlerini nasıl tespit edeceğinizi öğreneceksiniz."
                : "Öğrendiklerinizi test etmek için kısa bir quiz çözeceksiniz."}
            </Paragraph>
            <div className="mt-4">
              <Link href={phishingScenarios[currentStep].path}>
                <Button type="primary">Başla</Button>
              </Link>
            </div>
          </Card>
        </div>
        
        <div className="steps-action">
          {currentStep > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Geri
            </Button>
          )}
          {currentStep < phishingScenarios.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              İleri
            </Button>
          )}
        </div>
      </Space>
    </div>
  )
} 
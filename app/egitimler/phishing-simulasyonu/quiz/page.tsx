'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, Typography, Button, Alert, Space, Steps, Radio, Checkbox, Progress, Divider, Result } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, QuestionCircleOutlined, TrophyOutlined, SafetyOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography
const { Step } = Steps

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number | number[]
  explanation: string
  type: 'single' | 'multiple'
}

export default function PhishingQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | number[])[]>([])
  const [selectedOption, setSelectedOption] = useState<number | number[]>(-1)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: 'Aşağıdaki URL adreslerinden hangisi potansiyel bir phishing sayfasını işaret eder?',
      options: [
        'https://www.bankacilik.com/giris',
        'http://bankam-online.co/giris.php',
        'https://bankacilik.com/login',
        'https://online.bankacilik.com/giris'
      ],
      correctAnswer: 1,
      explanation: 'Phishing URL\'leri genellikle HTTP kullanır (HTTPS yerine), .co, .tk, .xyz gibi daha az güvenilir uzantılar içerebilir ve orijinal domain adlarına benzer ama farklı adlar kullanır (bankam-online vs gerçek banka adı). Ayrıca .php gibi uzantılar da şüpheli olabilir.',
      type: 'single'
    },
    {
      id: 2,
      question: 'E-postada aşağıdaki özelliklerden hangilerini görürseniz phishing olabilir? (Birden fazla seçenek işaretleyebilirsiniz)',
      options: [
        'Acil işlem yapmanızı isteyen ifadeler ("24 saat içinde", "HEMEN")',
        'Şirketin kurumsal iletişim bilgileri ve iletişim adresi',
        'Kişisel veya finansal bilgilerinizi isteme',
        'Yazım ve dilbilgisi hataları'
      ],
      correctAnswer: [0, 2, 3],
      explanation: 'Phishing e-postaları genellikle aciliyet hissi yaratmaya çalışır, kişisel/finansal bilgilerinizi ister ve profesyonel olmayan dil/yazım hataları içerir. Meşru şirketler genellikle e-postalarında iletişim bilgilerini ve adreslerini belirtir.',
      type: 'multiple'
    },
    {
      id: 3,
      question: 'Bir web sitesinin güvenli olduğunu gösteren aşağıdaki işaretlerden hangisi YANLIŞTIR?',
      options: [
        'Adres çubuğunda HTTPS protokolü',
        'URL\'de tanınmış marka adı',
        'Adres çubuğunda kilit simgesi',
        'Web sitesinin çok fazla indirim veya hediye vaat etmesi'
      ],
      correctAnswer: 3,
      explanation: 'Aşırı indirim, hediye, kazanç vaat eden siteler genellikle phishing olabilir. HTTPS protokolü, kilit simgesi ve tanınmış marka adı güvenlik işaretleridir, ancak tek başına yeterli değildir - domain adının doğru olduğundan da emin olmalısınız.',
      type: 'single'
    },
    {
      id: 4,
      question: 'Phishing saldırılarına karşı aşağıdaki önlemlerden hangisi en etkilidir?',
      options: [
        'Virüs programını yılda bir kez güncellemek',
        'İki faktörlü kimlik doğrulama (2FA) kullanmak',
        'Tüm e-postaları spam klasörüne göndermek',
        'Aynı şifreyi tüm hesaplarınızda kullanmak'
      ],
      correctAnswer: 1,
      explanation: 'İki faktörlü kimlik doğrulama (2FA), şifreniz ele geçirilse bile hesabınıza erişimi engelleyen ek bir güvenlik katmanı sağlar. Bu, phishing saldırılarının başarı oranını büyük ölçüde azaltır.',
      type: 'single'
    },
    {
      id: 5,
      question: 'Phishing e-postaları tespit etmek için aşağıdakilerden hangilerini kontrol etmelisiniz? (Birden fazla seçenek işaretleyebilirsiniz)',
      options: [
        'Gönderici adresi ve domain adı',
        'URL bağlantılarının hedefleri',
        'Dilin tonu ve aciliyet ifadeleri',
        'Yazım ve dilbilgisi hataları'
      ],
      correctAnswer: [0, 1, 2, 3],
      explanation: 'Tüm bu faktörler phishing e-postalarını tespit etmek için önemlidir. Gönderici adresini, URL\'lerin nereye yönlendirdiğini, acil eylem çağrılarını ve profesyonel olmayan dil kullanımını her zaman kontrol etmelisiniz.',
      type: 'multiple'
    }
  ]

  const handleRadioChange = (e: RadioChangeEvent) => {
    setSelectedOption(Number(e.target.value))
  }

  const handleCheckboxChange = (checkedValues: number[]) => {
    setSelectedOption(checkedValues)
  }

  const handleSubmitAnswer = () => {
    if (selectedOption === -1 || (Array.isArray(selectedOption) && selectedOption.length === 0)) {
      return // Seçim yapılmadıysa bir şey yapma
    }

    const question = questions[currentQuestion]
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedOption
    setAnswers(newAnswers)
    
    // Doğru cevap kontrolü
    let isCorrect = false
    if (question.type === 'single') {
      isCorrect = selectedOption === question.correctAnswer
    } else {
      // Çoklu seçim için karşılaştırma
      const selectedArray = selectedOption as number[]
      const correctArray = question.correctAnswer as number[]
      
      isCorrect = 
        selectedArray.length === correctArray.length && 
        selectedArray.every(val => correctArray.includes(val))
    }

    if (isCorrect) {
      setScore(prevScore => prevScore + 1)
    }

    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    setSelectedOption(-1)
    setShowExplanation(false)
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedOption(-1)
    setShowExplanation(false)
    setQuizCompleted(false)
    setScore(0)
  }

  const renderQuizContent = () => {
    if (quizCompleted) {
      const percentage = Math.round((score / questions.length) * 100)
      let feedbackMessage = ""
      let feedbackColor = ""
      
      if (percentage >= 80) {
        feedbackMessage = "Tebrikler! Phishing farkındalığınız çok yüksek."
        feedbackColor = "success"
      } else if (percentage >= 60) {
        feedbackMessage = "İyi iş! Temel phishing bilgisine sahipsiniz ancak biraz daha pratik yapabilirsiniz."
        feedbackColor = "warning"
      } else {
        feedbackMessage = "Daha fazla pratik yapmanız gerekiyor. Eğitim modüllerini tekrar gözden geçirin."
        feedbackColor = "error"
      }
      
      return (
        <Result
          icon={<TrophyOutlined />}
          title="Quiz Tamamlandı!"
          subTitle={feedbackMessage}
          extra={[
            <div key="score" className="text-center mb-6">
              <Progress 
                type="circle" 
                percent={percentage} 
                format={() => `${score}/${questions.length}`}
                status={feedbackColor as any}
              />
            </div>,
            <div key="buttons" className="flex justify-center space-x-4">
              <Button type="primary" onClick={resetQuiz}>
                Testi Tekrarla
              </Button>
              <Link href="/egitimler/phishing-simulasyonu">
                <Button>Eğitime Dön</Button>
              </Link>
            </div>
          ]}
        >
          <div className="mt-6">
            <Title level={4}>Phishing'e Karşı Korunma Önerileri:</Title>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-5 space-y-2">
                <li>Şüpheli e-postaları açmayın ve bunlardaki bağlantılara tıklamayın.</li>
                <li>URL adreslerini her zaman kontrol edin - tarayıcı adres çubuğundaki adresin doğru olduğundan emin olun.</li>
                <li>İki faktörlü kimlik doğrulama (2FA) kullanın.</li>
                <li>Şifrelerinizi düzenli olarak değiştirin ve farklı siteler için farklı şifreler kullanın.</li>
                <li>Güvenlik yazılımlarınızı güncel tutun.</li>
                <li>İndirdiğiniz dosyaları ve e-posta eklerini açmadan önce tarayın.</li>
                <li>Kişisel ve finansal bilgilerinizi e-posta üzerinden paylaşmaktan kaçının.</li>
                <li>Şüpheli e-postaları spam olarak işaretleyin ve silin.</li>
              </ul>
            </div>
          </div>
        </Result>
      )
    }

    const question = questions[currentQuestion]
    
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <Text>{`Soru ${currentQuestion + 1}/${questions.length}`}</Text>
          <Progress
            percent={Math.round(((currentQuestion) / questions.length) * 100)}
            size="small"
            showInfo={false}
            style={{ width: '60%' }}
          />
        </div>
        
        <Card title={question.question}>
          {question.type === 'single' ? (
            <Radio.Group 
              onChange={handleRadioChange} 
              value={selectedOption}
              disabled={showExplanation}
              className="w-full"
            >
              <Space direction="vertical" className="w-full">
                {question.options.map((option, index) => (
                  <Radio key={index} value={index} className="w-full py-2">
                    {option}
                    {showExplanation && index === question.correctAnswer && (
                      <CheckCircleOutlined className="ml-2 text-green-500" />
                    )}
                    {showExplanation && 
                      index !== question.correctAnswer && 
                      index === selectedOption && (
                      <CloseCircleOutlined className="ml-2 text-red-500" />
                    )}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          ) : (
            <Checkbox.Group 
              onChange={handleCheckboxChange} 
              value={Array.isArray(selectedOption) ? selectedOption : []}
              disabled={showExplanation}
              className="w-full"
            >
              <Space direction="vertical" className="w-full">
                {question.options.map((option, index) => {
                  const correctAnswerArray = question.correctAnswer as number[]
                  const isCorrect = correctAnswerArray.includes(index)
                  const isSelected = Array.isArray(selectedOption) && selectedOption.includes(index)
                  
                  return (
                    <Checkbox key={index} value={index} className="w-full py-2">
                      {option}
                      {showExplanation && isCorrect && (
                        <CheckCircleOutlined className="ml-2 text-green-500" />
                      )}
                      {showExplanation && !isCorrect && isSelected && (
                        <CloseCircleOutlined className="ml-2 text-red-500" />
                      )}
                    </Checkbox>
                  )
                })}
              </Space>
            </Checkbox.Group>
          )}
          
          {showExplanation && (
            <div className="mt-4">
              <Alert
                message="Açıklama"
                description={question.explanation}
                type="info"
                showIcon
              />
            </div>
          )}
          
          <div className="mt-6 flex justify-end">
            {!showExplanation ? (
              <Button 
                type="primary" 
                onClick={handleSubmitAnswer}
                disabled={selectedOption === -1 || (Array.isArray(selectedOption) && selectedOption.length === 0)}
              >
                Cevabı Kontrol Et
              </Button>
            ) : (
              <Button 
                type="primary" 
                onClick={handleNextQuestion}
              >
                {currentQuestion < questions.length - 1 ? 'Sonraki Soru' : 'Sonuçları Gör'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Alert
          message="Phishing Bilgi Testi"
          description="Bu test, phishing saldırıları hakkındaki bilginizi ölçmek için tasarlanmıştır. Her soruyu dikkatlice okuyun ve en uygun cevabı seçin."
          type="info"
          showIcon
          banner
          icon={<SafetyOutlined />}
        />
        
        <Title level={2}>Phishing Farkındalık Testi</Title>
        
        {renderQuizContent()}
      </Space>
    </div>
  )
} 
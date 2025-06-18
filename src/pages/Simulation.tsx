
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Mail, AlertTriangle, CheckCircle, XCircle, Zap } from 'lucide-react';

const Simulation = () => {
  const { t } = useLanguage();
  const [currentEmail, setCurrentEmail] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const phishingEmails = [
    {
      id: 1,
      from: "security@paypaI.com",
      subject: "¡URGENTE! Tu cuenta será suspendida",
      content: "Estimado usuario, detectamos actividad sospechosa en tu cuenta. Haz clic aquí para verificar: http://paypaI-security.com/verify",
      isPhishing: true,
      indicators: ["Dominio falso (PaypaI en lugar de PayPal)", "Urgencia falsa", "URL sospechosa", "Solicita información personal"]
    },
    {
      id: 2,
      from: "noreply@amazon.com",
      subject: "Confirmación de tu pedido #AMZ-123456",
      content: "Gracias por tu compra. Tu pedido será enviado en 2-3 días laborables. Puedes rastrear tu pedido en tu cuenta de Amazon.",
      isPhishing: false,
      indicators: ["Dominio legítimo", "No solicita información personal", "Información coherente"]
    },
    {
      id: 3,
      from: "admin@tu-banco.com",
      subject: "Tu tarjeta ha sido bloqueada temporalmente",
      content: "Por tu seguridad, hemos bloqueado tu tarjeta. Para desbloquearla, ingresa tus datos en: www.banco-verificacion.net/unlock",
      isPhishing: true,
      indicators: ["Dominio genérico sospechoso", "URL externa no oficial", "Solicita datos sensibles", "Urgencia artificial"]
    }
  ];

  const currentEmailData = phishingEmails[currentEmail];

  const handleAnswer = (userAnswer: boolean) => {
    const isCorrect = userAnswer === currentEmailData.isPhishing;
    setAttempts(attempts + 1);
    
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "¡Correcto!",
        description: isCorrect ? "Has identificado correctamente este email." : "Bien hecho identificando este email legítimo.",
        variant: "default"
      });
    } else {
      toast({
        title: "Incorrecto",
        description: `Este email ${currentEmailData.isPhishing ? 'ES' : 'NO ES'} phishing. Revisa los indicadores.`,
        variant: "destructive"
      });
    }

    // Move to next email or restart
    setTimeout(() => {
      if (currentEmail < phishingEmails.length - 1) {
        setCurrentEmail(currentEmail + 1);
      } else {
        setCurrentEmail(0);
      }
    }, 2000);
  };

  const resetSimulation = () => {
    setCurrentEmail(0);
    setScore(0);
    setAttempts(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            {t('sim.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {t('sim.subtitle')}
          </p>
          
          {/* Score */}
          <div className="flex justify-center items-center gap-6 mb-8">
            <Badge variant="outline" className="text-lg px-4 py-2 bg-green-50 border-green-200">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Correctas: {score}
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2 bg-blue-50 border-blue-200">
              <Zap className="h-5 w-5 mr-2 text-blue-600" />
              Intentos: {attempts}
            </Badge>
            <Button onClick={resetSimulation} variant="outline" size="sm">
              Reiniciar
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Email Simulation */}
          <Card className="animate-scale-in shadow-xl">
            <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="h-6 w-6 text-gray-600" />
                <CardTitle className="text-lg">
                  {t('sim.email')} #{currentEmailData.id}
                </CardTitle>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="font-semibold text-gray-600 w-16">De:</span>
                  <span className="text-gray-800">{currentEmailData.from}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-600 w-16">Asunto:</span>
                  <span className="text-gray-800">{currentEmailData.subject}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="bg-white border rounded-lg p-4 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {currentEmailData.content}
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-800 mb-4">
                  ¿Este email es phishing?
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={() => handleAnswer(false)}
                    variant="outline"
                    size="lg"
                    className="bg-green-50 border-green-200 hover:bg-green-100 text-green-700 font-semibold"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    {t('sim.legitimate')}
                  </Button>
                  <Button
                    onClick={() => handleAnswer(true)}
                    variant="outline"
                    size="lg"
                    className="bg-red-50 border-red-200 hover:bg-red-100 text-red-700 font-semibold"
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    {t('sim.phishing')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Indicators Panel */}
          <Card className="animate-scale-in shadow-xl" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                Indicadores de Análisis
              </CardTitle>
              <CardDescription>
                Revisa estos puntos para identificar phishing
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {currentEmailData.indicators.map((indicator, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg animate-fade-in"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      currentEmailData.isPhishing ? 'bg-red-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-gray-700">{indicator}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Consejo:</h4>
                <p className="text-blue-700 text-sm">
                  {currentEmailData.isPhishing 
                    ? "Los atacantes suelen usar urgencia falsa y dominios similares a los originales. Siempre verifica la URL antes de hacer clic."
                    : "Los emails legítimos suelen venir de dominios oficiales y no solicitan información sensible por email."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress indicator */}
        <div className="mt-12 text-center animate-fade-in">
          <div className="flex justify-center gap-2 mb-4">
            {phishingEmails.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentEmail 
                    ? 'bg-blue-600 scale-125' 
                    : index < currentEmail 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
          <p className="text-gray-600">
            Email {currentEmail + 1} de {phishingEmails.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Simulation;

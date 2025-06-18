
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Mail, AlertTriangle, CheckCircle, XCircle, Zap, Target, Shield, Eye, Code, Wifi, CreditCard, Phone } from 'lucide-react';

const Simulation = () => {
  const { t } = useLanguage();
  const [currentEmail, setCurrentEmail] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [hackingAnimation, setHackingAnimation] = useState(false);

  const levels = {
    beginner: { name: 'Principiante', color: 'bg-green-500', icon: Shield },
    intermediate: { name: 'Intermedio', color: 'bg-yellow-500', icon: Eye },
    advanced: { name: 'Avanzado', color: 'bg-red-500', icon: Target },
    expert: { name: 'Experto', color: 'bg-purple-500', icon: Code }
  };

  const phishingEmails = {
    beginner: [
      {
        id: 1,
        platform: "PayPal",
        from: "security@paypaI.com",
        subject: "¡URGENTE! Tu cuenta será suspendida",
        content: "Estimado usuario, detectamos actividad sospechosa en tu cuenta. Haz clic aquí para verificar: http://paypaI-security.com/verify",
        isPhishing: true,
        indicators: ["Dominio falso (PaypaI en lugar de PayPal)", "Urgencia falsa", "URL sospechosa", "Solicita información personal"],
        icon: CreditCard,
        difficulty: 1
      },
      {
        id: 2,
        platform: "Amazon",
        from: "noreply@amazon.com",
        subject: "Confirmación de tu pedido #AMZ-123456",
        content: "Gracias por tu compra. Tu pedido será enviado en 2-3 días laborables. Puedes rastrear tu pedido en tu cuenta de Amazon.",
        isPhishing: false,
        indicators: ["Dominio legítimo", "No solicita información personal", "Información coherente"],
        icon: Mail,
        difficulty: 1
      }
    ],
    intermediate: [
      {
        id: 3,
        platform: "WhatsApp",
        from: "noreply@whatsapp.com",
        subject: "Tu WhatsApp será desactivado",
        content: "Hola, tu cuenta de WhatsApp será desactivada por violar nuestros términos. Verifica tu número aquí: whatsapp-verify.net/check",
        isPhishing: true,
        indicators: ["Dominio no oficial", "Amenaza de desactivación", "URL externa sospechosa", "No menciona información específica"],
        icon: Phone,
        difficulty: 2
      },
      {
        id: 4,
        platform: "Netflix",
        from: "billing@netflix.com",
        subject: "Problema con tu método de pago",
        content: "Tu suscripción será cancelada porque tu tarjeta fue rechazada. Actualiza tu información de pago en: netflix-billing.secure-payment.com",
        isPhishing: true,
        indicators: ["Subdominio sospechoso", "Urgencia sobre pagos", "URL no oficial", "Solicita datos financieros"],
        icon: CreditCard,
        difficulty: 2
      }
    ],
    advanced: [
      {
        id: 5,
        platform: "Banco Santander",
        from: "alertas@santander.com.mx",
        subject: "Transferencia pendiente de autorización",
        content: "Se detectó una transferencia de $15,000 MXN desde tu cuenta. Si no la autorizaste, cancélala aquí: santander.com.mx.security-check.com/cancel",
        isPhishing: true,
        indicators: ["Dominio muy similar al real", "Causa pánico con montos altos", "URL con subdominio engañoso", "Presión temporal"],
        icon: CreditCard,
        difficulty: 3
      },
      {
        id: 6,
        platform: "Microsoft Teams",
        from: "teams-noreply@microsoft.com",
        subject: "Invitación a reunión urgente",
        content: "Te han invitado a una reunión urgente sobre el proyecto. Únete aquí: teams.microsoft.com/join/AbCd123 - Código: 987654",
        isPhishing: false,
        indicators: ["Dominio oficial", "Formato típico de Teams", "Código de reunión válido", "No solicita credenciales"],
        icon: Wifi,
        difficulty: 3
      }
    ],
    expert: [
      {
        id: 7,
        platform: "GitHub",
        from: "security@github.com",
        subject: "Acceso no autorizado detectado desde nueva ubicación",
        content: "Detectamos un inicio de sesión desde Moscú, Rusia. Si fuiste tú, ignora este mensaje. Si no, asegura tu cuenta: github.com/security/verify-location?token=gh_1234567890abcdef",
        isPhishing: true,
        indicators: ["URL con parámetro sospechoso", "Token falso", "Geolocalización para crear urgencia", "Solicita verificación inmediata"],
        icon: Code,
        difficulty: 4
      },
      {
        id: 8,
        platform: "Google",
        from: "no-reply@accounts.google.com",
        subject: "Verificación de seguridad requerida",
        content: "Por tu seguridad, necesitamos verificar tu identidad. Completa la verificación en: accounts.google.com/signin/v2/challenge/pwd",
        isPhishing: false,
        indicators: ["Dominio oficial de Google", "URL de verificación legítima", "Formato estándar de Google", "No presiona con urgencia extrema"],
        icon: Shield,
        difficulty: 4
      }
    ]
  };

  const currentLevelEmails = phishingEmails[selectedLevel as keyof typeof phishingEmails];
  const currentEmailData = currentLevelEmails[currentEmail % currentLevelEmails.length];

  const triggerHackingAnimation = () => {
    setHackingAnimation(true);
    setTimeout(() => setHackingAnimation(false), 1500);
  };

  const handleAnswer = (userAnswer: boolean) => {
    const isCorrect = userAnswer === currentEmailData.isPhishing;
    setAttempts(attempts + 1);
    
    if (isCorrect) {
      setScore(score + currentEmailData.difficulty);
      triggerHackingAnimation();
      toast({
        title: "¡Correcto! 🎯",
        description: `+${currentEmailData.difficulty} puntos. ${isCorrect ? 'Phishing detectado' : 'Email legítimo identificado'} correctamente.`,
        variant: "default"
      });
    } else {
      toast({
        title: "Incorrecto ❌",
        description: `Este email ${currentEmailData.isPhishing ? 'ES' : 'NO ES'} phishing. Revisa los indicadores.`,
        variant: "destructive"
      });
    }

    setTimeout(() => {
      if (currentEmail < currentLevelEmails.length - 1) {
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

  const changeLevel = (level: string) => {
    setSelectedLevel(level);
    setCurrentEmail(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 relative overflow-hidden">
      {/* Matrix-style background animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(0,255,0,0.1)_25px,rgba(0,255,0,0.1)_26px,transparent_27px)] bg-[length:25px_25px] animate-pulse"></div>
      </div>
      
      {/* Hacking animation overlay */}
      {hackingAnimation && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-green-500/20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-400 text-6xl font-mono animate-bounce">
            ACCESS GRANTED
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 font-mono">
            &gt; PHISHING_SIMULATION.EXE
          </h1>
          <p className="text-xl text-green-400 mb-6 font-mono">
            [SISTEMA DE ENTRENAMIENTO ACTIVO]
          </p>
          
          {/* Level Selection */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {Object.entries(levels).map(([key, level]) => {
              const IconComponent = level.icon;
              return (
                <Button
                  key={key}
                  onClick={() => changeLevel(key)}
                  variant={selectedLevel === key ? "default" : "outline"}
                  className={`gap-2 ${selectedLevel === key ? level.color : 'border-green-400 text-green-400 hover:bg-green-400/10'} transition-all duration-300 transform hover:scale-105`}
                >
                  <IconComponent className="h-4 w-4" />
                  {level.name}
                </Button>
              );
            })}
          </div>
          
          {/* Score */}
          <div className="flex justify-center items-center gap-6 mb-8">
            <Badge variant="outline" className="text-lg px-4 py-2 bg-green-900/50 border-green-400 text-green-400 font-mono">
              <CheckCircle className="h-5 w-5 mr-2" />
              SCORE: {score}
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2 bg-blue-900/50 border-blue-400 text-blue-400 font-mono">
              <Zap className="h-5 w-5 mr-2" />
              ATTEMPTS: {attempts}
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2 bg-purple-900/50 border-purple-400 text-purple-400 font-mono">
              <Target className="h-5 w-5 mr-2" />
              LEVEL: {levels[selectedLevel as keyof typeof levels].name}
            </Badge>
            <Button onClick={resetSimulation} variant="outline" size="sm" className="border-red-400 text-red-400 hover:bg-red-400/10">
              RESET
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Email Simulation */}
          <Card className="animate-scale-in shadow-2xl bg-slate-800/50 border-green-400/30 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-b border-green-400/30">
              <div className="flex items-center gap-3 mb-3">
                {React.createElement(currentEmailData.icon, { className: "h-6 w-6 text-green-400" })}
                <CardTitle className="text-lg text-green-400 font-mono">
                  [{currentEmailData.platform}] EMAIL #{currentEmailData.id}
                </CardTitle>
                <Badge className={`${levels[selectedLevel as keyof typeof levels].color} text-white font-mono`}>
                  DIFF: {currentEmailData.difficulty}/4
                </Badge>
              </div>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex">
                  <span className="font-semibold text-green-400 w-16">FROM:</span>
                  <span className="text-green-300">{currentEmailData.from}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-green-400 w-16">SUBJ:</span>
                  <span className="text-green-300">{currentEmailData.subject}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 bg-slate-900/30">
              <div className="bg-slate-800/50 border border-green-400/20 rounded-lg p-4 mb-6 font-mono">
                <p className="text-green-200 leading-relaxed">
                  {currentEmailData.content}
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-lg font-semibold text-green-400 mb-4 font-mono">
                  &gt; ANALYZE_EMAIL: IS_PHISHING?
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={() => handleAnswer(false)}
                    variant="outline"
                    size="lg"
                    className="bg-green-900/30 border-green-400 hover:bg-green-400/20 text-green-400 font-semibold font-mono transform hover:scale-105 transition-all duration-200"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    LEGITIMATE
                  </Button>
                  <Button
                    onClick={() => handleAnswer(true)}
                    variant="outline"
                    size="lg"
                    className="bg-red-900/30 border-red-400 hover:bg-red-400/20 text-red-400 font-semibold font-mono transform hover:scale-105 transition-all duration-200"
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    PHISHING
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Panel */}
          <Card className="animate-scale-in shadow-2xl bg-slate-800/50 border-red-400/30 backdrop-blur-sm" style={{animationDelay: '0.2s'}}>
            <CardHeader className="border-b border-red-400/30">
              <CardTitle className="flex items-center gap-2 text-red-400 font-mono">
                <AlertTriangle className="h-6 w-6" />
                &gt; THREAT_ANALYSIS.LOG
              </CardTitle>
              <CardDescription className="text-red-300 font-mono">
                [SCANNING FOR MALICIOUS INDICATORS...]
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6 bg-slate-900/30">
              <div className="space-y-4">
                {currentEmailData.indicators.map((indicator, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg animate-fade-in border border-amber-400/20"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      currentEmailData.isPhishing ? 'bg-red-500 animate-pulse' : 'bg-green-500'
                    }`}></div>
                    <span className="text-amber-200 font-mono text-sm">[{index + 1}] {indicator}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-cyan-400/30">
                <h4 className="font-semibold text-cyan-400 mb-2 font-mono">&gt; SECURITY_TIP:</h4>
                <p className="text-cyan-200 text-sm font-mono">
                  {currentEmailData.isPhishing 
                    ? `[THREAT_LEVEL: HIGH] Atacantes del nivel ${selectedLevel} usan técnicas sofisticadas. Verifica siempre la URL completa y busca inconsistencias sutiles.`
                    : `[THREAT_LEVEL: LOW] Email legítimo detectado. Mantén siempre la guardia alta, incluso con mensajes que parecen oficiales.`
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress indicator */}
        <div className="mt-12 text-center animate-fade-in">
          <div className="flex justify-center gap-2 mb-4">
            {currentLevelEmails.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentEmail % currentLevelEmails.length
                    ? 'bg-green-400 scale-125 animate-pulse' 
                    : index < currentEmail % currentLevelEmails.length
                      ? 'bg-green-500' 
                      : 'bg-slate-600'
                }`}
              ></div>
            ))}
          </div>
          <p className="text-green-400 font-mono">
            &gt; EMAIL {(currentEmail % currentLevelEmails.length) + 1}/{currentLevelEmails.length} | LEVEL: {levels[selectedLevel as keyof typeof levels].name.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Simulation;

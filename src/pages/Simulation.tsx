import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Mail, AlertTriangle, CheckCircle, XCircle, Zap, Target, Shield, Eye, Code, Wifi, CreditCard, Phone, Building, Globe, Lock, ShoppingCart, University, Truck, MessageSquare } from 'lucide-react';

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
        subject: "Confirmación requerida - Actividad inusual detectada",
        content: "Estimado usuario,\n\nHemos detectado actividad inusual en su cuenta de PayPal. Por su seguridad, hemos limitado temporalmente el acceso a su cuenta.\n\nPara restaurar el acceso completo, por favor verifique su identidad haciendo clic en el siguiente enlace:\n\nhttp://paypaI-security.com/verify-account\n\nSi no completa esta verificación en las próximas 24 horas, su cuenta será suspendida permanentemente.\n\nGracias por su comprensión,\nEquipo de Seguridad de PayPal",
        isPhishing: true,
        indicators: ["Dominio falso (PaypaI con I mayúscula en lugar de l)", "Urgencia artificial (24 horas)", "URL sospechosa no oficial", "Amenaza de suspensión permanente", "Solicita verificación por enlace externo"],
        icon: CreditCard,
        difficulty: 1
      },
      {
        id: 2,
        platform: "Amazon",
        from: "auto-confirm@amazon.com",
        subject: "Tu pedido ha sido confirmado - Número de orden #112-7840291-1234567",
        content: "Hola,\n\nGracias por tu pedido en Amazon.\n\nDetalles del pedido:\n- iPhone 14 Pro Max 256GB - $1,299.00\n- Fecha estimada de entrega: 3-5 días laborables\n- Dirección de envío: Tu dirección registrada\n\nPuedes rastrear tu pedido iniciando sesión en tu cuenta de Amazon o usando nuestra aplicación móvil.\n\nSi no realizaste este pedido, contacta inmediatamente nuestro servicio al cliente.\n\nGracias por elegir Amazon.",
        isPhishing: false,
        indicators: ["Dominio oficial de Amazon", "Número de orden realista", "No solicita información personal", "Formato estándar de confirmación", "No hay urgencia artificial"],
        icon: ShoppingCart,
        difficulty: 1
      },
      {
        id: 3,
        platform: "Gmail",
        from: "noreply@gmail.com",
        subject: "¡ALERTA! Tu cuenta Gmail será eliminada",
        content: "ATENCIÓN USUARIO DE GMAIL:\n\nTu cuenta de correo será ELIMINADA en 48 horas por falta de verificación.\n\nPara evitar la eliminación permanente de todos tus correos, contactos y archivos, debes verificar tu cuenta INMEDIATAMENTE.\n\nHaz clic aquí para verificar: gmail-verification.secure-login.net\n\nCódigo de verificación: GM78291\n\nEste proceso es OBLIGATORIO y URGENTE.\n\nGoogle Security Team",
        isPhishing: true,
        indicators: ["Dominio falso (no es de Google)", "Urgencia extrema artificial", "Amenazas de eliminación", "Uso excesivo de mayúsculas", "Código de verificación falso"],
        icon: Mail,
        difficulty: 1
      },
      {
        id: 4,
        platform: "BBVA",
        from: "alertas@bbva.mx",
        subject: "Notificación de transferencia - $2,500 MXN",
        content: "Estimado cliente,\n\nLe informamos que se ha realizado una transferencia desde su cuenta:\n\nMonto: $2,500.00 MXN\nDestino: Cuenta externa\nFecha: Hoy, 14:30 hrs\nReferencia: BBVA789123\n\nSi usted NO autorizó esta operación, cancélela inmediatamente en:\nbbva.mx.security-check.com\n\nTiene 2 horas para cancelar antes de que sea procesada.\n\nBBVA México",
        isPhishing: true,
        indicators: ["Subdominio sospechoso (no es bbva.mx oficial)", "Presión temporal (2 horas)", "Causa alarma con transferencia no autorizada", "URL de cancelación externa"],
        icon: Building,
        difficulty: 1
      }
    ],
    intermediate: [
      {
        id: 5,
        platform: "Microsoft",
        from: "account-security@microsoft.com",
        subject: "Inicio de sesión desde nueva ubicación - Acción requerida",
        content: "Hola,\n\nDetectamos un nuevo inicio de sesión en tu cuenta de Microsoft:\n\nUbicación: São Paulo, Brasil\nDispositivo: Windows 10 - Chrome\nFecha: Hoy, 11:45 AM\nDirección IP: 187.45.123.89\n\nSi fuiste tú, puedes ignorar este mensaje. Si no reconoces esta actividad, protege tu cuenta inmediatamente:\n\nVerificar actividad: microsoft-security.account-verify.com/check\n\nPor tu seguridad, hemos bloqueado temporalmente algunas funciones de tu cuenta.\n\nEquipo de Seguridad de Microsoft",
        isPhishing: true,
        indicators: ["Subdominio no oficial de Microsoft", "Geolocalización específica para crear alarma", "Bloqueo temporal como presión", "Solicita verificación en sitio externo", "IP address específica para parecer real"],
        icon: Wifi,
        difficulty: 2
      },
      {
        id: 6,
        platform: "Netflix",
        from: "billing@netflix.com",
        subject: "Problema con tu método de pago - Actualización requerida",
        content: "Hola,\n\nTuvimos un problema al procesar tu pago mensual de Netflix.\n\nDetalles:\n- Plan: Premium ($299 MXN/mes)\n- Método de pago: Tarjeta terminada en 4532\n- Error: Fondos insuficientes\n\nTu cuenta será suspendida en 3 días si no actualizas tu información de pago.\n\nActualizar método de pago: netflix.billing-update.secure-payment.org\n\nSi tienes preguntas, visita nuestro Centro de Ayuda.\n\nEquipo de Netflix",
        isPhishing: true,
        indicators: ["Dominio externo sospechoso", "Presión temporal (3 días)", "Solicita información financiera", "URL no oficial de Netflix", "Formato muy similar al real"],
        icon: CreditCard,
        difficulty: 2
      },
      {
        id: 7,
        platform: "WhatsApp Business",
        from: "business@whatsapp.com",
        subject: "Tu cuenta de WhatsApp Business será desactivada",
        content: "Estimado usuario de WhatsApp Business,\n\nHemos detectado actividades que pueden violar nuestros Términos de Servicio en tu cuenta de WhatsApp Business.\n\nInfracciones detectadas:\n- Envío masivo no autorizado\n- Contenido reportado por usuarios\n\nTu cuenta será desactivada en 72 horas a menos que completes el proceso de apelación.\n\nIniciar proceso de apelación: whatsapp-business.appeal-process.com\n\nCódigo de caso: WB-2024-789123\n\nEquipo de Cumplimiento de WhatsApp",
        isPhishing: true,
        indicators: ["Dominio no oficial de WhatsApp", "Amenaza de desactivación", "Código de caso falso", "URL externa para apelación", "Infracciones vagas"],
        icon: MessageSquare,
        difficulty: 2
      },
      {
        id: 8,
        platform: "Mercado Libre",
        from: "noreply@mercadolibre.com.mx",
        subject: "Confirmación de compra - Producto enviado",
        content: "¡Hola!\n\nTu compra ha sido confirmada y el producto está en camino.\n\nDetalles del pedido:\n- Samsung Galaxy S24 Ultra 512GB\n- Precio: $28,999 MXN\n- Vendedor: TechStore Plus (100% positivo)\n- Número de seguimiento: ML789456123\n\nPuedes rastrear tu envío en la sección 'Mis compras' de tu cuenta o directamente en el sitio web de la paquetería.\n\nFecha estimada de entrega: 2-4 días hábiles\n\n¡Gracias por comprar en Mercado Libre!",
        isPhishing: false,
        indicators: ["Dominio oficial de Mercado Libre", "Información detallada y coherente", "No solicita datos personales", "Formato estándar de confirmación", "No hay urgencia artificial"],
        icon: Truck,
        difficulty: 2
      }
    ],
    advanced: [
      {
        id: 9,
        platform: "Santander",
        from: "notificaciones@santander.com.mx",
        subject: "Token móvil bloqueado - Verificación inmediata requerida",
        content: "Estimado cliente,\n\nSu Token Móvil Santander ha sido bloqueado por motivos de seguridad debido a múltiples intentos de acceso fallidos.\n\nDetalles del bloqueo:\n- Fecha: 18/06/2024 - 15:42 hrs\n- Intentos detectados: 5\n- Ubicación: Ciudad de México\n- Dispositivo: iPhone (no reconocido)\n\nPara reactivar su Token y mantener la seguridad de su cuenta, complete la verificación en:\n\nhttps://santander.com.mx.token-verification.secure-banking.net/reactivate\n\nNecesitará:\n- Su número de cliente\n- Los últimos 4 dígitos de su tarjeta\n- Respuesta a su pregunta de seguridad\n\nSi no realiza esta verificación en las próximas 6 horas, su acceso a banca en línea será suspendido por 72 horas.\n\nAtentamente,\nBanco Santander México",
        isPhishing: true,
        indicators: ["URL muy elaborada pero con subdominio falso", "Múltiples datos técnicos para parecer real", "Presión temporal específica", "Solicita datos bancarios sensibles", "Formato muy similar al oficial"],
        icon: Building,
        difficulty: 3
      },
      {
        id: 10,
        platform: "Apple",
        from: "appleid@id.apple.com",
        subject: "Tu Apple ID ha sido bloqueado - Verificación de seguridad requerida",
        content: "Hola,\n\nHemos bloqueado temporalmente tu Apple ID por seguridad después de detectar actividad inusual:\n\n• Múltiples intentos de compra desde ubicación no reconocida\n• Acceso desde dispositivo no autorizado\n• Cambios en la configuración de seguridad\n\nPara proteger tu cuenta y datos, debes verificar tu identidad.\n\nVerificar Apple ID: appleid.apple.com.security-check.verification.net\n\nInformación requerida:\n- Apple ID y contraseña\n- Código de verificación de 2 factores\n- Respuestas de seguridad\n\nTienes 24 horas para completar este proceso o tu Apple ID será desactivado permanentemente.\n\nEquipo de Seguridad de Apple",
        isPhishing: true,
        indicators: ["Dominio muy convincente pero falso", "Múltiples razones de bloqueo", "Amenaza de desactivación permanente", "Solicita toda la información de seguridad", "Formato idéntico a emails reales de Apple"],
        icon: Lock,
        difficulty: 3
      },
      {
        id: 11,
        platform: "UNAM",
        from: "sistemas@dgae.unam.mx",
        subject: "Actualización del Sistema Escolar - Acción requerida",
        content: "Estimado estudiante,\n\nEl Sistema de Administración Escolar de la UNAM realizará una actualización importante el próximo fin de semana.\n\nComo parte de este proceso, es necesario que todos los estudiantes actualicen sus datos de acceso para mantener la seguridad del sistema.\n\nDeberás actualizar:\n✓ Contraseña del sistema escolar\n✓ Pregunta de seguridad\n✓ Número de contacto\n✓ Correo de recuperación\n\nAccede al portal de actualización: sistemas.dgae.unam.mx.actualizacion-seguridad.net\n\nFecha límite: 20 de junio de 2024\n\nSi no actualizas tus datos, no podrás acceder al sistema para:\n- Consultar calificaciones\n- Realizar inscripciones\n- Descargar documentos oficiales\n\nDirección General de Administración Escolar\nUNAM",
        isPhishing: true,
        indicators: ["Subdominio falso muy elaborado", "Aprovecha contexto universitario real", "Múltiples consecuencias por no actuar", "Solicita credenciales completas", "Fecha límite específica"],
        icon: University,
        difficulty: 3
      },
      {
        id: 12,
        platform: "LinkedIn",
        from: "security@linkedin.com",
        subject: "Confirmación de inicio de sesión desde nuevo dispositivo",
        content: "Hola,\n\nSe ha iniciado sesión en tu cuenta de LinkedIn desde un nuevo dispositivo.\n\nDetalles del acceso:\n• Dispositivo: MacBook Pro (macOS Sonoma)\n• Ubicación: Madrid, España\n• Navegador: Safari 17.2\n• Fecha y hora: 18 jun 2024, 09:30 CET\n• Dirección IP: 185.94.188.45\n\nSi fuiste tú, no necesitas hacer nada más.\n\nSi no reconoces esta actividad, protege tu cuenta inmediatamente:\n1. Cambia tu contraseña\n2. Revisa tus conexiones recientes\n3. Activa la verificación en dos pasos\n\nAcceder a configuración de seguridad: www.linkedin.com/psettings/privacy\n\nGracias,\nEquipo de Seguridad de LinkedIn",
        isPhishing: false,
        indicators: ["URL oficial de LinkedIn", "Información detallada pero no solicita datos", "Proporciona pasos de seguridad válidos", "No hay presión temporal", "Formato oficial de LinkedIn"],
        icon: Globe,
        difficulty: 3
      }
    ],
    expert: [
      {
        id: 13,
        platform: "GitHub",
        from: "security@github.com",
        subject: "Critical Security Alert: Unauthorized access from suspicious location",
        content: "Hello,\n\nWe've detected potentially unauthorized access to your GitHub account from an unfamiliar location.\n\nAccess Details:\n• Location: Bucharest, Romania (New)\n• IP Address: 93.115.84.167\n• Device: Linux Ubuntu 22.04 - Firefox 118\n• Time: June 18, 2024 at 11:47 AM UTC\n• Actions taken: Repository access, SSH key generation\n\nImmediate actions taken:\n- Temporarily locked write access to your repositories\n- Invalidated all active sessions\n- Flagged account for security review\n\nTo restore full access, please verify this activity:\n\n🔒 Verify Account Security: github.com/security/verify-access?token=ghp_xxK7yB2mN8vQ1sR4tE9wF3xC6zA5uH1iPo\n\nRequired verification:\n• Your current password\n• Two-factor authentication code\n• Security key confirmation (if enabled)\n• Answer to security question\n\nIf you don't verify within 12 hours, we'll begin the account recovery process which may take 3-5 business days.\n\nBest regards,\nGitHub Security Team\n\nNeed help? Contact us at security@github.com",
        isPhishing: true,
        indicators: ["URL con token falso muy convincente", "Información técnica muy detallada", "Múltiples medidas de seguridad mencionadas", "Presión temporal con proceso de recuperación", "Formato exacto de GitHub con elementos falsos"],
        icon: Code,
        difficulty: 4
      },
      {
        id: 14,
        platform: "Zoom",
        from: "noreply@zoom.us",
        subject: "Important Account Security Update Required",
        content: "Dear Zoom User,\n\nAs part of our ongoing commitment to security, we're implementing enhanced protection measures for all Zoom accounts.\n\nNew Security Features:\n✓ Advanced encryption protocols\n✓ Enhanced meeting authentication\n✓ Improved end-to-end encryption\n✓ Biometric verification options\n\nTo continue using Zoom without interruption, please update your security settings by June 25, 2024.\n\nWhat you need to do:\n1. Log in to your Zoom account\n2. Navigate to Security Settings\n3. Enable new security features\n4. Verify your identity\n\nUpdate Security Settings: https://zoom.us.security-update.account-verification.net/update\n\nAfter June 25, accounts that haven't updated will have limited functionality:\n- Maximum 40-minute meetings (all plans)\n- Reduced participant limits\n- Limited recording capabilities\n- No screen sharing\n\nQuestions? Visit our Help Center or contact support.\n\nBest regards,\nZoom Security Team",
        isPhishing: true,
        indicators: ["Subdominio muy elaborado pero falso", "Múltiples consecuencias convincentes", "Mejoras de seguridad como gancho", "Fecha límite específica", "Formato profesional muy similar al real"],
        icon: Wifi,
        difficulty: 4
      },
      {
        id: 15,
        platform: "Adobe",
        from: "noreply@adobe.com",
        subject: "Your Creative Cloud subscription will expire soon",
        content: "Hello,\n\nYour Adobe Creative Cloud subscription is set to expire in 7 days.\n\nSubscription Details:\n• Plan: Creative Cloud All Apps\n• Renewal Date: June 25, 2024\n• Price: $52.99/month\n• Payment Method: •••• •••• •••• 4758\n\nTo avoid interruption of your Creative Cloud services:\n\n• Continue Subscription: Renew automatically\n• Update Payment: Change your payment method\n• Manage Plan: Switch to a different plan\n\nRenew your subscription: www.adobe.com/go/cc_renew\n\nWhat happens if your subscription expires:\n- Loss of access to Creative Cloud apps\n- Cloud storage will be reduced to 2GB\n- No more updates or new features\n- Limited access to Adobe Fonts\n\nKeep creating with Adobe Creative Cloud.\n\nThe Adobe Team",
        isPhishing: false,
        indicators: ["URL oficial de Adobe", "Información típica de renovación", "No solicita datos sensibles directamente", "Consecuencias reales de expiración", "Formato estándar de Adobe"],
        icon: Globe,
        difficulty: 4
      },
      {
        id: 16,
        platform: "Binance",
        from: "security@binance.com",
        subject: "🚨 Security Alert: Large withdrawal pending approval",
        content: "Dear Valued User,\n\nWe've detected a large withdrawal request from your Binance account that requires immediate verification.\n\nWithdrawal Details:\n• Amount: 2.5 BTC (~$67,500 USD)\n• Destination: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa\n• Requested: Today, 14:23 UTC\n• Status: Pending Security Review\n\nFor your protection, this withdrawal has been temporarily suspended pending identity verification.\n\n🔐 Security Measures Triggered:\n- Large amount detection (>$50,000)\n- New wallet address\n- Request from unrecognized device\n- VPN usage detected\n\nIMPORTANT: You have 24 hours to verify this transaction or it will be automatically cancelled for security reasons.\n\nVerify Withdrawal: binance.com.withdrawal-verification.secure-crypto.net/verify\n\nVerification Requirements:\n• Account password\n• 2FA authentication code\n• ID document upload\n• Facial recognition scan\n• Security question answers\n\nIf you did NOT request this withdrawal, secure your account immediately by changing your password and contacting support.\n\nStay Safe,\nBinance Security Team",
        isPhishing: true,
        indicators: ["Dominio falso muy sofisticado", "Monto alto para crear pánico", "Dirección Bitcoin real para credibilidad", "Múltiples verificaciones solicitadas", "Urgencia extrema (24 horas)", "Formato exacto de alertas reales de Binance"],
        icon: Building,
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
            [SISTEMA DE ENTRENAMIENTO AVANZADO - 16 SIMULACIONES REALISTAS]
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
              <div className="bg-slate-800/50 border border-green-400/20 rounded-lg p-4 mb-6 font-mono max-h-80 overflow-y-auto">
                <pre className="text-green-200 leading-relaxed whitespace-pre-wrap text-sm">
                  {currentEmailData.content}
                </pre>
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
              <div className="space-y-4 max-h-80 overflow-y-auto">
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

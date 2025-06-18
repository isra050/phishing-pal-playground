
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  AlertTriangle, 
  Mail, 
  Smartphone, 
  Phone, 
  Globe, 
  Lock,
  Eye,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const Education = () => {
  const { t } = useLanguage();

  const phishingTypes = [
    {
      icon: Mail,
      title: "Email Phishing",
      description: "Emails fraudulentos que imitan organizaciones legítimas",
      color: "from-red-500 to-red-600",
      examples: ["Emails de bancos falsos", "Ofertas demasiado buenas", "Urgencia artificial"]
    },
    {
      icon: Smartphone,
      title: "Smishing (SMS)",
      description: "Ataques de phishing a través de mensajes de texto",
      color: "from-orange-500 to-orange-600",
      examples: ["Códigos de verificación falsos", "Enlaces en SMS", "Premios inexistentes"]
    },
    {
      icon: Phone,
      title: "Vishing (Voz)",
      description: "Llamadas telefónicas fraudulentas para obtener información",
      color: "from-yellow-500 to-yellow-600",
      examples: ["Llamadas de soporte técnico", "Verificaciones bancarias", "IRS falso"]
    },
    {
      icon: Globe,
      title: "Pharming",
      description: "Redirección a sitios web falsos sin conocimiento del usuario",
      color: "from-purple-500 to-purple-600",
      examples: ["DNS envenenado", "Sitios web clonados", "URLs similares"]
    }
  ];

  const protectionTips = [
    {
      icon: Lock,
      title: "Autenticación de Dos Factores",
      description: "Activa 2FA en todas tus cuentas importantes",
      isGood: true
    },
    {
      icon: Eye,
      title: "Verifica URLs",
      description: "Siempre revisa la dirección web antes de ingresar datos",
      isGood: true
    },
    {
      icon: CheckCircle2,
      title: "Software Actualizado",
      description: "Mantén tu navegador y antivirus actualizados",
      isGood: true
    },
    {
      icon: XCircle,
      title: "No hacer clic en enlaces sospechosos",
      description: "Evita hacer clic en enlaces de emails no solicitados",
      isGood: true
    }
  ];

  const redFlags = [
    "Urgencia excesiva ('Tu cuenta será cerrada en 24 horas')",
    "Solicitudes de información personal por email",
    "Errores de ortografía y gramática",
    "Dominios similares pero incorrectos (paypaI.com)",
    "Ofertas demasiado buenas para ser verdad",
    "Amenazas o consecuencias graves",
    "Remitentes desconocidos pidiendo acción inmediata",
    "URLs acortadas o sospechosas"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            {t('edu.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('edu.subtitle')}
          </p>
        </div>

        {/* What is Phishing */}
        <section className="mb-16">
          <Card className="animate-scale-in shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                {t('edu.whatIs')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('edu.whatIs.desc')}
              </p>
              <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-3">🎯 Objetivo del Phishing:</h4>
                <ul className="text-red-700 space-y-2">
                  <li>• Robar contraseñas y credenciales</li>
                  <li>• Obtener información bancaria</li>
                  <li>• Instalar malware en dispositivos</li>
                  <li>• Acceder a cuentas personales</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Types of Phishing */}
        <section className="mb-16">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('edu.types')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('edu.types.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phishingTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-lg transition-all duration-300 animate-scale-in border-0 shadow-md"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {type.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4 text-center">
                      {type.description}
                    </CardDescription>
                    <div className="space-y-2">
                      {type.examples.map((example, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs block text-center py-1">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Red Flags */}
        <section className="mb-16">
          <Card className="animate-scale-in shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-100">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
                🚩 Señales de Alerta
              </CardTitle>
              <CardDescription className="text-lg">
                Aprende a identificar estas señales de phishing
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {redFlags.map((flag, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200 animate-fade-in group hover:shadow-md transition-all duration-300"
                    style={{animationDelay: `${index * 0.05}s`}}
                  >
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-red-800 text-sm">{flag}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Protection Tips */}
        <section className="mb-16">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('edu.protect')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('edu.protect.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {protectionTips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-lg transition-all duration-300 animate-scale-in border-0 shadow-md"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {tip.title}
                        </h3>
                        <p className="text-gray-600">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center animate-fade-in">
          <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 border-0 shadow-xl">
            <CardContent className="p-12">
              <Shield className="h-16 w-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                ¡Pon a prueba tus conocimientos!
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Ahora que conoces los fundamentos, practica con nuestras simulaciones interactivas.
              </p>
              <button className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-200 font-semibold px-8 py-4 rounded-lg">
                Ir a Simulaciones
              </button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Education;

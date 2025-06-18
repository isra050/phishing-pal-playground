
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Zap, Globe, BookOpen, ArrowRight, AlertTriangle } from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: t('features.interactive'),
      description: t('features.interactive.desc'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: BookOpen,
      title: t('features.education'),
      description: t('features.education.desc'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Globe,
      title: t('features.multilang'),
      description: t('features.multilang.desc'),
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const tips = [
    t('tips.1'),
    t('tips.2'),
    t('tips.3'),
    t('tips.4')
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/simulation">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-200 font-semibold group">
                  {t('home.cta')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
              <Link to="/education">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-200 font-semibold">
                  {t('home.learn')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce-subtle"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce-subtle" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce-subtle" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 animate-scale-in border-0 shadow-md" style={{animationDelay: `${index * 0.2}s`}}>
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Tips Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('tips.title')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 animate-fade-in group hover:shadow-md transition-all duration-300" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 group-hover:text-orange-600 transition-colors duration-200" />
                </div>
                <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Listo para poner a prueba tus conocimientos?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Comienza ahora con nuestras simulaciones interactivas y aprende a protegerte del phishing.
            </p>
            <Link to="/simulation">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 font-semibold group">
                Comenzar Ahora
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

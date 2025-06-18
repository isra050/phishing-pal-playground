
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'es' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.simulation': 'Simulación',
    'nav.education': 'Educación',
    'nav.login': 'Iniciar Sesión',
    'nav.register': 'Registro',
    'nav.logout': 'Cerrar Sesión',
    
    // Home page
    'home.title': 'Simulador Educativo de Phishing',
    'home.subtitle': 'Aprende a identificar y protegerte del phishing de manera interactiva',
    'home.cta': 'Comenzar Simulación',
    'home.learn': 'Aprender Más',
    
    // Features
    'features.title': '¿Por qué usar nuestro simulador?',
    'features.interactive': 'Simulaciones Interactivas',
    'features.interactive.desc': 'Experimenta ataques de phishing reales en un entorno seguro',
    'features.education': 'Contenido Educativo',
    'features.education.desc': 'Aprende las mejores prácticas de seguridad cibernética',
    'features.multilang': 'Múltiples Idiomas',
    'features.multilang.desc': 'Disponible en español, inglés y francés',
    
    // Auth
    'auth.email': 'Correo electrónico',
    'auth.password': 'Contraseña',
    'auth.confirmPassword': 'Confirmar contraseña',
    'auth.login': 'Iniciar Sesión',
    'auth.register': 'Registrarse',
    'auth.loginWith': 'Iniciar sesión con',
    'auth.registerWith': 'Registrarse con',
    'auth.google': 'Google',
    'auth.facebook': 'Facebook',
    'auth.twitter': 'Twitter',
    
    // Tips
    'tips.title': 'Consejos de Seguridad',
    'tips.1': 'Siempre verifica la URL antes de ingresar información personal',
    'tips.2': 'Desconfía de correos urgentes que soliciten información confidencial',
    'tips.3': 'Usa autenticación de dos factores cuando sea posible',
    'tips.4': 'Mantén tu software actualizado',
    
    // Simulation
    'sim.title': 'Simulación de Phishing',
    'sim.subtitle': 'Identifica los intentos de phishing en estos ejemplos',
    'sim.email': 'Ejemplo de Email Sospechoso',
    'sim.analyze': 'Analizar',
    'sim.legitimate': 'Legítimo',
    'sim.phishing': 'Phishing',
    
    // Education
    'edu.title': 'Centro Educativo',
    'edu.subtitle': 'Aprende todo sobre phishing y cómo protegerte',
    'edu.whatIs': '¿Qué es el Phishing?',
    'edu.whatIs.desc': 'El phishing es un tipo de ataque cibernético donde los atacantes se hacen pasar por entidades confiables para robar información personal.',
    'edu.types': 'Tipos de Phishing',
    'edu.types.desc': 'Existen varios tipos: email phishing, spear phishing, whaling, smishing, vishing y pharming.',
    'edu.protect': 'Cómo Protegerse',
    'edu.protect.desc': 'Verifica URLs, usa 2FA, mantén software actualizado y sé escéptico con solicitudes urgentes.'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.simulation': 'Simulation',
    'nav.education': 'Education',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    
    // Home page
    'home.title': 'Educational Phishing Simulator',
    'home.subtitle': 'Learn to identify and protect yourself from phishing interactively',
    'home.cta': 'Start Simulation',
    'home.learn': 'Learn More',
    
    // Features
    'features.title': 'Why use our simulator?',
    'features.interactive': 'Interactive Simulations',
    'features.interactive.desc': 'Experience real phishing attacks in a safe environment',
    'features.education': 'Educational Content',
    'features.education.desc': 'Learn cybersecurity best practices',
    'features.multilang': 'Multiple Languages',
    'features.multilang.desc': 'Available in Spanish, English, and French',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm password',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.loginWith': 'Login with',
    'auth.registerWith': 'Register with',
    'auth.google': 'Google',
    'auth.facebook': 'Facebook',
    'auth.twitter': 'Twitter',
    
    // Tips
    'tips.title': 'Security Tips',
    'tips.1': 'Always verify URLs before entering personal information',
    'tips.2': 'Be suspicious of urgent emails requesting confidential information',
    'tips.3': 'Use two-factor authentication when possible',
    'tips.4': 'Keep your software updated',
    
    // Simulation
    'sim.title': 'Phishing Simulation',
    'sim.subtitle': 'Identify phishing attempts in these examples',
    'sim.email': 'Suspicious Email Example',
    'sim.analyze': 'Analyze',
    'sim.legitimate': 'Legitimate',
    'sim.phishing': 'Phishing',
    
    // Education
    'edu.title': 'Education Center',
    'edu.subtitle': 'Learn everything about phishing and how to protect yourself',
    'edu.whatIs': 'What is Phishing?',
    'edu.whatIs.desc': 'Phishing is a type of cyber attack where attackers impersonate trusted entities to steal personal information.',
    'edu.types': 'Types of Phishing',
    'edu.types.desc': 'There are several types: email phishing, spear phishing, whaling, smishing, vishing, and pharming.',
    'edu.protect': 'How to Protect Yourself',
    'edu.protect.desc': 'Verify URLs, use 2FA, keep software updated, and be skeptical of urgent requests.'
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.simulation': 'Simulation',
    'nav.education': 'Éducation',
    'nav.login': 'Connexion',
    'nav.register': 'S\'inscrire',
    'nav.logout': 'Déconnexion',
    
    // Home page
    'home.title': 'Simulateur Éducatif de Phishing',
    'home.subtitle': 'Apprenez à identifier et vous protéger du phishing de manière interactive',
    'home.cta': 'Commencer la Simulation',
    'home.learn': 'En Savoir Plus',
    
    // Features
    'features.title': 'Pourquoi utiliser notre simulateur?',
    'features.interactive': 'Simulations Interactives',
    'features.interactive.desc': 'Expérimentez de vraies attaques de phishing dans un environnement sûr',
    'features.education': 'Contenu Éducatif',
    'features.education.desc': 'Apprenez les meilleures pratiques de cybersécurité',
    'features.multilang': 'Plusieurs Langues',
    'features.multilang.desc': 'Disponible en espagnol, anglais et français',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.confirmPassword': 'Confirmer le mot de passe',
    'auth.login': 'Se connecter',
    'auth.register': 'S\'inscrire',
    'auth.loginWith': 'Se connecter avec',
    'auth.registerWith': 'S\'inscrire avec',
    'auth.google': 'Google',
    'auth.facebook': 'Facebook',
    'auth.twitter': 'Twitter',
    
    // Tips
    'tips.title': 'Conseils de Sécurité',
    'tips.1': 'Vérifiez toujours les URLs avant de saisir des informations personnelles',
    'tips.2': 'Méfiez-vous des emails urgents demandant des informations confidentielles',
    'tips.3': 'Utilisez l\'authentification à deux facteurs quand c\'est possible',
    'tips.4': 'Gardez vos logiciels à jour',
    
    // Simulation
    'sim.title': 'Simulation de Phishing',
    'sim.subtitle': 'Identifiez les tentatives de phishing dans ces exemples',
    'sim.email': 'Exemple d\'Email Suspect',
    'sim.analyze': 'Analyser',
    'sim.legitimate': 'Légitime',
    'sim.phishing': 'Phishing',
    
    // Education
    'edu.title': 'Centre Éducatif',
    'edu.subtitle': 'Apprenez tout sur le phishing et comment vous protéger',
    'edu.whatIs': 'Qu\'est-ce que le Phishing?',
    'edu.whatIs.desc': 'Le phishing est un type de cyberattaque où les attaquants se font passer pour des entités de confiance pour voler des informations personnelles.',
    'edu.types': 'Types de Phishing',
    'edu.types.desc': 'Il existe plusieurs types: email phishing, spear phishing, whaling, smishing, vishing et pharming.',
    'edu.protect': 'Comment se Protéger',
    'edu.protect.desc': 'Vérifiez les URLs, utilisez 2FA, gardez les logiciels à jour et soyez sceptique des demandes urgentes.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

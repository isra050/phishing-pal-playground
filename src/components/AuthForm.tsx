
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { t } = useLanguage();
  const { login, register, loginWithProvider } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (type === 'register') {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Error",
            description: "Las contraseñas no coinciden",
            variant: "destructive"
          });
          return;
        }
        await register(formData.email, formData.password, formData.name);
        toast({
          title: "¡Registro exitoso!",
          description: "Bienvenido a PhishingEdu"
        });
      } else {
        await login(formData.email, formData.password);
        toast({
          title: "¡Inicio de sesión exitoso!",
          description: "Bienvenido de nuevo"
        });
      }
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema con la autenticación",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProviderLogin = async (provider: string) => {
    setLoading(true);
    try {
      await loginWithProvider(provider);
      toast({
        title: "¡Inicio de sesión exitoso!",
        description: `Conectado con ${provider}`
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: `No se pudo conectar con ${provider}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4">
      <Card className="w-full max-w-md animate-scale-in shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {type === 'login' ? t('auth.login') : t('auth.register')}
          </CardTitle>
          <CardDescription>
            {type === 'login' 
              ? 'Inicia sesión para continuar aprendiendo' 
              : 'Crea tu cuenta para comenzar'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full gap-2 hover:bg-red-50 hover:border-red-200 transition-all duration-200"
              onClick={() => handleProviderLogin('Google')}
              disabled={loading}
            >
              <span className="text-lg">🔍</span>
              {type === 'login' ? t('auth.loginWith') : t('auth.registerWith')} {t('auth.google')}
            </Button>
            
            <Button
              variant="outline"
              className="w-full gap-2 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
              onClick={() => handleProviderLogin('Facebook')}
              disabled={loading}
            >
              <span className="text-lg">📘</span>
              {type === 'login' ? t('auth.loginWith') : t('auth.registerWith')} {t('auth.facebook')}
            </Button>
            
            <Button
              variant="outline"
              className="w-full gap-2 hover:bg-cyan-50 hover:border-cyan-200 transition-all duration-200"
              onClick={() => handleProviderLogin('Twitter')}
              disabled={loading}
            >
              <span className="text-lg">🐦</span>
              {type === 'login' ? t('auth.loginWith') : t('auth.registerWith')} {t('auth.twitter')}
            </Button>
          </div>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-muted-foreground">
              o
            </span>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === 'register' && (
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="password">{t('auth.password')}</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {type === 'register' && (
              <div>
                <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {type === 'login' ? t('auth.login') : t('auth.register')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;

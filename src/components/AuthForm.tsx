
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
import { Loader2, Eye, EyeOff, Shield, Lock, Mail, User, Github } from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { t } = useLanguage();
  const { login, register, loginWithProvider } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hackingEffect, setHackingEffect] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const triggerHackingEffect = () => {
    setHackingEffect(true);
    setTimeout(() => setHackingEffect(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (type === 'register') {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "❌ Error de Validación",
            description: "Las contraseñas no coinciden",
            variant: "destructive"
          });
          return;
        }
        if (formData.password.length < 6) {
          toast({
            title: "❌ Contraseña Débil",
            description: "La contraseña debe tener al menos 6 caracteres",
            variant: "destructive"
          });
          return;
        }
        await register(formData.email, formData.password, formData.name);
        triggerHackingEffect();
        toast({
          title: "🎯 ¡Registro Exitoso!",
          description: "Bienvenido al Sistema de Entrenamiento PhishingEdu"
        });
      } else {
        await login(formData.email, formData.password);
        triggerHackingEffect();
        toast({
          title: "🔓 ¡Acceso Concedido!",
          description: "Sistema comprometido... ¡Bienvenido de nuevo!"
        });
      }
      navigate('/');
    } catch (error) {
      toast({
        title: "🚫 Acceso Denegado",
        description: "Credenciales inválidas. Intenta de nuevo.",
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
      triggerHackingEffect();
      toast({
        title: "🌐 ¡Conexión Establecida!",
        description: `Infiltración exitosa vía ${provider}`
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "🔒 Conexión Fallida",
        description: `No se pudo establecer conexión con ${provider}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 relative overflow-hidden">
      {/* Matrix background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(0,255,0,0.1)_25px,rgba(0,255,0,0.1)_26px,transparent_27px)] bg-[length:25px_25px] animate-pulse"></div>
      </div>

      {/* Hacking effect overlay */}
      {hackingEffect && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-green-500/20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-green-400 text-4xl font-mono animate-bounce text-center">
              <div>SISTEMA COMPROMETIDO</div>
              <div className="text-2xl mt-2">ACCESS GRANTED</div>
            </div>
          </div>
        </div>
      )}

      <Card className="w-full max-w-md animate-scale-in shadow-2xl bg-slate-800/90 border-green-400/30 backdrop-blur-sm relative z-10">
        <CardHeader className="text-center border-b border-green-400/20">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-900/30 rounded-full border border-green-400/30">
              <Shield className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent font-mono">
            &gt; {type === 'login' ? 'SYSTEM_LOGIN' : 'USER_REGISTRATION'}
          </CardTitle>
          <CardDescription className="text-green-300 font-mono">
            {type === 'login' 
              ? '[INICIANDO PROTOCOLO DE ACCESO...]' 
              : '[CREANDO NUEVO PERFIL DE USUARIO...]'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 p-6 bg-slate-900/50">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full gap-2 bg-red-900/30 border-red-400/50 text-red-300 hover:bg-red-400/20 hover:border-red-400 transition-all duration-200 font-mono transform hover:scale-105"
              onClick={() => handleProviderLogin('Google')}
              disabled={loading}
            >
              <span className="text-lg">🔍</span>
              INFILTRAR_VIA_GOOGLE
            </Button>
            
            <Button
              variant="outline"
              className="w-full gap-2 bg-blue-900/30 border-blue-400/50 text-blue-300 hover:bg-blue-400/20 hover:border-blue-400 transition-all duration-200 font-mono transform hover:scale-105"
              onClick={() => handleProviderLogin('Facebook')}
              disabled={loading}
            >
              <span className="text-lg">📘</span>
              CONECTAR_FACEBOOK
            </Button>
            
            <Button
              variant="outline"
              className="w-full gap-2 bg-cyan-900/30 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/20 hover:border-cyan-400 transition-all duration-200 font-mono transform hover:scale-105"
              onClick={() => handleProviderLogin('Twitter')}
              disabled={loading}
            >
              <span className="text-lg">🐦</span>
              ACCESO_TWITTER
            </Button>

            <Button
              variant="outline"
              className="w-full gap-2 bg-gray-900/30 border-gray-400/50 text-gray-300 hover:bg-gray-400/20 hover:border-gray-400 transition-all duration-200 font-mono transform hover:scale-105"
              onClick={() => handleProviderLogin('GitHub')}
              disabled={loading}
            >
              <Github className="h-4 w-4" />
              HACK_VIA_GITHUB
            </Button>
          </div>

          <div className="relative">
            <Separator className="bg-green-400/30" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 px-2 text-sm text-green-400 font-mono">
              OR_MANUAL_BREACH
            </span>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === 'register' && (
              <div className="relative">
                <Label htmlFor="name" className="text-green-400 font-mono">USERNAME</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="pl-10 bg-slate-800/50 border-green-400/30 text-green-200 focus:border-green-400 font-mono"
                    placeholder="enter_username"
                  />
                </div>
              </div>
            )}
            
            <div className="relative">
              <Label htmlFor="email" className="text-green-400 font-mono">EMAIL_ADDRESS</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="pl-10 bg-slate-800/50 border-green-400/30 text-green-200 focus:border-green-400 font-mono"
                  placeholder="user@domain.com"
                />
              </div>
            </div>
            
            <div className="relative">
              <Label htmlFor="password" className="text-green-400 font-mono">PASSWORD_HASH</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  className="pl-10 pr-10 bg-slate-800/50 border-green-400/30 text-green-200 focus:border-green-400 font-mono"
                  placeholder="enter_secure_password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            {type === 'register' && (
              <div className="relative">
                <Label htmlFor="confirmPassword" className="text-green-400 font-mono">CONFIRM_PASSWORD</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                    className="pl-10 bg-slate-800/50 border-green-400/30 text-green-200 focus:border-green-400 font-mono"
                    placeholder="confirm_password"
                  />
                </div>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 transition-all duration-200 font-mono text-lg py-6 transform hover:scale-105"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              &gt; {type === 'login' ? 'EXECUTE_LOGIN' : 'CREATE_ACCOUNT'}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-green-400/70 font-mono text-sm">
              {type === 'login' ? 
                "¿Nuevo en el sistema? " : 
                "¿Ya tienes acceso? "
              }
              <button 
                onClick={() => navigate(type === 'login' ? '/register' : '/login')}
                className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
              >
                {type === 'login' ? 'Crear cuenta' : 'Iniciar sesión'}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;

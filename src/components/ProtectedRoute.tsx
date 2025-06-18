
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-green-400 font-mono text-xl">VERIFICANDO_ACCESO...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
        {/* Matrix background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(0,255,0,0.1)_25px,rgba(0,255,0,0.1)_26px,transparent_27px)] bg-[length:25px_25px] animate-pulse"></div>
        </div>

        <Card className="w-full max-w-md animate-scale-in shadow-2xl bg-slate-800/90 border-red-400/30 backdrop-blur-sm">
          <CardHeader className="text-center border-b border-red-400/20">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-900/30 rounded-full border border-red-400/30">
                <Lock className="h-8 w-8 text-red-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent font-mono">
              &gt; ACCESO_DENEGADO
            </CardTitle>
            <CardDescription className="text-red-300 font-mono">
              [ZONA RESTRINGIDA - AUTENTICACIÓN REQUERIDA]
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 bg-slate-900/50 text-center">
            <div className="mb-6">
              <Shield className="h-16 w-16 text-red-400 mx-auto mb-4 animate-pulse" />
              <p className="text-red-200 font-mono mb-4">
                Esta sección requiere acceso autorizado.
              </p>
              <p className="text-amber-300 font-mono text-sm">
                Para acceder al simulador de phishing, debes registrarte o iniciar sesión.
              </p>
            </div>

            <div className="space-y-3">
              <Link to="/login" className="block">
                <Button className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 transition-all duration-200 font-mono transform hover:scale-105">
                  <UserCheck className="h-4 w-4 mr-2" />
                  &gt; INICIAR_SESIÓN
                </Button>
              </Link>
              
              <Link to="/register" className="block">
                <Button 
                  variant="outline" 
                  className="w-full border-green-400 text-green-400 hover:bg-green-400/10 font-mono transform hover:scale-105"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  &gt; CREAR_CUENTA
                </Button>
              </Link>
            </div>

            <div className="mt-6 p-3 bg-slate-800/50 rounded border border-amber-400/30">
              <p className="text-amber-200 text-xs font-mono">
                [SISTEMA_INFO] El simulador contiene 16 escenarios realistas de phishing para entrenar tu detección de amenazas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

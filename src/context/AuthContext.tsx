import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithProvider: (provider: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Validación básica
      if (!email || !password) {
        throw new Error('Email y contraseña son requeridos');
      }
      
      // Simulación de login con validación
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulación de validación de credenciales
      if (password.length < 3) {
        throw new Error('Credenciales inválidas');
      }
      
      setUser({
        id: '1',
        email,
        name: email.split('@')[0]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Validación de registro
      if (!email || !password || !name) {
        throw new Error('Todos los campos son requeridos');
      }
      
      if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }
      
      if (!email.includes('@')) {
        throw new Error('Email inválido');
      }
      
      // Simulación de registro
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUser({
        id: '1',
        email,
        name
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithProvider = async (provider: string) => {
    setIsLoading(true);
    try {
      // Simulación de login con proveedor externo
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUser({
        id: '1',
        email: `user@${provider.toLowerCase()}.com`,
        name: `Usuario de ${provider}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      loginWithProvider, 
      logout, 
      isAuthenticated: !!user,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

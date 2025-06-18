
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulación de login
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      email,
      name: email.split('@')[0]
    });
  };

  const register = async (email: string, password: string, name: string) => {
    // Simulación de registro
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      email,
      name
    });
  };

  const loginWithProvider = async (provider: string) => {
    // Simulación de login con proveedor
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUser({
      id: '1',
      email: `user@${provider}.com`,
      name: `Usuario de ${provider}`
    });
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
      isAuthenticated: !!user 
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

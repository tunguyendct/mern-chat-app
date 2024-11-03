import { createContext, ReactNode, useContext, useState } from 'react';
import { AuthUser } from '../types/auth.type';

export interface AuthContextType {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser | null) => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider'
    );
  }

  return context;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authUser, setAuthUser] = useState<AuthContextType['authUser']>(
    JSON.parse(localStorage.getItem('chat-user') || 'null')
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

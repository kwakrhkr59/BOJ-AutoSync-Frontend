// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const contextValue = useContext(AuthContext);

  if (!contextValue) {
    throw new Error('useAuth 훅은 AuthProvider 내부에서만 사용 가능합니다.');
  }

  return contextValue;
}

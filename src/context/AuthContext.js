// context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 예시: 로그인 상태를 저장할 state
  const [user, setUser] = useState(null);

  // 로그인/로그아웃 등에 필요한 메서드들...
  const login = () => { /* ... */ };
  const logout = () => { /* ... */ };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 편의용 커스텀 훅
export function useAuth() {
  return useContext(AuthContext);
}

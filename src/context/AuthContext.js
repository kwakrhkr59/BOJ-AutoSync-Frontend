import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 로그인 상태를 저장할 state
  const [user, setUser] = useState(null);

  // 로그인 메서드 (실제 로직에 맞게 수정하세요)
  const login = (userData) => {
    setUser(userData);
  };

  // 로그아웃 메서드
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 편의용 커스텀 훅
export function useAuth() {
  return useContext(AuthContext);
}

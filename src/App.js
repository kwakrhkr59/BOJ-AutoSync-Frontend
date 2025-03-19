import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ConnectGithubPage from './pages/ConnectGithubPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import SyncHistoryPage from './pages/SyncHistoryPage';
import ProfilePage from './pages/ProfilePage';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

// Conditional redirect based on auth state
const ConditionalRedirect = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="flex items-center justify-center h-screen">로딩 중...</div>;
  
  return user ? <Navigate to="/dashboard" replace /> : <HomePage />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ConditionalRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/connect-github" element={<ConnectGithubPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/history" element={<SyncHistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          
          {/* Default fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
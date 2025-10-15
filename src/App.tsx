import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { FitnessGenerator } from './components/FitnessGenerator';
import { RecipeGenerator } from './components/RecipeGenerator';
import { AboutPage } from './components/AboutPage';
import { UserDashboard } from './components/UserDashboard';
import { SubscriptionPage } from './components/SubscriptionPage';
import { AuthModals } from './components/AuthModals';
import { toast } from 'sonner@2.0.3';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleLoginSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    setCurrentPage('dashboard');
    toast.success(`Welcome back, ${userData.name.split(' ')[0]}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    toast.success('Signed out successfully');
  };

  const handleSwitchToSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'fitness':
        return <FitnessGenerator />;
      case 'recipe':
        return <RecipeGenerator />;
      case 'about':
        return <AboutPage />;
      case 'dashboard':
        return user ? (
          <UserDashboard
            user={user}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
          />
        ) : (
          <HomePage onNavigate={setCurrentPage} />
        );
      case 'subscription':
        return <SubscriptionPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1C1C1C] flex flex-col">
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenSignup={() => setIsSignupOpen(true)}
        onLogout={handleLogout}
      />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />

      <AuthModals
        isLoginOpen={isLoginOpen}
        isSignupOpen={isSignupOpen}
        onCloseLogin={() => setIsLoginOpen(false)}
        onCloseSignup={() => setIsSignupOpen(false)}
        onSwitchToSignup={handleSwitchToSignup}
        onSwitchToLogin={handleSwitchToLogin}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

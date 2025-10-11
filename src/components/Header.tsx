import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, User } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user?: { name: string; email: string } | null;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onLogout: () => void;
}

export function Header({ currentPage, onNavigate, user, onOpenLogin, onOpenSignup, onLogout }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'fitness', label: 'Fitness Plan Generator' },
    { id: 'recipe', label: 'Recipe Generator' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="bg-[#121212] border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-white hover:text-[#4CAF50] transition-colors"
            >
              FitGen
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-md transition-all duration-200 ${
                  currentPage === item.id
                    ? 'text-[#4CAF50] bg-[#2C2C2C] shadow-lg shadow-[#4CAF50]/20'
                    : 'text-[#B0B0B0] hover:text-[#4CAF50] hover:bg-[#2C2C2C] hover:shadow-lg hover:shadow-[#4CAF50]/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#2C2C2C] border border-gray-700">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-medium">{user.name.split(' ')[0]}</span>
                </div>
                <Button 
                  onClick={() => onNavigate('dashboard')}
                  className="bg-[#4CAF50] hover:bg-[#45a049] text-white hover:shadow-lg hover:shadow-[#4CAF50]/40 transition-all duration-200"
                >
                  Dashboard
                </Button>
                <Button 
                  variant="outline"
                  onClick={onLogout}
                  className="border-gray-600 text-[#B0B0B0] hover:text-white hover:border-gray-500 transition-all duration-200"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={onOpenLogin}
                  className="mr-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white hover:shadow-lg hover:shadow-[#4CAF50]/30 transition-all duration-200"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={onOpenSignup}
                  className="bg-[#4CAF50] hover:bg-[#45a049] text-white hover:shadow-lg hover:shadow-[#4CAF50]/40 transition-all duration-200"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-[#B0B0B0] hover:text-[#4CAF50] hover:bg-[#2C2C2C] transition-all duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                    currentPage === item.id
                      ? 'text-[#4CAF50] bg-[#2C2C2C]'
                      : 'text-[#B0B0B0] hover:text-[#4CAF50] hover:bg-[#2C2C2C]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 space-y-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#2C2C2C] border border-gray-700 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-medium">{user.name}</span>
                    </div>
                    <Button 
                      onClick={() => {
                        onNavigate('dashboard');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white hover:shadow-lg hover:shadow-[#4CAF50]/40 transition-all duration-200"
                    >
                      Dashboard
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full border-gray-600 text-[#B0B0B0] hover:text-white hover:border-gray-500 transition-all duration-200"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        onOpenLogin();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white hover:shadow-lg hover:shadow-[#4CAF50]/30 transition-all duration-200"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => {
                        onOpenSignup();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white hover:shadow-lg hover:shadow-[#4CAF50]/40 transition-all duration-200"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
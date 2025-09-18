import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Eye, EyeOff, User, Mail, Lock, CheckCircle } from 'lucide-react';

interface AuthModalsProps {
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  onCloseLogin: () => void;
  onCloseSignup: () => void;
  onSwitchToSignup: () => void;
  onSwitchToLogin: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export function AuthModals({
  isLoginOpen,
  isSignupOpen,
  onCloseLogin,
  onCloseSignup,
  onSwitchToSignup,
  onSwitchToLogin,
  onLoginSuccess
}: AuthModalsProps) {
  // Login state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup state
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [signupError, setSignupError] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Forgot password state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // Login handlers
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    // Mock authentication - replace with real API call
    setTimeout(() => {
      // Simulate authentication check
      if (loginData.email === 'demo@fitgen.com' && loginData.password === 'password123') {
        onLoginSuccess({ 
          name: 'Demo User', 
          email: loginData.email 
        });
        onCloseLogin();
        setLoginData({ email: '', password: '', rememberMe: false });
      } else {
        setLoginError('Invalid email or password');
      }
      setIsLoggingIn(false);
    }, 1500);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    setIsSigningUp(true);

    // Validation
    if (signupData.password !== signupData.confirmPassword) {
      setSignupError('Passwords do not match');
      setIsSigningUp(false);
      return;
    }

    if (signupData.password.length < 8) {
      setSignupError('Password must be at least 8 characters long');
      setIsSigningUp(false);
      return;
    }

    if (!signupData.acceptTerms) {
      setSignupError('Please accept the Terms of Service and Privacy Policy');
      setIsSigningUp(false);
      return;
    }

    // Mock signup - replace with real API call
    setTimeout(() => {
      setSignupSuccess(true);
      setIsSigningUp(false);
      
      // Auto-login after successful signup
      setTimeout(() => {
        onLoginSuccess({ 
          name: signupData.fullName, 
          email: signupData.email 
        });
        onCloseSignup();
        setSignupData({ fullName: '', email: '', password: '', confirmPassword: '', acceptTerms: false });
        setSignupSuccess(false);
      }, 2000);
    }, 1500);
  };

  const handleForgotPassword = () => {
    // Mock forgot password - replace with real implementation
    setShowForgotPassword(false);
    setForgotEmail('');
    // Show success message or redirect to email sent page
  };

  const isLoginValid = loginData.email && loginData.password;
  const isSignupValid = signupData.fullName && signupData.email && signupData.password && signupData.confirmPassword && signupData.acceptTerms;

  return (
    <>
      {/* Login Modal */}
      <Dialog open={isLoginOpen} onOpenChange={onCloseLogin}>
        <DialogContent className="bg-[#2C2C2C] border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              Sign In to FitGen
            </DialogTitle>
          </DialogHeader>

          {!showForgotPassword ? (
            <form onSubmit={handleLoginSubmit} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-white font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-[#1C1C1C] border-gray-600 text-white placeholder-gray-500 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-white font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-[#1C1C1C] border-gray-600 text-white placeholder-gray-500 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#4CAF50] transition-colors"
                  >
                    {showLoginPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={loginData.rememberMe}
                    onCheckedChange={(checked) => setLoginData(prev => ({ ...prev, rememberMe: checked as boolean }))}
                    className="border-gray-600 data-[state=checked]:bg-[#4CAF50] data-[state=checked]:border-[#4CAF50]"
                  />
                  <Label htmlFor="remember-me" className="text-[#B0B0B0] cursor-pointer">Remember me</Label>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-[#B0B0B0] hover:text-[#4CAF50] text-sm underline transition-colors"
                >
                  Forgot your password?
                </button>
              </div>

              {loginError && (
                <div className="text-[#FF6F00] text-sm text-center bg-[#FF6F00]/10 p-3 rounded-lg border border-[#FF6F00]/30">
                  {loginError}
                </div>
              )}

              <Button
                type="submit"
                disabled={!isLoginValid || isLoggingIn}
                className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-[#4CAF50]/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <User className="w-5 h-5 mr-3" />
                    Sign In
                  </>
                )}
              </Button>

              <div className="text-center pt-4">
                <p className="text-[#B0B0B0]">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToSignup}
                    className="text-[#4CAF50] hover:text-[#45a049] font-semibold underline transition-colors"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <div className="space-y-6 pt-4">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Reset Password</h3>
                <p className="text-[#B0B0B0]">Enter your email to receive a password reset link</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="forgot-email" className="text-white font-medium">Email Address</Label>
                <Input
                  id="forgot-email"
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="bg-[#1C1C1C] border-gray-600 text-white placeholder-gray-500 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowForgotPassword(false)}
                  variant="outline"
                  className="flex-1 border-gray-600 text-[#B0B0B0] hover:text-white hover:border-gray-500"
                >
                  Back
                </Button>
                <Button
                  onClick={handleForgotPassword}
                  disabled={!forgotEmail}
                  className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white"
                >
                  Send Reset Link
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Signup Modal */}
      <Dialog open={isSignupOpen} onOpenChange={onCloseSignup}>
        <DialogContent className="bg-[#2C2C2C] border-gray-700 text-white max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              Join FitGen
            </DialogTitle>
          </DialogHeader>

          {signupSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Account Created Successfully!</h3>
              <p className="text-[#B0B0B0] mb-6">
                Welcome to FitGen! You're being automatically signed in...
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4CAF50] mx-auto"></div>
            </div>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-white font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="bg-[#1C1C1C] border-gray-600 text-white placeholder-gray-500 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-white font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={signupData.email}
                    onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-[#1C1C1C] border-gray-600 text-white placeholder-gray-500 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-white font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="signup-password"
                    type={showSignupPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={signupData.password}
                    onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-[#1C1C1C] border-gray-600 text-white placeholder-gray-500 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#4CAF50] transition-colors"
                  >
                    {showSignupPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-white font-medium">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="bg-[#1C1C1C] border-gray-600 text-white placeholder-gray-500 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#4CAF50] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="accept-terms"
                  checked={signupData.acceptTerms}
                  onCheckedChange={(checked) => setSignupData(prev => ({ ...prev, acceptTerms: checked as boolean }))}
                  className="border-gray-600 data-[state=checked]:bg-[#4CAF50] data-[state=checked]:border-[#4CAF50] mt-1"
                />
                <Label htmlFor="accept-terms" className="text-[#B0B0B0] cursor-pointer text-sm leading-relaxed">
                  I agree to the{' '}
                  <a href="#" className="text-[#4CAF50] hover:text-[#45a049] underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-[#4CAF50] hover:text-[#45a049] underline">Privacy Policy</a>
                </Label>
              </div>

              {signupError && (
                <div className="text-[#FF6F00] text-sm text-center bg-[#FF6F00]/10 p-3 rounded-lg border border-[#FF6F00]/30">
                  {signupError}
                </div>
              )}

              <Button
                type="submit"
                disabled={!isSignupValid || isSigningUp}
                className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-[#4CAF50]/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSigningUp ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <User className="w-5 h-5 mr-3" />
                    Sign Up
                  </>
                )}
              </Button>

              <div className="text-center pt-4">
                <p className="text-[#B0B0B0]">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-[#4CAF50] hover:text-[#45a049] font-semibold underline transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
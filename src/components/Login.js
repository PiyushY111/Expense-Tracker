import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, Loader2, CheckCircle2, Key, AlertCircle, Shield, UserPlus } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { login, signup, googleSignIn } = useAuth();
  
  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(true);
    }, 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (isSignUp) {
        await signup(email, password);
        setSuccess('Account created! You can now log in.');
        setIsSignUp(false);
      } else {
        await login(email, password);
        setSuccess('Login successful! Redirecting...');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await googleSignIn();
      setSuccess('Login successful! Redirecting...');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-violet-800 p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-blue-500 opacity-20 blur-3xl -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 rounded-full bg-purple-500 opacity-20 blur-3xl -bottom-20 -right-20 animate-pulse"></div>
        <div className="absolute w-64 h-64 rounded-full bg-indigo-500 opacity-10 blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 border-t-4 border-l-4 border-white opacity-20 rounded-tl-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-b-4 border-r-4 border-white opacity-20 rounded-br-xl"></div>
      </div>

      <div className={`w-full max-w-md transform transition-all duration-700 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white border-opacity-20">
          <div className="relative">
            {/* Top design element */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-blue-600 to-violet-600 transform -skew-y-3 origin-top-left"></div>
            
            <div className="pt-16 pb-8 px-8 relative z-10">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg">
                <Shield className="w-10 h-10 text-indigo-600" />
              </div>

              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
                <p className="text-indigo-200 font-light">{isSignUp ? 'Sign up to get started' : 'Secure access to your dashboard'}</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500 bg-opacity-20 backdrop-blur-sm text-white rounded-xl border border-red-500 border-opacity-40 flex items-center animate-fade-in">
                  <AlertCircle className="w-5 h-5 mr-2 text-red-300" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-500 bg-opacity-20 backdrop-blur-sm text-white rounded-xl border border-green-500 border-opacity-40 flex items-center animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-300" />
                  <span>{success}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-indigo-100 mb-1 ml-1">
                    Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="relative bg-black bg-opacity-50 rounded-xl">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 w-5 h-5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full py-3 px-10 bg-transparent text-white placeholder-indigo-300 border-none rounded-xl ring-0 focus:ring-0 focus:outline-none"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-indigo-100 mb-1 ml-1">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="relative bg-black bg-opacity-50 rounded-xl">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full py-3 px-10 bg-transparent text-white placeholder-indigo-300 border-none rounded-xl ring-0 focus:ring-0 focus:outline-none"
                        placeholder={isSignUp ? "Create a password" : "Enter your password"}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-300 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {!isSignUp && (
                  <div className="flex justify-end">
                    <a href="#" className="text-sm text-indigo-300 hover:text-white transition-colors duration-300">
                      Forgot password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-xl shadow-lg shadow-indigo-900/50 hover:shadow-indigo-900/75 hover:from-blue-700 hover:to-violet-700 transition-all duration-300 overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                  <span className="relative flex items-center justify-center">
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : isSignUp ? (
                      <UserPlus className="w-5 h-5 mr-2" />
                    ) : (
                      <Key className="w-5 h-5 mr-2" />
                    )}
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                  </span>
                </button>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-indigo-300 border-opacity-20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-transparent text-indigo-300">
                      Or continue with
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="mt-6 w-full py-3 px-6 bg-white bg-opacity-10 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center border border-white border-opacity-10"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
                </button>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-indigo-300 hover:text-white transition-colors duration-300"
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
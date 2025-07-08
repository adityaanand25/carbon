import React, { useState } from 'react';
import { Leaf, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const { signUp, signIn, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      const result = await signUp(formData);
      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setIsSignUp(false);
        }, 3000);
      }
    } else {
      await signIn(formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-slate-50/90 via-blue-50/80 to-indigo-50/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-10 max-w-md w-full text-center relative overflow-hidden">
          {/* Gloss overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-20 h-20 bg-emerald-200/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-200/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="bg-gradient-to-br from-emerald-100 to-green-200 p-6 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center shadow-lg border border-emerald-200/50">
              <CheckCircle className="h-12 w-12 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-6">
              Check Your Email!
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              We've sent you a confirmation link at <strong className="text-emerald-600">{formData.email}</strong>. 
              Please check your email and click the link to activate your account.
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                setIsSignUp(false);
              }}
              className="w-full bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 hover:from-emerald-600 hover:via-green-700 hover:to-teal-700 text-white py-4 rounded-2xl transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10">Back to Sign In</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-50/90 via-blue-50/80 to-indigo-50/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden max-w-5xl w-full">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Side - Branding with Gloss Effect */}
          <div className="lg:w-1/2 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 p-8 lg:p-12 text-white flex flex-col justify-center relative overflow-hidden">
            {/* Gloss overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/30">
                    <Leaf className="h-10 w-10 text-emerald-100 drop-shadow-lg" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent drop-shadow-lg">
                      Carbon Tracker
                    </h1>
                    <p className="text-emerald-100/90 text-lg font-medium">Track. Reduce. Sustain.</p>
                  </div>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                  {isSignUp ? 'Start Your Eco Journey' : 'Welcome Back!'}
                </h2>
                <p className="text-emerald-100/90 text-lg mb-10 leading-relaxed">
                  {isSignUp 
                    ? 'Join thousands of users making a positive impact on our planet. Track your carbon footprint and discover ways to live more sustainably.'
                    : 'Continue your sustainability journey and see how your actions are making a difference for our planet.'
                  }
                </p>
              </div>

              {/* Features with Glass Effect */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="bg-emerald-400/30 p-3 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-lg font-medium">Real-time carbon footprint tracking</span>
                </div>
                <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="bg-emerald-400/30 p-3 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-lg font-medium">Personalized eco-friendly recommendations</span>
                </div>
                <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="bg-emerald-400/30 p-3 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-lg font-medium">Community challenges and achievements</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form with Glass Effect */}
          <div className="lg:w-1/2 p-8 lg:p-12 bg-gradient-to-br from-slate-100/70 via-blue-50/60 to-indigo-100/70 backdrop-blur-sm relative overflow-hidden">
            {/* Additional contrast elements */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-200/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-200/15 rounded-full blur-2xl"></div>
            
            <div className="max-w-md mx-auto relative z-10">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-3">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </h3>
                <p className="text-gray-600 text-lg">
                  {isSignUp 
                    ? 'Fill in your details to get started'
                    : 'Enter your credentials to continue'
                  }
                </p>
              </div>

              {error && (
                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-2xl p-4 mb-6 shadow-lg">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {isSignUp && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-500" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required={isSignUp}
                        className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-emerald-200/50 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-800 placeholder-gray-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-emerald-200/50 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-800 placeholder-gray-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-14 py-4 bg-white/70 backdrop-blur-sm border border-emerald-200/50 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-800 placeholder-gray-500"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-500 hover:text-emerald-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {isSignUp && (
                    <p className="text-xs text-gray-500 mt-2 ml-1">
                      Password must be at least 6 characters long
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 hover:from-emerald-600 hover:via-green-700 hover:to-teal-700 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 text-white py-4 rounded-2xl transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {loading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                  ) : (
                    <>
                      <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600 text-lg">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="ml-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors hover:underline"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>

              {!isSignUp && (
                <div className="mt-6 text-center">
                  <button className="text-sm text-gray-500 hover:text-emerald-600 transition-colors font-medium">
                    Forgot your password?
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
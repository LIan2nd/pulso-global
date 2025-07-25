import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaCheck, FaArrowLeft } from 'react-icons/fa6';
import InputText from '../../components/Form/InputText';
import { useAuth } from '../../contexts/AuthContext';
import ForgotPassword from './ForgotPassword';
import HomeButton from '../../components/Navigate/HomeButton';

// Main Login Component
const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated, getUserByEmail } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setErrors({
        general: error || 'Login failed. Please try again.'
      });
    }
  };

  // Forgot Password Modal
  if (showForgotPassword) {
    return <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
  }

  return (
    <div className="w-full max-w-md mx-auto">

      <HomeButton />

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
          <FaUser className="text-2xl text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400">Sign in to your Pulso Global account</p>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10"
      >
        {/* General Error */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-400/20 rounded-lg">
            <p className="text-red-400 text-sm text-center">{errors.general}</p>
          </div>
        )}

        {/* Email Input */}
        <InputText
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          label="Email Address"
          icon={FaUser}
          error={errors.email}
          required
        />

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.password ? 'border-red-400' : 'border-gray-600'
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
            >
              {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">{errors.password}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-end mb-6">

          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
          >
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${isLoading
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:scale-105 shadow-lg hover:shadow-purple-500/25'
            }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25"></circle>
                <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </div>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-400 pt-6">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
          >
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { FaLock, FaUser } from 'react-icons/fa6';

const ForgotPassword = ({ setShowForgotPassword }) => {
  const [forgotEmail, setForgotEmail] = useState("");
  const { getUserByEmail } = useAuth();

  const handleForgotPassword = () => {
    if (!forgotEmail) {
      alert('Please enter your email address first');
      return;
    }

    const user = getUserByEmail(forgotEmail);
    if (!user) {
      alert('No account found with this email address');
      return;
    }

    // Show user data from localStorage (demo purposes)
    const userData = {
      name: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      registeredAt: new Date(user.registeredAt).toLocaleString(),
      // Decode password for demo (in real app, send reset email)
      password: atob(user.passwordHash)
    };

    alert(`Account found!\n\nName: ${userData.name}\nEmail: ${userData.email}\nRegistered: ${userData.registeredAt}\n\nFor demo purposes, your password is: ${userData.password}\n\n(In a real application, we would send a password reset email instead of showing the password)`);

    setShowForgotPassword(false);
    setForgotEmail("");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
          <FaLock className="text-2xl text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Forgot Password</h1>
        <p className="text-gray-400">Enter your email to retrieve your account information</p>
      </div>

      <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleForgotPassword}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105"
          >
            Retrieve Account Info
          </button>

          <button
            onClick={() => setShowForgotPassword(false)}
            className="w-full py-3 px-4 border border-gray-600 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;
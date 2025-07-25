import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const currentUser = localStorage.getItem('currentUserData');

      if (currentUser) {
        const userData = JSON.parse(currentUser);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setIsLoading(true);

      // Check if email already exists
      const existingUsers = JSON.parse(localStorage.getItem('usersData') || '[]');
      if (existingUsers.some(user => user.email === userData.email.toLowerCase().trim())) {
        throw new Error('This email is already registered');
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create new user object
      const newUser = {
        id: Date.now().toString(),
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        email: userData.email.toLowerCase().trim(),
        phone: userData.phone.trim(),
        dateOfBirth: userData.dateOfBirth,
        passwordHash: btoa(userData.password), // Simple encoding for demo
        registeredAt: new Date().toISOString(),
      };

      // Add new user to existing users
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('usersData', JSON.stringify(updatedUsers));

      // Set current user (auto login after registration)
      localStorage.setItem('currentUserData', JSON.stringify(newUser));
      localStorage.setItem('rememberMe', 'true');

      setUser(newUser);
      setIsAuthenticated(true);

      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email, password, rememberMe = false) => {
    try {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get all users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('usersData') || '[]');

      // Find user by email
      const foundUser = existingUsers.find(
        user => user.email === email.toLowerCase().trim()
      );
      const storedPassword = atob(foundUser.passwordHash);

      if (!foundUser || storedPassword !== password) {
        throw new Error('Email or Password is wrong');
      }

      // Update last login
      const updatedUser = {
        ...foundUser,
        lastLoginAt: new Date().toISOString()
      };

      // Update user in the users array
      const updatedUsers = existingUsers.map(user =>
        user.id === foundUser.id ? updatedUser : user
      );
      localStorage.setItem('usersData', JSON.stringify(updatedUsers));

      // Set current user session
      localStorage.setItem('currentUserData', JSON.stringify(updatedUser));
      localStorage.setItem('rememberMe', rememberMe.toString());

      setUser(updatedUser);
      setIsAuthenticated(true);

      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('currentUserData');
    localStorage.removeItem('rememberMe');
    setUser(null);
    setIsAuthenticated(false);
  };

  const getUserByEmail = (email) => {
    const existingUsers = JSON.parse(localStorage.getItem('usersData') || '[]');
    return existingUsers.find(user => user.email === email.toLowerCase().trim());
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    checkAuthStatus,
    getUserByEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
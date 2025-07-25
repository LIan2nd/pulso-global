import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  // Check auth status on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = localStorage.getItem('currentUserData');
        const rememberMe = localStorage.getItem('rememberMe') === 'true';

        if (currentUser && rememberMe) {
          const userData = JSON.parse(currentUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('currentUserData');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Helper function to safely parse localStorage data
  const getLocalStorageData = (key, defaultValue = []) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error(`Error parsing ${key}:`, error);
      return defaultValue;
    }
  };

  // Register new user
  const register = async (userData) => {
    try {
      setIsLoading(true);

      // Normalize and validate input
      const email = userData.email.toLowerCase().trim();
      const password = userData.password.trim();
      const firstName = userData.firstName.trim();
      const lastName = userData.lastName.trim();

      if (!email || !password || !firstName || !lastName) {
        throw new Error('All fields are required');
      }

      // Check for existing user
      const existingUsers = getLocalStorageData('usersData');
      const emailExists = existingUsers.some(user => user.email === email);

      if (emailExists) {
        throw new Error('Email already registered');
      }

      // Create new user (in a real app, passwords should be hashed server-side)
      const newUser = {
        id: Date.now().toString(),
        firstName,
        lastName,
        email,
        phone: userData.phone?.trim() || '',
        dateOfBirth: userData.dateOfBirth || '',
        passwordHash: btoa(password), // Simple encoding for demo ONLY
        registeredAt: new Date().toISOString(),
      };

      // Update storage
      localStorage.setItem('usersData', JSON.stringify([...existingUsers, newUser]));
      localStorage.setItem('currentUserData', JSON.stringify(newUser));
      localStorage.setItem('rememberMe', 'true');

      // Update state
      setUser(newUser);
      setIsAuthenticated(true);
      navigate('/'); // Redirect after registration

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // User login
  const login = async (email, password, rememberMe = false) => {
    try {
      setIsLoading(true);

      // Normalize input
      email = email.toLowerCase().trim();
      password = password.trim();

      // Find user
      const existingUsers = getLocalStorageData('usersData');
      const user = existingUsers.find(u => u.email === email);

      if (!user || atob(user.passwordHash) !== password) {
        throw new Error('Invalid email or password');
      }

      // Update storage
      localStorage.setItem('currentUserData', JSON.stringify(user));
      localStorage.setItem('rememberMe', rememberMe.toString());

      // Update state
      setUser(user);
      setIsAuthenticated(true);
      navigate('/'); // Redirect after login

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // User logout
  const logout = () => {
    localStorage.removeItem('currentUserData');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page
  };

  // Public context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
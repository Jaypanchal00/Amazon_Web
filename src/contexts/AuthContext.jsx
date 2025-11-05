import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to base64url-encode a JSON object
  const toBase64Url = (obj) => {
    const json = JSON.stringify(obj);
    return btoa(json)
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  useEffect(() => {
    // Check for existing token
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp * 1000 > Date.now()) {
          setUser(JSON.parse(userData));
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Token decode error:', error);
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Enforce signup-before-login
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = registeredUsers.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      return { success: false, message: 'Invalid credentials. Please sign up first or check your email/password.' };
    }

    const mockUser = foundUser.userData;

    // Create a proper mock JWT (header.payload.signature) so jwt-decode can parse it
    const header = { alg: 'none', typ: 'JWT' };
    const payload = {
      userId: mockUser.id,
      email: mockUser.email,
      // 30 days expiry
      exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60
    };
    const token = `${toBase64Url(header)}.${toBase64Url(payload)}.signature`;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    return { success: true, user: mockUser };
  };

  const signup = (name, email, password, phone) => {
    // Prevent duplicate accounts
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (registeredUsers.some(u => u.email === email)) {
      return { success: false, message: 'Email already registered. Please login or use another email.' };
    }

    // Mock signup - Store user data but DON'T auto-login
    const mockUser = {
      id: Date.now(),
      name: name,
      email: email,
      phone: phone,
      isPrime: false,
      addresses: []
    };

    registeredUsers.push({
      email: email,
      password: password,
      userData: mockUser
    });
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

    return { success: true, message: 'Account created successfully! Please login to continue.' };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const addAddress = (address) => {
    const addresses = user.addresses || [];
    const newAddress = {
      id: Date.now(),
      ...address,
      isDefault: addresses.length === 0
    };
    const updatedUser = {
      ...user,
      addresses: [...addresses, newAddress]
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const updateAddress = (addressId, updatedAddress) => {
    const addresses = user.addresses.map(addr =>
      addr.id === addressId ? { ...addr, ...updatedAddress } : addr
    );
    const updatedUser = { ...user, addresses };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const deleteAddress = (addressId) => {
    const addresses = user.addresses.filter(addr => addr.id !== addressId);
    const updatedUser = { ...user, addresses };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    addAddress,
    updateAddress,
    deleteAddress,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

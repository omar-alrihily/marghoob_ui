'use client'; // ضروري جداً لأن الـ Context والـ useEffect يعملان فقط في الطرف العميل

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true); // إضافة حالة تحميل لمنع وميض تسجيل الدخول

  // دالة جلب المنشورات (استخدام useCallback لمنع إعادة الإنشاء غير الضرورية)
  const fetchUserPosts = useCallback(async (token) => {
    try {
      const response = await axios.get('https://api.marghob.net/myinputs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // إذا كان التوكن منتهي الصلاحية (401)، يفضل عمل logout تلقائي
      if (error.response?.status === 401) logout();
      setUserPosts([]);
    }
  }, []);

  // التحقق من حالة المستخدم عند تشغيل التطبيق
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if (token && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
      fetchUserPosts(token);
    }
    setLoading(false);
  }, [fetchUserPosts]);

  const refreshPosts = () => {
    const token = localStorage.getItem('token');
    if (token) fetchUserPosts(token);
  };

  const login = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setIsAuthenticated(true);
    setUsername(username);
    fetchUserPosts(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
    setUserPosts([]);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      username, 
      userPosts, 
      refreshPosts,
      loading // نمررها لنعرف متى انتهى التحقق من الـ localStorage
    }}>
      {children}
    </AuthContext.Provider>
  );
};
'use client'; 

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/app/components/AuthContext'; 
import { useRouter } from 'next/navigation'; 




const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://api.marghob.net/login', { 
        usernameOrEmail, 
        password 
      });
      
      const { token } = response.data;
      
      // تحديث حالة الـ Context والـ LocalStorage
      login(token, usernameOrEmail); 

      // التوجيه لصفحة الترحيب (Welcome Page)
      // تأكد أنك أنشأت ملف في المسار app/welcome/page.js
      router.push('/welcome'); 
      
      // عمل refresh للتأكد من تحديث حالة الـ Navbar فوراً
      router.refresh(); 
      
    } catch (error) {
      console.error('Error details:', error);
      if (error.response) {
        if (error.response.status === 400) {
          setError('اسم المستخدم/البريد الإلكتروني أو كلمة المرور غير صحيحة');
        } else {
          setError(`خطأ: ${error.response.data.message || 'حدث خطأ ما'}`);
        }
      } else {
        setError('تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 bg-sky-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-cyan-800">تسجيل الدخول</h2>
        
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">اسم المستخدم أو البريد الإلكتروني</label>
            <input
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-right"
              dir="rtl"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-right"
              dir="rtl"
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-right">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full py-2 mt-4 text-white bg-cyan-700 rounded-lg hover:bg-cyan-600 transition-colors disabled:bg-gray-400 font-bold" 
            disabled={loading}
          >
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
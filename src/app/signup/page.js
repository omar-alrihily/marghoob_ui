'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/app/components/AuthContext'; // تأكد من المسار
import { useRouter } from 'next/navigation';



const SignupPage = () => {
  const [username, setUsernameInput] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordConditions, setShowPasswordConditions] = useState(false);
  const [passwordConditions, setPasswordConditions] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  const { login } = useAuth();
  const router = useRouter();

  const validatePassword = (password) => {
    const conditions = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    };
    setPasswordConditions(conditions);
    return Object.values(conditions).every(Boolean);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // إظهار الشروط إذا كانت كلمة المرور غير مستوفية
    setShowPasswordConditions(!validatePassword(newPassword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== repeatPassword) {
      setError('كلمتا المرور غير متطابقتين.');
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError('يرجى التأكد من أن كلمة المرور تستوفي جميع الشروط.');
      setLoading(false);
      setShowPasswordConditions(true);
      return;
    }

    try {
      const response = await axios.post('https://api.marghob.net/signup', { 
        username, 
        email, 
        password 
      });
      
      const { token } = response.data;
      
      // تحديث الحالة في Context (والذي بدوره سيخزن في LocalStorage)
      login(token, username); 
      
      // التوجيه السلس للصفحة الرئيسية
       router.push('/welcome'); 
      router.refresh();
      
    } catch (error) {
      console.error('Sign up error:', error);
      if (error.response) {
        setError(error.response.data.message || 'تفاصيل التسجيل غير صحيحة');
      } else {
        setError('تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <div className="w-full max-w-md p-8 bg-sky-100 rounded-lg shadow-md my-10">
        <h2 className="text-2xl font-bold text-center text-cyan-800">إنشاء حساب جديد</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">اسم المستخدم</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsernameInput(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">تأكيد كلمة المرور</label>
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          {showPasswordConditions && (
            <div className="bg-white/50 p-3 rounded-lg mb-4 border border-cyan-200">
              <p className="text-xs font-bold mb-2 text-cyan-900">شروط كلمة المرور:</p>
              <ul className="text-xs space-y-1">
                <ConditionItem met={passwordConditions.length} text="8 أحرف على الأقل" />
                <ConditionItem met={passwordConditions.uppercase} text="حرف كبير واحد (A-Z)" />
                <ConditionItem met={passwordConditions.lowercase} text="حرف صغير واحد (a-z)" />
                <ConditionItem met={passwordConditions.digit} text="رقم واحد على الأقل" />
                <ConditionItem met={passwordConditions.specialChar} text="رمز خاص (!@#$%^&*)" />
              </ul>
            </div>
          )}

          {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded border border-red-200 text-center">{error}</p>}

          <button 
            type="submit" 
            className="w-full py-2 mt-2 text-white bg-cyan-700 rounded-lg hover:bg-cyan-600 transition-colors disabled:bg-gray-400 font-bold" 
            disabled={loading}
          >
            {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
          </button>
        </form>
      </div>
    </div>
  );
};

// مكون صغير لتنسيق شروط كلمة المرور
const ConditionItem = ({ met, text }) => (
  <li className={`flex items-center gap-2 ${met ? 'text-green-600' : 'text-red-500'}`}>
    <span>{met ? '✓' : '○'}</span>
    {text}
  </li>
);

export default SignupPage;
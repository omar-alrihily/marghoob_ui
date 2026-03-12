'use client';

import React, { useState } from 'react';
import PostList from '@/app/components/PostList';
import InputForm from '@/app/components/InputForm'; // الفورم الذي صممناه سابقاً
import { useAuth } from '@/app/components/AuthContext';
import { Plus, LayoutDashboard, FileText, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardPage = () => {
  const { userPosts, username } = useAuth();
  const [isAddingPost, setIsAddingPost] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-20 font-[tajawal]" dir="rtl">
      <div className="container mx-auto max-w-7xl px-4">
        
        {/* رأس لوحة التحكم */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <LayoutDashboard className="text-cyan-700" size={32} />
              لوحة التحكم
            </h1>
            <p className="text-gray-500 mt-2">أهلاً بك مجدداً، {username}. إليك ملخص نشاطك.</p>
          </div>

          <button
            onClick={() => setIsAddingPost(true)}
            className="flex items-center justify-center gap-2 bg-cyan-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-cyan-100 hover:bg-cyan-800 transition-all active:scale-95"
          >
            <Plus size={20} />
            إضافة منشور جديد
          </button>
        </div>

        {/* بطاقات الإحصائيات السريعة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-cyan-700 bg-cyan-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <FileText size={24} />
            </div>
            <div className="text-2xl font-black text-gray-900">{userPosts?.length || 0}</div>
            <div className="text-gray-500 text-sm">إجمالي المنشورات</div>
          </div>
          {/* يمكنك إضافة المزيد من البطاقات هنا مستقبلاً (مثل عدد المشاهدات) */}
        </div>

        {/* قائمة المنشورات */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 bg-white">
            <h3 className="text-xl font-bold text-gray-800">إدارة المنشورات الحالية</h3>
          </div>
          <PostList />
        </div>
      </div>

      {/* نافذة إضافة منشور جديد (Modal) */}
      <AnimatePresence>
        {isAddingPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingPost(false)}
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl z-[110] overflow-hidden"
            >
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">أنشئ منشوراً جديداً</h2>
                <button onClick={() => setIsAddingPost(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <Plus size={24} className="rotate-45 text-gray-400" />
                </button>
              </div>
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                {/* هنا استدعينا الفورم الخاص بك */}
                <InputForm onSuccess={() => setIsAddingPost(false)} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
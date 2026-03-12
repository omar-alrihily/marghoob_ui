"use client"; // ضروري لاستخدام الـ Hooks مثل useAuth

import React from 'react';
import PostItem from './PostItem'; 
// ملاحظة: تأكد من صحة مسار استيراد AuthContext حسب هيكلة مشروعك في نكست
import { useAuth } from './AuthContext'; 

const PostList = () => {
  // جلب البيانات والدالة من السياق
  const { userPosts, refreshPosts } = useAuth();

  const onPostUpdated = () => {
    // تحديث القائمة بعد نجاح أي عملية تعديل في PostItem
    refreshPosts(); 
  };

  return (
    <div className='p-6 flex flex-col items-center min-h-screen' dir="rtl">
      <div className='max-w-6xl w-full space-y-12'>
        
        {/* العناوين */}
        <div className="text-right border-r-4 border-cyan-700 pr-4">
          <h2 className="text-3xl font-bold text-cyan-700">منشوراتك</h2>
          <p className="text-gray-500 mt-2">إدارة وتعديل منشوراتك الحالية</p>
        </div>

        {/* شبكة العرض (Grid) */}
        {userPosts && userPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPosts.map(post => (
              <PostItem 
                key={post._id} 
                post={post} 
                onPostUpdated={onPostUpdated} 
              />
            ))}
          </div>
        ) : (
          /* حالة عدم وجود منشورات */
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
            <p className="text-gray-400 text-lg">لا توجد منشورات حالياً.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;
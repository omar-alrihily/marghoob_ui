"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const PostItem = ({ post, onPostUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: post.name,
    job: post.job,
    city: post.city,
    salary: post.salary,
    mobileNumber: post.mobileNumber,
    description: post.description,
  });
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors('');

    try {
      // التأكد من الوصول لـ localStorage بأمان في Next.js
      const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
      
      await axios.put(
        `https://api.marghob.net/inputs/${post._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      onPostUpdated(); 
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
      if (error.response?.data?.message) {
        setErrors(error.response.data.message);
      } else {
        setErrors('حدث خطأ أثناء التحديث، يرجى المحاولة لاحقاً');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setErrors('');
  };

  return (
    <div className="container mx-auto p-4" dir="rtl">
      {/* بطاقة المنشور العارضة */}
      <div
        className="border bg-cyan-700 flex flex-col items-center text-center p-6 shadow-lg rounded-xl transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer group"
        onClick={() => setIsEditing(true)}
      >
        <h3 className="text-xl font-bold mb-3 text-white border-b border-cyan-600 pb-2 w-full">
          {post.name}
        </h3>
        
        <div className="space-y-1 text-cyan-50">
          <p className="text-sm"><strong>العمل:</strong> {post.job}</p>
          <p className="text-sm"><strong>المدينة:</strong> {post.city}</p>
          <p className="text-sm"><strong>السعر بالساعة:</strong> {post.salary}</p>
          <p className="text-sm"><strong>رقم الجوال:</strong> {post.mobileNumber}</p>
          <p className="text-sm mt-3 opacity-90 italic">"{post.description}"</p>
        </div>

        <div className="flex flex-wrap justify-center mt-4 gap-2">
          {post.photos.slice(0, 2).map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt="معاينة"
              className="w-20 h-20 object-cover rounded-lg border-2 border-white/20"
            />
          ))}
        </div>
        <span className="text-xs text-cyan-200 mt-4 underline opacity-0 group-hover:opacity-100 transition-opacity">
          اضغط للتعديل
        </span>
      </div>

      {/* نافذة التعديل (Modal) */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* الخلفية المعتمة */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={handleCloseModal}
            />

            {/* محتوى النافذة */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white p-6 w-full max-w-lg z-20 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-cyan-700 text-right">
                  تحديث بيانات المحترف
                </h2>

                {errors && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-right">
                    {errors}
                  </div>
                )}

                <div className="space-y-3 text-right">
                  <div className="p-2 bg-gray-50 border rounded-lg text-gray-500 font-bold">
                    الاسم: {post.name}
                  </div>

                  <input
                    type="text"
                    name="job"
                    value={formData.job}
                    onChange={handleChange}
                    placeholder="العمل"
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="المدينة"
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />

                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="السعر بالساعة"
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />

                  <div className="p-2 bg-gray-50 border rounded-lg text-gray-500">
                    رقم الجوال: {post.mobileNumber}
                  </div>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="الوصف"
                    rows="4"
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="flex flex-wrap gap-2 py-2">
                  {post.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt="Post"
                      className="w-16 h-16 object-cover rounded-md shadow-sm"
                    />
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 p-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 disabled:bg-gray-400 transition-colors font-bold"
                  >
                    {loading ? 'جاري التحديث...' : 'حفظ التعديلات'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostItem;
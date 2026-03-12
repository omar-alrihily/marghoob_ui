"use client"; // ضروري في Next.js للأجزاء التفاعلية

import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";

export default function InputForm() {
  const [inputData, setInputData] = useState({
    name: '',
    job: '',
    city: '',
    salary: '',
    mobileNumber: '',
    description: '',
  });

  const [photos, setPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validTypes = ['image/jpeg', 'image/png'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      setError('فقط صور JPEG و PNG مسموح بها.');
      return;
    }

    setPhotos(files);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (isNaN(inputData.salary)) {
      setError('يجب أن يكون السعر رقماً');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    Object.keys(inputData).forEach(key => {
      formData.append(key, inputData[key]);
    });

    photos.forEach((photo) => {
      formData.append('photos', photo);
    });

    try {
      // في Next.js نتأكد من وجود النافذة قبل الوصول لـ localStorage
      const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
      
      const response = await axios.post('https://api.marghob.net/inputs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Success:', response.data);
      
      // إعادة تعيين البيانات
      setInputData({
        name: '', job: '', city: '', salary: '', mobileNumber: '', description: '',
      });
      setPhotos([]);
      setShowModal(false);
    } catch (error) {
      console.error('Error:', error);
      setError('حدث خطأ أثناء إرسال البيانات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-10 text-center' dir="rtl"> 
      <h2 className="text-3xl font-semibold mb-4 text-cyan-700">ابداعك يستمر معنا</h2>
      <p className='font-bold m-10 text-lg text-gray-600'>المنشور الواضح والمحدد يساعدك في جذب عملاء أكثر</p>
      
      <button
        onClick={() => setShowModal(true)}
        className="p-2 bg-gray-400 text-white rounded hover:bg-cyan-900 px-10 text-lg mb-10 transition-colors"
      >
        أضف منشورك
      </button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white p-6 w-full max-w-md rounded-xl shadow-2xl z-20 overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-2xl font-bold mb-6 text-cyan-700 border-b pb-2">بيانات المحترف</h2>

              {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-600 rounded text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-right">
                <div>
                  <label className="block text-sm font-medium mb-1">الإسم:</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={inputData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">العمل:</label>
                  <select
                    name='job'
                    required
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg appearance-none"
                  >
                    <option value="">اختر الخدمة</option>
                    <option value="مصور">مصور</option>
                    <option value="رسام جداريات">رسام جداريات</option>
                    <option value="كهربائي">كهربائي</option>
                    <option value="سباك">سباك</option>
                    <option value="منسق حفلات">منسق حفلات</option>
                    <option value="ميكانيكي سيارات">ميكانيكي سيارات</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">المدينة:</label>
                  <select
                    name="city"
                    required
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">اختر المدينة</option>
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="مكة">مكة</option>
                    <option value="المدينة المنورة">المدينة المنورة</option>
                    {/* ... باقي المدن */}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">السعر / ساعة:</label>
                    <input
                      type="number"
                      name="salary"
                      value={inputData.salary}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">الجوال:</label>
                    <input
                      type="text"
                      name="mobileNumber"
                      value={inputData.mobileNumber}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">الوصف:</label>
                  <textarea
                    name="description"
                    rows="3"
                    value={inputData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">الصور:</label>
                  <input
                    type="file"
                    multiple
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-500 file:ml-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 p-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 disabled:bg-gray-300 transition-colors"
                  >
                    {loading ? 'جاري الإرسال...' : 'إنشاء المنشور'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
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
}
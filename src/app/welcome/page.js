'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/app/components/AuthContext';
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, CheckCircle, ArrowLeft, X, Camera, Send } from 'lucide-react';




const WelcomePage = () => {
  const { username } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // حالة بيانات الفورم
  const [inputData, setInputData] = useState({
    name: '', job: '', city: '', salary: '', mobileNumber: '', description: '',
  });
  const [photos, setPhotos] = useState([]);

  // معالجة المدخلات
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    Object.keys(inputData).forEach(key => formData.append(key, inputData[key]));
    photos.forEach(photo => formData.append('photos', photo));

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
      await axios.post('https://api.marghob.net/inputs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setShowModal(false);
      alert("تم نشر عرضك بنجاح!");
    } catch (err) {
      setError('حدث خطأ أثناء إرسال البيانات، يرجى المحاولة لاحقاً');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  font-[tajawal] pb-20" dir="rtl">
      
      {/* 1. قسم الترحيب الرئيسي */}
      <div className="pt-32 pb-16 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-cyan-50 rounded-2xl">
              <Sparkles className="w-10 h-10 text-cyan-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            أهلاً بك في مرغوب، <span className="text-cyan-600">{username || 'أيها المحترف'}</span>
          </h1>
          
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            مجتمعك الجديد بانتظار مهاراتك. ابدأ الآن بإنشاء أول منشور لك لتظهر لآلاف العملاء في مدينتك.
          </p>
          
          <button
            onClick={() => setShowModal(true)}
            className="group flex items-center gap-4 mx-auto bg-cyan-700 text-white font-bold py-5 px-14 rounded-2xl hover:bg-cyan-800 transition-all shadow-xl shadow-cyan-100 active:scale-95 text-xl"
          >
            ابدأ مشروعك الآن
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* 2. قسم المميزات البسيط */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6 py-16 border-y border-gray-50">
        {[
          { icon: <MapPin />, title: "استهداف مدينتك", desc: "نصل بك للعملاء الأقرب إليك" },
          { icon: <CheckCircle />, title: "ثقة واحترافية", desc: "ملف شخصي يبرز سابقة أعمالك" },
          { icon: <Sparkles />, title: "نمو مستمر", desc: "فرص عمل جديدة يومياً" }
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center group">
            <div className="text-gray-300 group-hover:text-cyan-600 transition-colors mb-4 italic">
              {React.cloneElement(item.icon, { size: 32 })}
            </div>
            <h4 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h4>
            <p className="text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 3. نافذة الفورم المنبثقة (Modal) */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl z-[110] overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* رأس النافذة */}
              <div className="flex items-center justify-between p-6 border-b border-gray-50">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">تفاصيل منشورك الأول</h2>
                  <p className="text-gray-400 text-sm">املأ البيانات بدقة لجذب انتباه العملاء</p>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="text-gray-400" />
                </button>
              </div>

              {/* محتوى الفورم */}
              <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
                {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 mr-1">اسمك المهني</label>
                    <input name="name" required value={inputData.name} onChange={handleChange} placeholder="مثال: أحمد للتصوير الفوتوغرافي" className="w-full p-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 mr-1">نوع الخدمة</label>
                    <select name="job" required onChange={handleChange} className="w-full p-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none appearance-none">
                      <option value="">اختر مهاراتك</option>
                      <option value="مصور">مصور</option>
                      <option value="كهربائي">كهربائي</option>
                      <option value="سباك">سباك</option>
                      <option value="منسق حفلات">منسق حفلات</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 mr-1">المدينة</label>
                    <select name="city" required onChange={handleChange} className="w-full p-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none appearance-none">
                      <option value="">اختر المدينة</option>
                      <option value="الرياض">الرياض</option>
                      <option value="جدة">جدة</option>
                      <option value="المدينة المنورة">المدينة المنورة</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 mr-1">السعر (ريال)</label>
                    <input type="number" name="salary" value={inputData.salary} onChange={handleChange} placeholder="0.00" className="w-full p-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 mr-1">رقم التواصل</label>
                    <input type="text" name="mobileNumber" value={inputData.mobileNumber} onChange={handleChange} placeholder="05xxxxxxxx" className="w-full p-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-left" dir="ltr" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 mr-1">وصف مهاراتك</label>
                  <textarea name="description" rows="3" value={inputData.description} onChange={handleChange} placeholder="تحدث عن خبرتك وما يميز خدماتك..." className="w-full p-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none resize-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 mr-1 text-center block">أضف صوراً لأعمالك (اختياري)</label>
                  <div className="relative group cursor-pointer border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-cyan-300 hover:bg-cyan-50/30 transition-all">
                    <input type="file" multiple accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="flex flex-col items-center gap-2">
                      <Camera className="text-gray-300 group-hover:text-cyan-500 transition-colors" size={32} />
                      <span className="text-sm text-gray-400">اسحب الصور هنا أو اضغط للاختيار</span>
                      {photos.length > 0 && <span className="text-xs font-bold text-cyan-600">تم اختيار {photos.length} صور</span>}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-cyan-700 text-white rounded-2xl font-bold text-lg hover:bg-cyan-800 shadow-xl shadow-cyan-100 disabled:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'جاري النشر...' : (
                    <>
                      نشر المنشور الآن
                      <Send size={18} className="rotate-180" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WelcomePage;
'use client';

import React, { useState } from 'react';
import InputForm from '@/app/components/InputForm'; // تأكد من المسار الصحيح
import { useAuth } from '@/app/components/AuthContext';
import { Sparkles, MapPin, CheckCircle } from 'lucide-react'; // اختيارية: مكتبة أيقونات

const WelcomePage = () => {
  const { user } = useAuth(); // لنفترض أن الـ context يعيد بيانات المستخدم
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen  pb-12">
      {/* القسم العلوي: رسالة الترحيب */}
      <div className="bg-gradient-to-r from-cyan-700 to-sky-600 py-16 px-4 text-center text-white shadow-lg">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block p-3 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
            <Sparkles className="w-8 h-8 text-yellow-300" />
          </div>
          <h1 className="text-4xl font-extrabold mb-4">
            أهلاً بك في عائلة مرغوب، {user?.username || 'أيها المحترف'}! 🚀
          </h1>
          <p className="text-xl text-sky-100 mb-8 leading-relaxed">
            لقد اتخذت الخطوة الأولى للوصول إلى عملاء جدد في مدينتك. 
            الآن، حان الوقت لتخبر الجميع بما يمكنك القيام به.
          </p>
          
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-white text-cyan-700 font-bold py-4 px-10 rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
            >
              ابدأ بإضافة أول منشور الآن
            </button>
          )}
        </div>
      </div>

      {/* قسم الإحصائيات السريعة / المميزات (لتعزيز الثقة) */}
      <div className="max-w-5xl mx-auto -mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {[
          { icon: <MapPin />, text: "ظهور في محيط مدينتك" },
          { icon: <CheckCircle />, text: "ملف شخصي احترافي" },
          { icon: <Sparkles />, text: "سهولة التواصل مع العملاء" }
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-3 space-x-reverse border-b-4 border-cyan-500">
            <span className="text-cyan-600">{item.icon}</span>
            <span className="font-semibold text-gray-700">{item.text}</span>
          </div>
        ))}
      </div>

      {/* قسم الفورم (يظهر عند الضغط على الزر أو تلقائياً) */}
      <div className="max-w-4xl mx-auto mt-12 px-4 transition-all duration-500">
        {(showForm || true) && ( // جعلته true افتراضياً إذا كنت تريد ظهوره فوراً
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gray-100 p-4 border-b">
              <h3 className="text-lg font-bold text-gray-800">تفاصيل خدمتك الأولى</h3>
              <p className="text-sm text-gray-500 text-right">أكمل البيانات ليظهر منشورك للعملاء بشكل جذاب</p>
            </div>
            <div className="p-6">
              <InputForm />
            </div>
          </div>
        )}
      </div>

      {/* نصيحة UX أسفل الصفحة */}
      <p className="text-center text-gray-400 mt-8 text-sm">
        نصيحة: المنشورات التي تحتوي على صور واضحة تحصل على تفاعل أكبر بـ 3 أضعاف!
      </p>
    </div>
  );
};

export default WelcomePage;
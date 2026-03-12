import React from 'react';
import Link from 'next/link';
import { UserPlus, CheckCircle, Zap, ShieldCheck } from 'lucide-react';

function TakeToSign() {
  const benefits = [
    { text: "وصول مباشر للعملاء", icon: <Zap size={18} /> },
    { text: "تسجيل مجاني 100%", icon: <CheckCircle size={18} /> },
    { text: "بناء سمعة رقمية", icon: <ShieldCheck size={18} /> },
  ];

  return (
    <section className="container mx-auto px-4 py-20 font-[tajawal]" dir="rtl">
      <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] shadow-2xl shadow-cyan-900/20 border border-white/5">
        
        {/* لمسات ضوئية في الخلفية لمنع الملل البصري */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[100px] -ml-20 -mt-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -mr-20 -mb-20"></div>

        <div className="relative z-10 p-8 md:p-16 flex flex-col items-center text-center">
          
          {/* Badge علوي */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-cyan-400 text-xs md:text-sm font-bold tracking-widest uppercase">
              انضم لنخبة المحترفين
            </span>
          </div>

          {/* العناوين */}
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight max-w-3xl">
            هل أنت مقدم خدمة وترغب في الوصول إلى <span className="text-cyan-500 italic">جمهور أوسع؟</span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
            ابدأ رحلتك كمحترف مستقل عبر منصة <span className="text-white font-bold">مرغوب</span>. نساعدك في بناء هويتك الرقمية والحصول على عملاء موثوقين في مدينتك <span className="text-cyan-400 italic">بشكل مجاني بالكامل</span>.
          </p>

          {/* مميزات سريعة */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
            {benefits.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-300 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                <span className="text-cyan-500">{item.icon}</span>
                <span className="text-sm md:text-base font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          {/* زر الاتصال بالأكشن المطور */}
          <Link href="/signup" className="group relative">
            {/* تأثير توهج خلف الزر */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            
            <button className="relative flex items-center gap-3 bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-5 rounded-2xl text-xl font-black transition-all transform active:scale-95 shadow-xl shadow-cyan-900/40">
              <UserPlus size={24} />
              سجل معنا الآن - مجاناً
            </button>
          </Link>

          <p className="mt-8 text-gray-500 text-sm italic">
            * يستغرق التسجيل أقل من دقيقتين فقط.
          </p>

        </div>
      </div>
    </section>
  );
}

export default TakeToSign;
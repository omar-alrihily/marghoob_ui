import React from 'react';
import Image from 'next/image';
import pin from './images/pin.gif';

export default function Intro() {
  return (
    <section className="relative bg-transparent py-12 px-4 mb-16  overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* عنصر بصري علوي بسيط */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative group">
            {/* دائرة ناعمة جداً خلف الصورة تعطي عمق دون لون فاقع */}
            <div className="absolute inset-0 bg-slate-50 rounded-full scale-150 blur-xl group-hover:bg-cyan-50 transition-colors duration-500" />
            <Image 
              src={pin} 
              alt="Pin Icon" 
              width={100} 
              height={100} 
              className="relative w-24 h-24 object-contain"
              unoptimized 
            />
          </div>
        </div>

        {/* العنوان الرئيسي بتصميم Clean */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
            منصة <span className="text-cyan-600">مرغوب</span>
          </h1>

          {/* خط فاصل أنيق وقصير */}
          <div className="flex justify-center">
            <span className="inline-block w-12 h-1 bg-cyan-600 rounded-full" />
            <span className="inline-block w-2 h-1 bg-cyan-200 rounded-full mx-1" />
          </div>

          {/* العنوان الفرعي بوزن خط متوازن */}
          <h3 className="max-w-xl mx-auto text-2xl md:text-3xl font-medium text-slate-700 leading-snug">
            أسهل طريقة تجمع <span className="font-bold text-slate-900">مقدم الخدمة</span> بالعميل 
            <span className="block mt-2 text-cyan-700 italic font-semibold">من نفس المدينة</span>
          </h3>

          {/* عناصر إضافية لزيادة الطابع العصري (Trust Badges/Tags) */}
          <div className="flex flex-wrap justify-center gap-3 pt-6">
            {['سريع', 'قريب', 'موثوق'].map((tag) => (
              <span key={tag} className="px-4 py-1.5 rounded-full border border-slate-200 text-slate-500 text-sm font-medium hover:border-cyan-200 hover:bg-cyan-50/30 transition-all cursor-default">
                # {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
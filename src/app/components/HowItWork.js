import React from 'react';
import Image from 'next/image';

import BrowseLogo from './images/BrowseLogo.png'; 
import ProfilesLogo from './images/profilesLogo.png';
import ChatLogo from './images/chatLogo.png';
import GoalLogo from './images/goalLogo.png';

const HowItWork = () => {
  const steps = [
    { title: 'ابحث', desc: 'استخدم محرك البحث للعثور على الخبراء في مدينتك.', icon: BrowseLogo },
    { title: 'تصفح', desc: 'شاهد الملفات الشخصية، الأعمال السابقة والتقييمات.', icon: ProfilesLogo },
    { title: 'تواصل', desc: 'تواصل مباشرة مع الخبير لمناقشة التفاصيل.', icon: ChatLogo },
    { title: 'احجز', desc: 'أتمم حجز خدمتك بكل سهولة ومرونة تامة.', icon: GoalLogo },
  ];

  return (
    // استخدام overflow-x-hidden على القسم بالكامل كخط دفاع أول
    <section className=' bg-slate-50/50  py-16 overflow-x-hidden font-[tajawal]' dir="rtl">
      <div className='container mx-auto px-4 max-w-6xl'>
        
        {/* العناوين */}
        <div className='text-center mb-12'>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 font-[marhey]">
            كيف تعمل منصة <span className="text-cyan-600">مرغوب</span>؟
          </h2>
          <div className="w-20 h-1.5 bg-cyan-600 mx-auto rounded-full mb-4"></div>
        </div>

        {/* شبكة البطاقات - تقسيم مرن جداً يمنع الخروج عن الإطار */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {steps.map((step, index) => (
            <div 
              key={index} 
              className='flex flex-row lg:flex-col items-center gap-4 lg:gap-6 bg-slate-50 p-5 rounded-3xl border border-slate-100 hover:shadow-2xl hover:shadow-cyan-900/5 hover:bg-white transition-all duration-300'
            >
              {/* أيقونة الخطوة مع الرقم */}
              <div className="relative flex-shrink-0">
                <div className='w-16 h-16 lg:w-24 lg:h-24 bg-white rounded-2xl shadow-sm flex items-center justify-center p-3 lg:p-5'>
                   <div className="relative w-full h-full">
                    <Image 
                      src={step.icon} 
                      alt={step.title} 
                      fill 
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                </div>
                {/* رقم الخطوة - تم وضعه بـ z-index آمن وموضع لا يسبب سكرول */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-700 text-white rounded-full flex items-center justify-center text-sm font-bold border-2 border-white shadow-sm">
                  {index + 1}
                </div>
              </div>
              
              {/* نصوص الخطوة */}
              <div className="text-right lg:text-center overflow-hidden">
                <h3 className='font-black text-lg lg:text-xl text-slate-800 mb-1 lg:mb-2 truncate'>
                  {step.title}
                </h3>
                <p className='text-gray-500 text-xs lg:text-sm leading-relaxed'>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWork;
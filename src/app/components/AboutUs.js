import React from 'react';
import Image from 'next/image';

// استيراد أيقوناتك
import locate from './images/locate.svg';
import tools from './images/Tools.svg';
import online from './images/online.svg';
import teamwork from './images/teamwork.svg';

function AboutUs() {
  const data = [
    { icon: locate, title: 'أنجز أعمالك بالقرب منك', desc: 'ابحث عن المحترفين الموثوقين المتواجدين في محيطك الجغرافي تماماً.', tag: 'للعملاء' },
    { icon: tools, title: 'تنوع هائل في الخدمات', desc: 'نجمع لك كافة التخصصات والمهن التي تلبي تطلعاتك في مكان واحد.', tag: 'للعملاء' },
    { icon: online, title: 'مساحة تسويقية مجانية', desc: 'حوّل مهاراتك لمصدر دخل عبر بروفايل احترافي يعرض أعمالك مجاناً.', tag: 'للمحترفين' },
    { icon: teamwork, title: 'ربط مباشر وموثوق', desc: 'نربط المحترف بالعميل في نفس المدينة لتعزيز المصداقية والسرعة.', tag: 'للمحترفين' },
  ];

  return (
    <section className="py-12 bg-slate-50/50 font-[tajawal]" dir="rtl" id="about-us">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* عنوان صغير ومركز */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-[marhey]">
              كيف نساعدك في <span className="text-cyan-600">مرغوب</span>؟
            </h2>
            <p className="text-gray-500 text-sm mt-1">حلول ذكية تجمع بين الباحث عن الخدمة ومقدمها.</p>
          </div>
          <div className="hidden md:block h-2 w-24 bg-cyan-600 rounded-full mb-2"></div>
        </div>

        {/* شبكة البطاقات المدمجة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item, index) => (
            <div 
              key={index} 
              className="group flex items-start gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* أيقونة صغيرة ومحددة */}
              <div className="flex-shrink-0 w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-cyan-50 transition-colors">
                <Image src={item.icon} alt={item.title} className="w-8 h-8 object-contain" />
              </div>

              {/* نصوص مكثفة */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-800 group-hover:text-cyan-700 transition-colors">
                    {item.title}
                  </h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                    item.tag === 'للعملاء' ? 'bg-cyan-50 text-cyan-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {item.tag}
                  </span>
                </div>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default AboutUs;
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FreeLancers from '@/app/FreeLancers';

const SearchComponent = ({ initialData }) => {
  const [job, setJob] = useState('');
  const [city, setCity] = useState('');
  const [searchResults, setSearchResults] = useState(initialData || []);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickJobs = [
    { title: "مصور", icon: "📸" },
    { title: "رسام جداريات", icon: "🎨" },
    { title: "كهربائي", icon: "⚡" },
    { title: "سباك", icon: "🔧" },
    { title: "ميكانيكي سيارات", icon: "🚗" },
    { title: "منسق حفلات", icon: "🎉" }
  ];

  const handleSearch = async (searchJob = job, searchCity = city) => {
    setIsLoading(true);
    setError('');
    try {
      const query = new URLSearchParams();
      if (searchJob) query.append('job', searchJob);
      if (searchCity) query.append('city', searchCity);

      const response = await fetch(`https://api.marghob.net/search?${query.toString()}`);
      const data = await response.json();

      if (response.ok && data.length > 0) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
        setError('عذراً، لا توجد نتائج تطابق بحثك حالياً.');
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالخادم.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobCardClick = (jobTitle) => {
    const newJob = job === jobTitle ? '' : jobTitle;
    setJob(newJob);
    handleSearch(newJob, city);
  };

  return (
    <div className="min-h-screen pb-20" dir="rtl">
      {/* هيدر البحث */}
      <div className="pt-16 pb-24 px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-gray-900 mb-4"
          >
            ابحث عن المحترف <span className="text-cyan-600 italic">المناسب</span> لمهمتك
          </motion.h1>
          <p className="text-gray-700 md:text-lg max-w-2xl mx-auto">
            منصة تربطك بأفضل الفنيين والمبدعين في منطقتك بضغطة زر واحدة.
          </p>
        </div>

        {/* شريط البحث المطور */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2rem] md:rounded-full shadow-2xl border border-gray-100 p-2 md:p-3 flex flex-col md:flex-row items-stretch md:items-center gap-2">
            
            {/* اختيار التخصص */}
            <div className="flex-1 flex items-center px-4 py-2 group">
              <div className="w-10 h-10 bg-cyan-50 rounded-full flex items-center justify-center text-cyan-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex flex-col flex-grow mr-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase">ماذا تبحث؟</label>
                <select
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  className="bg-transparent focus:outline-none text-gray-800 font-bold text-sm md:text-base appearance-none cursor-pointer"
                >
                  <option value="">كل الخدمات</option>
                  {quickJobs.map(q => <option key={q.title} value={q.title}>{q.title}</option>)}
                </select>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-gray-100"></div>

            {/* اختيار المدينة */}
            <div className="flex-1 flex items-center px-4 py-2 group">
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div className="flex flex-col flex-grow mr-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase">أين الموقع؟</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-transparent focus:outline-none text-gray-800 font-bold text-sm md:text-base appearance-none cursor-pointer"
                >
                  <option value="">كل المدن</option>
                  <option value="الرياض">الرياض</option>
                  <option value="جدة">جدة</option>
                  <option value="مكة">مكة</option>
                  <option value="المدينة المنورة">المدينة المنورة</option>
                  <option value="الدمام">الدمام</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => handleSearch(job, city)}
              disabled={isLoading}
              className="mt-2 md:mt-0 bg-gray-900 hover:bg-black text-white font-bold px-10 py-4 md:py-3.5 rounded-2xl md:rounded-full transition-all active:scale-95 shadow-xl"
            >
              {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "بحث الآن"}
            </button>
          </div>
        </div>
      </div>

      {/* منطقة النتائج والبطاقات السريعة */}
      <div className="max-w-6xl mx-auto px-5 -mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {quickJobs.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleJobCardClick(item.title)}
              className={`cursor-pointer transition-all duration-300 p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 
                ${job === item.title ? "border-cyan-600 bg-cyan-50" : "border-transparent bg-white shadow-sm hover:border-gray-200"}`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className={`text-[11px] font-black ${job === item.title ? "text-cyan-700" : "text-gray-600"}`}>
                {item.title}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-gray-100 pb-5">
            <div className="flex items-center gap-3">
              <span className="w-2 h-8 bg-cyan-600 rounded-full"></span>
              <h2 className="text-xl md:text-2xl font-black text-gray-800">النتائج المتوفرة</h2> 
              <span className="bg-gray-100 text-cyan-700 text-lg px-3 py-0.5 rounded-lg border">{searchResults.length}</span>
            </div>
            
            <AnimatePresence>
              {(job || city) && (
                <motion.button 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => {setJob(''); setCity(''); handleSearch('', '');}}
                  className="text-xs font-bold text-red-500 bg-red-50 px-4 py-2 rounded-xl hover:bg-red-100 transition-colors"
                >
                  مسح الفلاتر ✕
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
               <div className="w-12 h-12 border-4 border-slate-100 border-t-cyan-600 rounded-full animate-spin mb-4"></div>
               <p className="text-gray-400 font-medium">جاري جلب أفضل الخبراء...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <FreeLancers FreeLancer={searchResults} />
          ) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 max-w-2xl mx-auto">
              <p className="text-gray-400 text-lg">لا توجد نتائج مطابقة لبحثك حالياً.</p>
              <button onClick={() => {setJob(''); setCity(''); handleSearch('', '');}} className="mt-4 text-cyan-600 font-bold hover:underline">عرض كل المحترفين</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
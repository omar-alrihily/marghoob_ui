'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import person from './person.png'; // تأكد من المسار

const FreeLancers = ({ FreeLancer }) => {
  // حماية في حال كانت البيانات فارغة
  if (!FreeLancer || !Array.isArray(FreeLancer)) return null;

  return (
    <div className="container mx-auto px-4 py-6 font-sans" dir="rtl">
      {/* شبكة البطاقات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {FreeLancer.slice().reverse().map((input) => (
          <Link key={input._id} href={`/freelancer/${input._id}`}>
            <motion.div
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 cursor-pointer transition-all duration-300 h-full"
            >
              <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 w-full" />
              
              <div className="p-5 md:p-6">
                <div className="flex flex-col items-center mb-4 text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mb-3 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300 overflow-hidden">
                    <img 
                      src={person.src || person} // دعم Next.js لصور الـ Static imports
                      alt={input.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg md:text-xl mb-1 truncate w-full">
                    {input.name}
                  </h3>
                  <span className="text-xs md:text-sm text-cyan-600 font-medium bg-cyan-50 px-3 py-0.5 rounded-full">
                    {input.job}
                  </span>
                </div>

                <div className="space-y-3 border-t border-gray-50 pt-4">
                  <div className="flex items-center text-gray-500 text-sm italic">
                    <span className="ml-2">📍</span> {input.city}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">السعر بالساعة</span>
                    <span className="text-base md:text-lg font-black text-gray-800">
                      {input.salary} <small className="text-[10px] font-normal">ريال</small>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FreeLancers;
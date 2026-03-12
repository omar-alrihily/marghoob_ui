'use client'; // ضروري لأننا نستخدم motion

import Link from 'next/link';
import { motion } from 'framer-motion';

const FreeLancerCard = ({ input }) => {
  // 1. حماية المكون: إذا لم تكن هناك بيانات، لا تعرض شيئاً ولا تسبب Crash
  if (!input || !input._id) return null;

  return (
    // 2. هنا السحر! الرابط سيتحول من / إلى /freelancer/ID_الخبير
    <Link href={`/freelancer/${input._id}`}>
      <motion.div
        whileHover={{ y: -5 }}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 cursor-pointer transition-all"
      >
        <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 w-full" />
        
        <div className="p-5">
          <div className="flex flex-col items-center text-center">
            {/* أيقونة/صورة افتراضية */}
            <div className="w-16 h-16 bg-cyan-50 rounded-full flex items-center justify-center text-cyan-600 mb-3 font-bold text-xl">
              {input.name?.charAt(0)}
            </div>
            
            <h3 className="font-bold text-gray-800 text-lg mb-1 truncate w-full">
              {input.name}
            </h3>
            
            <span className="text-xs text-cyan-600 font-medium bg-cyan-50 px-3 py-1 rounded-full">
              {input.job}
            </span>
          </div>

          <div className="mt-4 border-t border-gray-50 pt-4 flex justify-between items-center text-sm">
            <span className="text-gray-500 italic">📍 {input.city}</span>
            <span className="font-black text-gray-800">
              {input.salary} <small className="text-[10px] font-normal">ريال</small>
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default FreeLancerCard;
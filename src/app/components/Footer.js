import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Twitter, Globe, ArrowUpLeft } from 'lucide-react';

// استيراد أيقوناتك (إذا أردت الاستمرار باستخدام الصور بدلاً من الأيقونات البرمجية)
import twitterIcon from './images/twitterIcon.png';
import emailIcon from './images/email-icon.png'; 

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-white/5 pt-12 pb-8 px-4 font-[tajawal]">
      <div className="container mx-auto max-w-6xl">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          
          {/* Logo & Slogan */}
          <div className="text-center md:text-right">
            <h2 className="text-2xl font-[marhey] text-white mb-2">منصة مرغوب</h2>
            <p className="text-gray-400 text-sm max-w-xs">
              الخيار الأول للبحث عن أفضل الخبراء والمبدعين في المملكة.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest opacity-50 italic">تواصل معنا</h4>
            <div className="flex gap-4">
              {/* تويتر */}
              <a 
                href="https://twitter.com/Marghobapp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative bg-white/5 p-3 rounded-2xl hover:bg-cyan-600 transition-all duration-300 shadow-xl"
              >
                <Twitter className="text-white group-hover:scale-110 transition-transform" size={24} />
                {/* إذا أردت استخدام صورتك الأصلية، استبدل Twitter بـ <Image src={twitterIcon} alt="X" className="w-6 h-6" /> */}
              </a>

              {/* الإيميل */}
              <a 
                href="mailto:marghobapp@gmail.com"
                className="group relative bg-white/5 p-3 rounded-2xl hover:bg-cyan-600 transition-all duration-300 shadow-xl"
              >
                <Mail className="text-white group-hover:scale-110 transition-transform" size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <span>جميع الحقوق محفوظة</span>
            <span className="text-cyan-500 font-bold font-[marhey]">مرغوب</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>

          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
            <Link href="/" className="hover:text-white transition-colors">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
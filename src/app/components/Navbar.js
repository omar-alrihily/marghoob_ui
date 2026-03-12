'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
// إضافة LayoutDashboard للاستيرادات
import { 
  Menu, X, LogOut, User, Home, Info, PhoneCall, 
  UserPlus, LogIn, LayoutDashboard 
} from 'lucide-react';
import { useAuth } from '@/app/components/AuthContext'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { isAuthenticated, username, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    logout();
    setIsOpen(false);
    router.push('/');
    router.refresh();
  };

  const navLinks = [
    { name: 'الرئيسية', to: '/', icon: <Home size={18} /> },
    { name: 'عن المنصة', to: '/#about-us', icon: <Info size={18} /> },
   
  ];

  return (
    <nav className="fixed top-0 w-full z-50 font-[tajawal] px-4 py-3 text-right" dir="rtl">
      <div className={`container mx-auto max-w-7xl transition-all duration-300 rounded-2xl ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border border-gray-100' 
          : 'bg-cyan-700 shadow-none'
      }`}>
        <div className="flex items-center justify-between p-3 md:px-6">
          
          {/* Logo */}
          <Link href="/" className={`text-2xl md:text-3xl font-[marhey] font-bold transition-colors ${
            scrolled ? 'text-cyan-700' : 'text-white'
          }`}>
            منصة مرغوب
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.to} 
                  className={`hover:opacity-70 transition-all font-medium ${scrolled ? 'text-gray-700' : 'text-white'}`}
                >
                  {link.name}
                </Link>
              ))}

              {/* إضافة لوحة التحكم في الـ Desktop */}
              {isAuthenticated && (
                <Link 
                  href="/dashboard" 
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                    scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
                >
                  <LayoutDashboard size={18} />
                  لوحة التحكم
                </Link>
              )}
            </div>

            <div className="h-6 w-[1px] bg-gray-300/30" />

            {/* Auth Actions */}
            <div className="flex items-center gap-3">
              {!isAuthenticated ? (
                <>
                  <Link href="/signin" className={`px-4 py-2 rounded-lg transition-all font-medium ${scrolled ? 'text-cyan-700' : 'text-white'}`}>
                    تسجيل الدخول
                  </Link>
                  <Link href="/signup" className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-xl shadow-md transition-all active:scale-95 font-bold">
                    إنشاء حساب
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    scrolled ? 'bg-cyan-50 text-cyan-700' : 'bg-white/10 text-white'
                  }`}>
                    <User size={18} />
                    <span className="text-sm font-bold tracking-wide">{username}</span>
                  </div>
                  <button 
                    onClick={handleSignOut} 
                    className={`flex items-center gap-1 p-2 rounded-lg transition-colors ${
                        scrolled ? 'text-red-500 hover:bg-red-50' : 'text-white hover:bg-white/10'
                    }`}
                    title="تسجيل الخروج"
                  >
                    <span className="text-sm font-medium hidden lg:inline">خروج</span>
                    <LogOut size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-cyan-700' : 'text-white'}`}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Drawer) */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)} />
      
      <div className={`fixed top-0 right-0 h-full w-[75%] bg-white z-[110] shadow-2xl p-6 transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-6 mt-10">
          <div className="text-cyan-700 text-3xl font-[marhey] mb-6 border-b pb-4">مرغوب</div>
          
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.to} 
              onClick={() => setIsOpen(false)} 
              className="flex items-center justify-start gap-3 text-gray-700 text-lg font-medium flex-row-reverse"
            >
               {link.icon} {link.name} 
            </Link>
          ))}

          {/* إضافة لوحة التحكم في الـ Mobile */}
          {isAuthenticated && (
            <Link 
              href="/dashboard" 
              onClick={() => setIsOpen(false)} 
              className="flex items-center justify-start gap-3 text-cyan-700 text-lg font-bold flex-row-reverse bg-cyan-50 p-3 rounded-xl"
            >
              <LayoutDashboard size={20} />
              لوحة التحكم
            </Link>
          )}

          <hr className="border-gray-100" />

          {!isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <Link href="/signin" onClick={() => setIsOpen(false)} className="flex items-center justify-end gap-3 text-gray-700 py-2 text-lg">
                تسجيل الدخول <LogIn size={20} />
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 bg-cyan-700 text-white py-4 rounded-2xl shadow-lg font-bold text-lg">
                 إنشاء حساب جديد <UserPlus size={20} />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-end gap-3 text-cyan-700 bg-cyan-50 p-4 rounded-xl font-bold">
                 {username} <User size={22} />
              </div>
              <button onClick={handleSignOut} className="flex items-center justify-end gap-3 text-red-500 p-4 hover:bg-red-50 rounded-xl transition-colors font-bold border border-red-100">
                تسجيل الخروج <LogOut size={22} />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
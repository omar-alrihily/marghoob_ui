import './globals.css'; // استبدل App.css بملف التنسيق العام
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Providers } from './providers';

import { Tajawal, Harmattan, Marhey } from 'next/font/google';


const tajawal = Tajawal({ 
  subsets: ['arabic'], 
  weight: ['300', '400', '500', '700'],
  variable: '--font-tajawal', // تعريف متغير CSS
});

const harmattan = Harmattan({ 
  subsets: ['arabic'], 
  weight: ['400', '700'],
  variable: '--font-harmattan',
});

const marhey = Marhey({ 
  subsets: ['arabic'], 
  weight: ['300', '400', '700'],
  variable: '--font-marhey',
});


export const metadata = {
  title: 'منصة مرغوب',
  description: 'أسهل طريقة تجمع مقدم الخدمة بالعميل من نفس المدينة',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl"  >
      {/* أضفنا المتغيرات هنا في الـ className */}
      <body className={`${tajawal.variable} ${harmattan.variable} ${marhey.variable} bg-intro flex flex-col min-h-screen font-tajawal`}>
        <Providers>
          <Navbar />
          <main className="flex-grow min-h-0 font-[tajawal] pt-28 md:pt-32">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
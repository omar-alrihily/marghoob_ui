import Script from 'next/script';
import Link from 'next/link';

const BASE_URL = 'https://www.marghob.net';
const API_URL = 'https://api.marghob.net/inputs';

// 1. إضافة البيانات الوصفية الديناميكية (SEO)
export async function generateMetadata({ params }) {
  const { id } = await params;
  
  try {
    const res = await fetch(API_URL, { next: { revalidate: 3600 } });
    const allFreelancers = await res.json();
    const data = allFreelancers.find(item => String(item._id) === String(id));

    if (!data) return { title: 'الخبير غير موجود | منصة مرغوب' };

    return {
      title: `${data.name} - ${data.job} في ${data.city} | منصة مرغوب`,
      description: data.description?.substring(0, 160) || `تواصل مع ${data.name}، خبير في ${data.job}. احصل على أفضل الخدمات المهنية في ${data.city}.`,
      alternates: {
        canonical: `${BASE_URL}/freelancer/${id}`, // حل مشكلة 3XX و Canonical
      },
      openGraph: {
        title: data.name,
        description: data.job,
        type: 'profile',
        url: `${BASE_URL}/freelancer/${id}`,
      },
    };
  } catch (error) {
    return { title: 'تفاصيل الخبير | منصة مرغوب' };
  }
}

// 2. المكون الرئيسي للصفحة
export default async function FreelancerDetails({ params }) {
  // انتظر الـ params أولاً (ضروري في نسخ Next.js الحديثة)
  const { id } = await params;

  try {
    const res = await fetch(API_URL, { 
      next: { revalidate: 3600 } 
    });

    if (!res.ok) throw new Error(`API returned status: ${res.status}`);

    const allFreelancers = await res.json();
    const data = allFreelancers.find(item => String(item._id) === String(id));

    if (!data) {
      return (
        <div className="p-20 text-center font-bold text-gray-400">
          ⚠️ لم يتم العثور على الخبير (ID: {id}).
        </div>
      );
    }

    // بيانات الـ Schema (JSON-LD)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": data.name,
      "jobTitle": data.job,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": data.city
      },
      "description": data.description,
      "url": `${BASE_URL}/freelancer/${id}`
    };

    return (
      <div className="min-h-screen bg-gray-50/50 pb-20 pt-10 px-4" dir="rtl">
        {/* إضافة الـ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="container mx-auto max-w-4xl">
          
          {/* Header Section */}
          <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-cyan-700 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-cyan-100">
                {data.name?.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900">{data.name}</h1>
                <p className="text-cyan-600 font-bold text-sm">{data.job}</p>
                <div className="flex gap-3 mt-2">
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md">{data.city}</span>
                  <span className="text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded-md font-bold">{data.salary} ريال/ساعة</span>
                </div>
              </div>
            </div>

            <a 
              href={`tel:${data.mobileNumber}`}
              className="bg-cyan-700 hover:bg-cyan-800 text-white px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 flex items-center gap-3 shadow-md w-full md:w-auto justify-center"
            >
              <span>اتصل الآن</span>
              <span className="text-sm opacity-70 border-r border-white/20 pr-3">{data.mobileNumber}</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            <div className="md:col-span-12 lg:col-span-8 space-y-6">
              {/* النبذة التعريفية */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                   <div className="w-1.5 h-5 bg-cyan-600 rounded-full"></div>
                   النبذة التعريفية
                </h2>
                <p className="text-gray-600 leading-relaxed text-md">
                  {data.description || "خبير متميز في مجاله يسعى لتقديم أفضل النتائج."}
                </p>
              </div>

              {/* معرض الصور */}
              {data.photos && data.photos.length > 0 && (
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-5 bg-cyan-600 rounded-full"></div>
                    معرض الصور والأعمال
                  </h2>
                  <div className="columns-1 sm:columns-2 gap-4 space-y-4">
                    {data.photos.map((photoUrl, index) => (
                      <div key={index} className="break-inside-avoid">
                        <img
                          src={photoUrl}
                          alt={`أعمال الخبير ${data.name} - ${data.job}`}
                          className="w-full rounded-2xl border border-gray-50 hover:shadow-xl transition-shadow duration-300"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-12 text-center py-4">
              <Link href="/" className="text-gray-600 hover:text-cyan-700 transition-colors text-sm font-medium">
                ← العودة إلى قائمة المحترفين
              </Link>
            </div>

          </div>
        </div>
      </div>
    );

  } catch (error) {
    console.error("Local Debug Error:", error);
    return (
      <div className="p-20 text-center flex flex-col items-center gap-4">
        <div className="font-bold text-red-400 text-xl">عذراً، حدث خطأ في النظام.</div>
        <p className="text-gray-500 text-sm max-w-md">تأكد من اتصالك بالإنترنت أو أن البيانات المطلوبة متوفرة.</p>
        <Link href="/" className="bg-gray-100 px-4 py-2 rounded-lg text-sm">محاولة مرة أخرى</Link>
      </div>
    );
  }
}
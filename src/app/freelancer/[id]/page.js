import Script from 'next/script';
import Link from 'next/link';

// 1. إضافة البيانات الوصفية الديناميكية (SEO Title & Description)
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(`https://api.marghob.net/inputs`);
    const allFreelancers = await res.json();
    const data = allFreelancers.find(item => item._id === id);

    if (!data) return { title: 'الخبير غير موجود' };

    return {
      title: `${data.name} - ${data.job} في ${data.city} | منصة مرغوب`,
      description: data.description?.substring(0, 160) || `تواصل مع ${data.name}، خبير في ${data.job}. احصل على أفضل الخدمات المهنية في ${data.city}.`,
      openGraph: {
        title: data.name,
        description: data.job,
        type: 'profile',
      },
    };
  } catch (error) {
    return { title: 'تفاصيل الخبير' };
  }
}

export default async function FreelancerDetails({ params }) {
  const { id } = await params;

  try {
    // تحسين الكاش لسرعة الصفحة (revalidate كل ساعة بدلاً من no-store)
    const res = await fetch(`https://api.marghob.net/inputs`, { 
      next: { revalidate: 3600 } 
    });
    const allFreelancers = await res.json();
    const data = allFreelancers.find(item => item._id === id);

    if (!data) return <div className="p-20 text-center font-bold text-gray-400">⚠️ لم يتم العثور على الخبير.</div>;

    // 2. تحضير بيانات الـ Schema (JSON-LD) لتحسين النتائج الغنية في جوجل
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
      "url": `https://marghob.net/freelancer/${id}`
    };

    return (
      <div className="min-h-screen bg-gray-50/50 pb-20 pt-10 px-4" dir="rtl">
        {/* إضافة الـ Schema إلى الصفحة */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="container mx-auto max-w-4xl">
          
          {/* Header Compact */}
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
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                {/* تم تغيير h3 إلى h2 لتحسين الهيكل الهرمي */}
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                   <div className="w-1.5 h-5 bg-cyan-600 rounded-full"></div>
                   النبذة التعريفية
                </h2>
                <p className="text-gray-600 leading-relaxed text-md">
                  {data.description || "خبير متميز في مجاله يسعى لتقديم أفضل النتائج."}
                </p>
              </div>

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
                          alt="Work sample"
                          className="w-full rounded-2xl border border-gray-50 hover:shadow-xl transition-shadow duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-12 text-center py-4">
              {/* استخدام Link بدلاً من a لتحسين الترابط الداخلي وسرعة التنقل */}
              <Link href="/" className="text-gray-600 hover:text-cyan-700 transition-colors text-sm font-medium">
                ← العودة إلى قائمة المحترفين
              </Link>
            </div>

          </div>
        </div>
      </div>
    );

  } catch (error) {
    return <div className="p-20 text-center font-bold text-red-400">عذراً، حدث خطأ في النظام.</div>;
  }
}
// app/sitemap.js

const BASE_URL = 'https://marghob.net';
const API_URL = 'https://api.marghob.net/inputs';

export default async function sitemap() {
  try {
    // جلب البيانات تماماً كما فعلت في صفحة التفاصيل
    const res = await fetch(API_URL, { 
      next: { revalidate: 3600 } 
    });
    const allFreelancers = await res.json();

    // 1. روابط المستقلين (باستخدام _id كما في كودك)
    const freelancersEntries = allFreelancers.map((data) => ({
      url: `${BASE_URL}/freelancer/${data._id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // 2. روابط المدن (استخراجها ديناميكياً من البيانات)
    const uniqueCities = [...new Set(allFreelancers.map(item => item.city).filter(Boolean))];
    const cityEntries = uniqueCities.map((city) => ({
      url: `${BASE_URL}/city/${encodeURIComponent(city)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    // 3. الصفحات الأساسية
    const staticPages = [
      { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    ];

    return [...staticPages, ...freelancersEntries, ...cityEntries];

  } catch (error) {
    console.error("Sitemap Error:", error);
    return [{ url: BASE_URL, lastModified: new Date() }];
  }
}
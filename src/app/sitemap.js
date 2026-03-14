const BASE_URL = 'https://www.marghob.net'; // أضفت www لأن الرابط الذي أرسلته يحتوي عليها
const API_URL = 'https://api.marghob.net/inputs';

export default async function sitemap() {
  try {
    const res = await fetch(API_URL, { 
      next: { revalidate: 3600 } 
    });
    
    if (!res.ok) {
        return [{ url: BASE_URL, lastModified: new Date() }];
    }

    const allFreelancers = await res.json();

    // 1. روابط بروفايلات المحترفين (بدون trailing slash وبدون روابط المدن)
    const freelancersEntries = allFreelancers
      .filter(data => data._id) // تأمين الكود ضد أي بيانات ناقصة من الـ API
      .map((data) => ({
        url: `${BASE_URL}/freelancer/${data._id}`, // مطابق للرابط الذي أرسلته تماماً
        lastModified: new Date(data.updatedAt || new Date()),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));

    // 2. الصفحة الرئيسية
    const staticPages = [
      { 
        url: BASE_URL, 
        lastModified: new Date(), 
        changeFrequency: 'daily', 
        priority: 1.0 
      },
    ];

    // ملاحظة: قمت بحذف cityEntries لأنك أكدت عدم وجود صفحات خاصة بها
    return [...staticPages, ...freelancersEntries];

  } catch (error) {
    console.error("Sitemap Error:", error);
    return [{ url: BASE_URL, lastModified: new Date() }];
  }
}
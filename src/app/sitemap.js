// app/sitemap.js

export default function sitemap() {
  const baseUrl = 'https://marghob.net';

  // يمكنك إضافة روابط صفحاتك الثابتة هنا
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // إذا كان عندك مقالات أو منتجات، يمكنك جلبها من الـ API هنا وإضافتها للمصفوفة
  ];
}
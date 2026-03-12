// app/page.js
import SearchComponent from '@/app/components/SearchComponent';
import Home from './components/Home';
import Intro from './components/Intro';

async function getInitialData() {
  const res = await fetch('https://api.marghob.net/inputs', { 
    next: { revalidate: 3600 } // تحديث البيانات كل ساعة كاش
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function Page() {
  const freelancers = await getInitialData() || []; // ضمان أنها مصفوفة فارغة على الأقل

  return (
    <main>
      {/* تمرير البيانات فقط إذا كانت موجودة وبها عناصر 
      
       
      */}
       
       
       <section id="intro">
              <Intro />
            </section>

      <SearchComponent initialData={freelancers} />
       <Home />
    </main>
  );
}
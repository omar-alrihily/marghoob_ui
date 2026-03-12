"use client"; // ضروري لأننا نستخدم hooks و polling

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function InputList() {
  const [inputs, setInputs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.marghob.net/inputs');
      setInputs(response.data);
    } catch (error) {
      console.error('Error fetching inputs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // جلب البيانات عند أول تحميل

    const interval = setInterval(() => {
      fetchData(); // تحديث البيانات كل 5 ثوانٍ
    }, 5000);

    return () => clearInterval(interval); // تنظيف الـ interval عند إغلاق الصفحة
  }, []);

  if (loading && inputs.length === 0) return <p>جاري التحميل...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">قائمة المستقلين</h1>
      <ul className="space-y-2">
        {inputs.map((input) => (
          <li key={input._id} className="border p-2 rounded shadow-sm">
            <strong>FreeLancer:</strong> {input.name}, {input.job}, {input.city}, {input.salary}
          </li>
        ))}
      </ul>
    </div>
  );
}
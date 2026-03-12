'use client'; // هذا المكون يعمل في جهة العميل

import { AuthProvider } from '@/app/components/AuthContext';

export function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
import React from 'react';
import './globals.css';

export const metadata = {
  title: 'پنل مدیریت هویت',
  description: 'سیستم مدیریت کاربران و تنظیمات احراز هویت',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}

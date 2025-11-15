// app/layout.tsx
import React from 'react'
import './globals.css'
import { Vazirmatn } from 'next/font/google'

export const metadata = {
  title: 'پنل مدیریت هویت',
  description: 'سیستم مدیریت کاربران و تنظیمات احراز هویت',
}

const vazirmatn = Vazirmatn({
  subsets: ['latin', 'arabic'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.className}>
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}

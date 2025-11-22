// app/layout.tsx
import React from 'react'
import './globals.css'
import localFont from 'next/font/local'

export const metadata = {
  title: 'پنل مدیریت هویت',
  description: 'سیستم مدیریت کاربران و تنظیمات احراز هویت',
}

const vazirmatn = localFont({
  src: [
    {
      path: '../public/fonts/vazirmatn/Vazirmatn-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/vazirmatn/Vazirmatn-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-vazirmatn',
  display: 'swap',
})

const inter = localFont({
  src: [
    {
      path: '../public/fonts/inter/Inter-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/inter/Inter-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${inter.variable}`}
    >
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}

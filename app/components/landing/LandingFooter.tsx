// app/components/landing/LandingFooter.tsx
import Link from "next/link";

export default function LandingFooter() {
    return (
        <footer
            dir="rtl"
            className="bg-gray-50 text-gray-800 py-12 px-4 text-right"
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1">
                        <h3 className="text-xl font-extrabold text-blue-900 mb-4">
                            ریاست جمهوری
                        </h3>
                        <p className="text-sm leading-6 text-gray-700">
                            معاونت علمی، فناوری و اقتصاد دانش‌بنیان
                        </p>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-bold text-blue-900 mb-4">خدمات</h4>
                        <ul className="space-y-3 text-sm text-gray-700">
                            <li>سرویس‌ها</li>
                            <li>پایگاه داده</li>
                            <li>پیکربندی ابری</li>
                            <li>کدنویسی ابری</li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-bold text-blue-900 mb-4">دسترسی</h4>
                        <ul className="space-y-3 text-sm text-gray-700">
                            <li>
                                <Link href="/login">ورود به پنل</Link>
                            </li>
                            <li>سوالات متداول</li>
                            <li>راهنما</li>
                            <li>قوانین</li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-bold text-blue-900 mb-4">ارتباط با ما</h4>
                        <div className="space-y-3 text-sm text-gray-700">
                            <div className="flex items-start gap-2">
                                <span>📍</span>
                                <span>تهران، میدان ونک، خیابان ملاصدرا، شیخ بهایی جنوبی، پلاک ۲۰</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>📞</span>
                                <span>021-83530</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>✉️</span>
                                <span>pr@isti.ir</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-8 text-center text-xs text-gray-600">
                    <p className="mb-2">
                        تمامی حقوق متعلق به این سایت و برای معاونت علمی، فناوری و اقتصاد دانش‌بنیان ریاست جمهوری محفوظ می‌باشد.
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <span>www.isti.ir</span>
                        <span className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                            ✔
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

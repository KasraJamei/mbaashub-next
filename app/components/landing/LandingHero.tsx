// app/components/landing/LandingHero.tsx
import { Card } from "@/app/components/Shared/Card";

export default function LandingHero() {
    return (
        <section className="bg-gradient-to-b from-blue-50 to-white pt-8 pb-12 px-4" dir="rtl">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                <div className="w-full flex justify-end mb-6">
                    <div className="max-w-2xl flex flex-col items-end text-right">
                        <h1 className="text-blue-900 font-extrabold text-3xl md:text-4xl mb-2 whitespace-nowrap">
                            زیرساخت ابری برای توسعه‌دهنده‌ها
                        </h1>
                        <p className="text-blue-700 text-base md:text-lg mb-2 leading-relaxed">
                            سریع‌تر اپلیکیشن بساز، بدون نیاز به سرور یا تنظیمات پیچیده دیتابیس،
                            <br />
                            احراز هویت، فایل و APIها، همه در یک پلتفرم ابری.
                        </p>
                        <button className="bg-blue-900 text-white rounded-xl px-7 py-3 font-semibold hover:bg-blue-800 transition self-end">
                            ساخت اولین پروژه
                        </button>
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row-reverse md:items-stretch md:justify-center gap-6">
                    <Card className="w-full md:w-[330px] flex-shrink-0 bg-gradient-to-b from-[#2177d0] to-[#134987] text-white flex flex-col items-center justify-between py-10 px-4 md:px-8 rounded-[20px] shadow-lg order-2 md:order-1">
                        <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 shadow">
                            <span className="text-5xl">🏛️</span>
                        </div>
                        <div className="text-center mb-8">
                            <div className="font-bold text-lg mb-1">ریاست جمهوری</div>
                            <div className="text-sm opacity-90">
                                معاونت علمی فناوری و اقتصاد
                                <br />
                                دانش بنیان
                            </div>
                        </div>
                        <button className="w-full text-blue-800 bg-white hover:bg-gray-100 rounded-xl py-3 font-medium transition flex items-center justify-center gap-2">
                            میز خدمات
                        </button>
                    </Card>

                    <Card className="flex-1 bg-white rounded-[20px] shadow-2xl min-w-[300px] py-10 px-2 md:px-10 flex flex-col items-center justify-between order-1 md:order-2">
                        <div className="w-full flex flex-col gap-0 items-center">
                            <h2 className="text-xl font-bold text-blue-700 mb-8 w-full text-right pr-2">
                                سرویس های ما
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
                                <div className="flex flex-col items-center text-center gap-2">
                                    <span className="text-5xl mb-2 text-blue-600">☁️</span>
                                    <div className="font-semibold text-gray-900 text-base mb-1">
                                        یکپارچه‌سازی ابری
                                    </div>
                                    <div className="text-sm text-gray-900">
                                        سرویس پیکربندی ابری یک راه یکپارچه و استاندارد برای پیکربندی و استقرار برنامه‌های کاربردی مبتنی بر ابر ارائه می‌دهد.
                                    </div>
                                </div>

                                <div className="flex flex-col items-center text-center gap-2">
                                    <span className="text-5xl mb-2 text-blue-600">🗄️</span>
                                    <div className="font-semibold text-gray-900 text-base mb-1">
                                        مدیریت بانک داده
                                    </div>
                                    <div className="text-sm text-gray-900">
                                        سرویس پایگاه داده یک مخزن امن، مقیاس پذیر و قابل اعتماد برای ذخیره و مدیریت داده‌های ارزشمند.
                                    </div>
                                </div>

                                <div className="flex flex-col items-center text-center gap-2">
                                    <span className="text-5xl mb-2 text-black">{'</>'}</span>
                                    <div className="font-semibold text-gray-900 text-base mb-1">
                                        کدهای ابری
                                    </div>
                                    <div className="text-sm text-gray-900">
                                        سرویس کدهای ابری به توسعه‌دهندگان این امکان را می‌دهد که کد را در یک محیط مبتنی بر ابر بنویسند.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex justify-end mt-8">
                            <a
                                href="#"
                                className="text-blue-700 font-medium flex items-center gap-1 text-base hover:text-blue-900 transition"
                            >
                                مشاهده بیشتر
                                <span className="text-lg" style={{ marginBottom: "-2px" }}>{"\u25C0"}</span>
                            </a>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}

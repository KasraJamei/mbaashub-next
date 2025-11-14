// app/components/landing/LandingCapabilities.tsx
export default function LandingCapabilities() {
    const features = [
        { title: "راه‌اندازی سریع و آسان", description: "در عرض چند دقیقه بک اند اپلیکیشن خودتون رو راه اندازی کنید، بدون نیاز به مدیریت سرور." },
        { title: "امنیت و پایداری بالا", description: "سرورها با رمزنگاری و مانیتورینگ 24 ساعته محافظت می شن تا همیشه در دسترس باشید." },
        { title: "مقیاس‌پذیری خودکار", description: "نگران رشد کاربراتون نباشید، زیرساخت ابری ما به صورت خودکار منابع رو گسترش می ده." },
        { title: "API های آماده برای استفاده", description: "تمامی عملیات CRUD، احراز هویت، و فایل آپلود با API آماده در اختیار شماست." }
    ];

    return (
        <section dir="rtl" className="relative overflow-hidden py-16 px-4 bg-gradient-to-br from-[#0e2a88] via-[#1b3db3] to-[#0e2a88]">
            <div className="pointer-events-none absolute inset-0 opacity-25">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="cap-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <rect width="48" height="48" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="0.5" />
                            <circle cx="24" cy="24" r="1" fill="white" fillOpacity="0.3" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cap-grid)" />
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <h2 className="text-white text-3xl md:text-4xl font-extrabold text-center mb-12">
                    قابلیت های ما
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 max-w-5xl mx-auto text-white">
                    {features.map((f, i) => {
                        const isLeftCol = i % 2 === 0;
                        return (
                            <div
                                key={i}
                                className={[
                                    "flex items-start gap-3 text-right",
                                    isLeftCol ? "md:mr-10" : "md:ml-10"
                                ].join(" ")}
                            >
                                <span className="mt-1 inline-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                                    <p className="text-sm leading-7 text-white/90">{f.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

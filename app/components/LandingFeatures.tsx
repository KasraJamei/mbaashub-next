export default function LandingFeatures() {
    const features = [
        { title: "امنیت بالا", desc: "اطلاعات شما با امنیت کامل و استانداردهای روز ذخیره‌سازی می‌شوند." },
        { title: "راه‌اندازی سریع", desc: "در چند دقیقه، سرویس خود را بدون دغدغه آماده‌سازی کن." },
        { title: "پشتیبانی حرفه‌ای", desc: "در هر مرحله تیم ما کنار شماست تا رشد کنی." },
    ];
    return (
        <section className="py-12 px-4 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-indigo-800">ویژگی‌های کلیدی</h2>
            <div className="grid gap-8 sm:grid-cols-3">
                {features.map(f => (
                    <div key={f.title} className="bg-white rounded-2xl p-5 shadow-md flex flex-col items-center text-center">
                        <span className="w-12 h-12 bg-indigo-100 rounded-full mb-4 flex items-center justify-center text-indigo-600 font-bold text-2xl">{f.title[0]}</span>
                        <h3 className="font-bold mb-2 text-indigo-700">{f.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

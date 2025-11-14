// app/components/landing/LandingServices.tsx
export default function LandingServices() {
    return (
        <section className="py-16 px-4 bg-blue-900">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-8">سرویس های ما</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center bg-white text-blue-900 p-6 rounded-xl">
                        <span className="text-5xl mb-4">☁️</span>
                        <div className="font-bold mb-2">یکپارچه‌سازی ابری</div>
                        <div className="text-blue-700 text-sm">ارائه سرویس پایدار برای یکپارچه‌سازی و استانداردسازی</div>
                    </div>
                    <div className="flex flex-col items-center bg-white text-blue-900 p-6 rounded-xl">
                        <span className="text-5xl mb-4">🗄️</span>
                        <div className="font-bold mb-2">مدیریت بانک داده</div>
                        <div className="text-blue-700 text-sm">داده‌ها را امن نگهدار و به‌راحتی مدیریت کن</div>
                    </div>
                    <div className="flex flex-col items-center bg-white text-blue-900 p-6 rounded-xl">
                        <span className="text-5xl mb-4">{"</>"}</span>
                        <div className="font-bold mb-2">کدهای آماده</div>
                        <div className="text-blue-700 text-sm">نمونه کدهای سریع و آماده برای اتصال</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

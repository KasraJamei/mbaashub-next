// app/components/landing/LandingCapabilities.tsx
export default function LandingCapabilities() {
    return (
        <section className="py-16 px-4 bg-blue-900 text-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">قابلیت های ما</h2>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <span className="text-2xl mt-1">🚀</span>
                        <div>
                            <h3 className="font-bold text-white mb-1">راه‌اندازی سریع و آسان</h3>
                            <p className="text-blue-100 text-sm">در کمتر از چند دقیقه پروژه‌ات را تحویل بگیر.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="text-2xl mt-1">🔒</span>
                        <div>
                            <h3 className="font-bold text-white mb-1">امنیت و پایداری بالا</h3>
                            <p className="text-blue-100 text-sm">سرورها با مانیتورینگ ۲۴ساعته محافظت می‌شوند.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="text-2xl mt-1">📈</span>
                        <div>
                            <h3 className="font-bold text-white mb-1">مقیاس‌پذیری خودکار</h3>
                            <p className="text-blue-100 text-sm">با افزایش منابع به صورت اتوماتیک گسترش پیدا می‌کند.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="text-2xl mt-1">🔧</span>
                        <div>
                            <h3 className="font-bold text-white mb-1">API های آماده برای استفاده</h3>
                            <p className="text-blue-100 text-sm">تمام عملیات هویت و CRUD آماده است.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// app/components/landing/LandingDesk.tsx
export default function LandingDesk() {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-6">میز خدمات</h2>
            </div>
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            <div>
                                <h3 className="font-bold text-blue-900 mb-1">احراز هویت</h3>
                                <p className="text-blue-700 text-sm">سیستم کامل احراز هویت، ثبت‌نام، ورود و مدیریت کاربران</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            <div>
                                <h3 className="font-bold text-blue-900 mb-1">بانک داده</h3>
                                <p className="text-blue-700 text-sm">مدیریت امن و سریع داده‌ها و روابط در محیط ابری</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            <div>
                                <h3 className="font-bold text-blue-900 mb-1">API‌ها</h3>
                                <p className="text-blue-700 text-sm">رابط‌های کاربردی سریع برای اتصال frontend به backend</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            <div>
                                <h3 className="font-bold text-blue-900 mb-1">میز خدمت</h3>
                                <p className="text-blue-700 text-sm">پنل مدیریتی جامع برای مشاهده و مانیتورینگ</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-1 lg:order-2">
                    <div className="bg-gray-100 p-8 rounded-xl shadow">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white p-4 rounded-lg shadow border-r-4 border-gray-200">
                                <div className="font-bold text-sm text-gray-700 mb-2">Dashboard</div>
                                <div className="text-xs text-gray-600">Overview of services and analytics</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <div className="font-bold text-sm text-gray-700 mb-2">Database</div>
                                <div className="text-xs text-gray-600">Data management and security</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

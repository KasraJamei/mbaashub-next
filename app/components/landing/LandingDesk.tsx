// app/components/landing/LandingDesk.tsx
export default function LandingDesk() {
    return (
        <section dir="rtl" className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-center lg:items-start">
                {/* Right Column: Title and Text */}
                <div className="flex-1 text-center lg:text-right">
                    <h2 className="text-3xl font-extrabold text-blue-900 mb-6">میز خدمات</h2>
                    <div className="space-y-4">
                        <p className="text-gray-700 leading-8">
                            داشبورد مدیریتی این زیرساخت ابری با هدف ساده سازی فرآیند توسعه و استقرار سرویس های شما طراحی شده است. در این محیط، توسعه دهندگان می توانند به صورت یکپارچه به مدیریت داده ها، کنترل دسترسی، مانیتورینگ سرویس ها و پشتیبانی از API ها بپردازند.
                        </p>
                        <p className="text-gray-700 leading-8">
                            طراحی این پنل با رویکرد شفافیت، امنیت و پایداری بالا انجام شده و به سازمان ها، شرکت های دانش بنیان و تیم های نرم افزاری کمک می کند تا بدون درگیری با پیچیدگی های زیرساختی، تمرکز خود را بر توسعه خدمات نوآورانه بگذارند.
                        </p>
                        <p className="text-gray-700 leading-8">
                            امکانات میز خدمت به گونه ای توسعه یافته که تمام مراحل ایجاد، استقرار و نگهداری پروژه های ابری در یک محیط واحد قابل انجام باشد.
                        </p>
                    </div>
                </div>

                {/* Left Column: Images */}
                <div className="flex-1 w-full mt-8 lg:mt-0">
                    <div className="relative max-w-xl mx-auto">
                        <div className="absolute -top-8 -left-8 w-full h-full bg-gray-200 rounded-2xl shadow-lg border border-gray-100 hidden md:block" />
                        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                            <img
                                src="https://picsum.photos/980/620?random=65"
                                alt="Demo Screenshot"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

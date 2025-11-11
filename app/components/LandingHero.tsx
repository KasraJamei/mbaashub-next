export default function LandingHero() {
    return (
        <section className="min-h-[60vh] flex flex-col justify-center items-center text-center py-14 bg-gradient-to-b from-indigo-50 to-white">
            <h1 className="text-3xl sm:text-5xl font-bold text-indigo-800 mb-6">
                به <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">MBAAS HUB</span> خوش آمدید!
            </h1>
            <p className="max-w-xl mx-auto text-gray-500 text-lg sm:text-xl mb-8">
                سرویس ابری و توسعه چابک مخصوص تیم‌های فنی و کسب‌وکارهای آینده‌نگر
            </p>
            <a
                href="/main/dashboard"
                className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-xl text-white font-semibold text-lg shadow-lg"
            >
                همین الان شروع کن
            </a>
        </section>
    );
}

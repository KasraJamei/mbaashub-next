// app/components/landing/LandingFooter.tsx
export default function LandingFooter() {
    return (
        <footer className="py-12 px-6 text-blue-900 text-xs bg-white border-t">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-right">
                    <div className="font-bold mb-2">خدمات</div>
                    <div>سرویس ها • پایگاه داده • یکپارچگی • کنسول</div>
                    <div className="mt-4">© معاونت علمی فناوری و اقتصاد دانش بنیان</div>
                </div>
                <div className="text-right">
                    <div className="font-bold mb-2">دسترسی</div>
                    <div>ورود به پنل • سوالات • راهنما • قوانین</div>
                    <div className="mt-2">021-83535</div>
                    <div>pr@isit.ir</div>
                </div>
                <div className="text-right">
                    <div className="font-bold mb-2">ارتباط با ما</div>
                    <div>تهران، میدان ونک، خیابان ملاصدرا، شیخ بهایی جنوبی، لادن پلاك ۲۰</div>
                    <div className="mt-2">www.isit.ir</div>
                </div>
            </div>
        </footer>
    );
}

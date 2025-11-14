// app/components/landing/LandingUsers.tsx
import { Card } from '@/app/components/Shared/Card';

export default function LandingUsers() {
    return (
        <section className="py-10 px-4 text-center bg-white">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">کاربران ما</h2>
            <div className="mb-5 text-blue-800">
                از استارتاپ‌های کوچک تا تیم‌های توسعه سازمانی، سرویسمان استفاده می‌کنند.
                <br />
                توسعه سریع‌تر و هوشمندتر را تجربه کن!
            </div>
            <div className="flex justify-center gap-3 flex-wrap w-full">
                {['پیمانکار ۱', 'پیمانکار ۲', 'پیمانکار ۳', 'پیمانکار ۴', 'پیمانکار ۵'].map((name, i) => (
                    <Card key={name} className="flex flex-col items-center py-3 px-6 w-36">
                        <div className="w-12 h-12 bg-blue-200 rounded-full mb-2 flex items-center justify-center text-lg font-bold text-blue-700">{i + 1}</div>
                        <span className="text-blue-800 font-semibold">{name}</span>
                    </Card>
                ))}
            </div>
        </section>
    );
}

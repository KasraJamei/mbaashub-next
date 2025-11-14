// app/components/Auth/AuthTabs.tsx
"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuthTabs() {
    const searchParams = useSearchParams();
    const currentView = searchParams.get("view") || "register";

    const tabClass = (view: "login" | "register") =>
        `pb-2 border-b-2 transition-colors ${currentView === view
            ? "border-blue-600 text-blue-600 font-bold"
            : "border-transparent text-gray-500 hover:border-gray-300"
        }`;

    return (
        <div className="w-full flex justify-around items-center mb-6">
            <Link href="/auth?view=register" className={tabClass("register")}>
                ثبت نام
            </Link>
            <Link href="/auth?view=login" className={tabClass("login")}>
                ورود
            </Link>
        </div>
    );
}

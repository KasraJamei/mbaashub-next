// app/auth/page.tsx
"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    RegisterForm,
    LoginForm,
    ForgotPasswordForm,
} from "@/app/components/Auth/AuthForms";

export default function AuthPage() {
    const searchParams = useSearchParams();
    const view = searchParams.get("view") || "register";

    const renderForm = () => {
        switch (view) {
            case "login":
                return <LoginForm />;
            case "forgot-password":
                return <ForgotPasswordForm />;
            default:
                return <RegisterForm />;
        }
    };

    return (
        <div
            dir="rtl"
            className="w-full max-w-lg bg-[#f2f8ff] p-8 rounded-2xl shadow-lg border border-gray-200 relative"
        >
            <header className="flex items-center pb-4 border-b border-gray-300 mb-8 pr-10">
                <Link
                    href="/"
                    className="absolute right-6 text-gray-600 hover:text-gray-900"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </Link>
                <div className="flex-1 flex justify-center items-center gap-3 text-blue-900">
                    <span className="w-9 h-9 bg-blue-200 rounded-full flex-shrink-0" />
                    <span className="font-bold text-base sm:text-lg text-center">
                        معاونت علمی، فناوری و اقتصاد دانش بنیان
                    </span>
                </div>
            </header>

            {renderForm()}
        </div>
    );
}

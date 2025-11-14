// app/components/landing/LandingHeader.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/Shared/Button";
import Link from "next/link";

export default function LandingHeader() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <header
            dir="rtl"
            className="w-full flex items-center justify-between px-4 sm:px-6 py-4 bg-white shadow-sm sticky top-0 z-50"
        >
            <div className="font-bold text-blue-900 text-lg">
                معاونت علمی فناوری و اقتصاد دانش بنیان
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-3">
                <Link href="/auth?view=login">
                    <Button variant="secondary" className="whitespace-nowrap">
                        ورود
                    </Button>
                </Link>
                <Link href="/auth?view=register">
                    <Button variant="primary" className="whitespace-nowrap">
                        ثبت نام
                    </Button>
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button
                    onClick={() => setMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
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
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu - with transition */}
            <div
                className={`absolute top-full left-0 w-full bg-white shadow-md md:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? "transform translate-y-0" : "transform -translate-y-full"
                    }`}
                style={{ visibility: isMenuOpen ? "visible" : "hidden" }}
            >
                <div className="flex flex-col items-center gap-4 p-4">
                    <Link href="/auth?view=login" className="w-full">
                        <Button variant="secondary" className="w-full">
                            ورود
                        </Button>
                    </Link>
                    <Link href="/auth?view=register" className="w-full">
                        <Button variant="primary" className="w-full">
                            ثبت نام
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

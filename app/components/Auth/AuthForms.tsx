"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Shared/Button";
import { Notification } from "@/app/components/Shared/Notification";
import { useNotification } from "@/hooks/useNotification";
import { registerUser, loginUser, userExists } from "@/lib/auth";

export const RegisterForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { notification, showNotification, hideNotification } = useNotification();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const { email, username, password } = formData;

            if (!email || !username || !password) {
                showNotification("error", "لطفا تمام فیلدها را پر کنید");
                setLoading(false);
                return;
            }

            const success = registerUser(email, username, password);

            if (success) {
                loginUser(email, password);
                showNotification("success", "ثبت نام با موفقیت انجام شد");
                setTimeout(() => {
                    router.push('/main/identity-overview');
                }, 1000);
            } else {
                showNotification("error", "این ایمیل یا نام کاربری قبلا ثبت شده است");
                setLoading(false);
            }
        }, 500);
    };

    return (
        <>
            {notification.isVisible && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={hideNotification}
                />
            )}
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">ثبت نام</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                            ایمیل <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-2 border rounded-md bg-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                            نام کاربری <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full p-2 border rounded-md bg-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                            رمز عبور <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full p-2 border rounded-md bg-white"
                            required
                            minLength={6}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? 'در حال پردازش...' : 'ادامه'}
                    </Button>
                    <p className="text-center text-sm text-gray-600">
                        حساب کاربری دارید؟{" "}
                        <Link href="/auth?view=login" className="text-blue-600 hover:underline">
                            وارد شوید
                        </Link>
                    </p>
                </div>
            </form>
        </>
    );
};

export const LoginForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { notification, showNotification, hideNotification } = useNotification();
    const [formData, setFormData] = useState({
        emailOrUsername: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const { emailOrUsername, password } = formData;

            if (!emailOrUsername || !password) {
                showNotification("error", "لطفا تمام فیلدها را پر کنید");
                setLoading(false);
                return;
            }

            if (!userExists(emailOrUsername)) {
                showNotification("error", "کاربری با این مشخصات یافت نشد. لطفا ابتدا ثبت نام کنید");
                setLoading(false);
                return;
            }

            const success = loginUser(emailOrUsername, password);

            if (success) {
                showNotification("success", "ورود با موفقیت انجام شد");
                setTimeout(() => {
                    router.push('/main/identity-overview');
                }, 1000);
            } else {
                showNotification("error", "نام کاربری یا رمز عبور اشتباه است");
                setLoading(false);
            }
        }, 500);
    };

    return (
        <>
            {notification.isVisible && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={hideNotification}
                />
            )}
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">ورود</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                            نام کاربری / ایمیل <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.emailOrUsername}
                            onChange={(e) => setFormData({ ...formData, emailOrUsername: e.target.value })}
                            className="w-full p-2 border rounded-md bg-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                            رمز عبور <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full p-2 border rounded-md bg-white"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? 'در حال ورود...' : 'ورود'}
                    </Button>
                    <div className="text-center text-sm">
                        <p className="text-gray-600">
                            حساب کاربری ندارید؟{" "}
                            <Link
                                href="/auth?view=register"
                                className="text-blue-600 hover:underline"
                            >
                                ثبت نام
                            </Link>
                        </p>
                        <p className="mt-2">
                            <Link
                                href="/auth?view=forgot-password"
                                className="text-blue-600 hover:underline"
                            >
                                فراموشی رمز عبور
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </>
    );
};

export const ForgotPasswordForm = () => {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const { notification, showNotification, hideNotification } = useNotification();
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            if (!userExists(email)) {
                showNotification("error", "کاربری با این ایمیل یافت نشد");
                setLoading(false);
                return;
            }

            showNotification("success", "لینک بازیابی رمز عبور به ایمیل شما ارسال شد");
            setLoading(false);
            setSent(true);
        }, 500);
    };

    return (
        <>
            {notification.isVisible && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={hideNotification}
                />
            )}
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">فراموشی رمز عبور</h2>
                <div className="space-y-4">
                    {!sent && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                                    ایمیل <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border rounded-md bg-white"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? 'در حال ارسال...' : 'ارسال'}
                            </Button>
                        </>
                    )}
                    <p className="text-center text-sm text-gray-600">
                        حساب کاربری دارید؟{" "}
                        <Link href="/auth?view=login" className="text-blue-600 hover:underline">
                            وارد شوید
                        </Link>
                    </p>
                </div>
            </form>
        </>
    );
};

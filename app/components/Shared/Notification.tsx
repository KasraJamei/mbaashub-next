"use client";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

interface NotificationProps {
    type: "success" | "error" | "warning";
    message: string;
    onClose: () => void;
    duration?: number;
}

export const Notification = ({
    type,
    message,
    onClose,
    duration = 3000,
}: NotificationProps) => {
    const [phase, setPhase] = useState<"enter" | "visible" | "exit">("enter");

    useEffect(() => {
        const showTimer = setTimeout(() => {
            setPhase("visible");
        }, 50);

        const closeTimer = setTimeout(() => {
            setPhase("exit");
            setTimeout(onClose, 400);
        }, duration);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(closeTimer);
        };
    }, [duration, onClose]);

    const handleClose = () => {
        setPhase("exit");
        setTimeout(onClose, 400);
    };

    const icons = {
        success: <CheckCircle className="w-6 h-6 text-green-500" />,
        error: <XCircle className="w-6 h-6 text-red-500" />,
        warning: <AlertCircle className="w-6 h-6 text-yellow-500" />,
    };

    const styles = {
        success: "bg-green-50 border-green-200 text-green-800",
        error: "bg-red-50 border-red-200 text-red-800",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    };

    const getAnimationState = (currentPhase: "enter" | "visible" | "exit") => {
        switch (currentPhase) {
            case "enter":
                return "translate-x-[120%] opacity-0";
            case "visible":
                return "translate-x-0 opacity-100";
            case "exit":
                return "translate-x-[120%] opacity-0";
        }
    };

    const animationState = getAnimationState(phase);

    return (
        <div
            className={`fixed top-5 right-5 z-[100] flex items-center gap-4 px-5 py-4 rounded-xl border-l-4 shadow-2xl transition-all duration-400 ease-in-out ${animationState
                } ${styles[type]}`}
            dir="rtl"
        >
            {icons[type]}
            <span className="text-base font-semibold flex-1">{message}</span>
            <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );
};

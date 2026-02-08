import { useRef, useState } from "react";
import { useOtpTimer } from "../../hooks/useOtpTimer";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useResendOTPMutation } from "../../redux/features/auth/authApi";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

const OTPVerifyPage = () => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const [timerKey, setTimerKey] = useState(0);
    const secondsLeft = useOtpTimer(timerKey);
    // const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    // const seconds = String(secondsLeft % 60).padStart(2, "0");

    const [resendOtp] = useResendOTPMutation();

    const handleVerify = () => {
        if (secondsLeft <= 0) {
            toast.error("OTP expired! Please request a new one.");
            return;
        }

        const otpCode = otp.join("");
        if (otpCode.length < 6) {
            toast.error("Please enter the complete OTP");
            return;
        }

        // Call your API to verify OTP
        alert(`OTP submitted: ${otpCode}`);
    };

    // Format countdown as mm:ss
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const handlePaste = (
        e: React.ClipboardEvent<HTMLInputElement>,
        index: number
    ) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();

        // Check if pasted data contains only digits
        if (!/^\d+$/.test(pastedData)) {
            toast.error("Please paste only numbers");
            return;
        }

        // Get up to 6 digits from the pasted data
        const digits = pastedData.slice(0, 6).split("");

        const newOtp = [...otp];

        // Fill the inputs starting from the current index
        digits.forEach((digit, i) => {
            if (index + i < 6) {
                newOtp[index + i] = digit;
            }
        });

        setOtp(newOtp);

        // Focus the next empty input or the last input
        const nextIndex = Math.min(index + digits.length, 5);
        inputsRef.current[nextIndex]?.focus();
    };

    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return; // allow only digits

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // keep only last digit
        setOtp(newOtp);

        // focus next input
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleResendOtp = async () => {
        setOtp(Array(6).fill(""));

        try {
            const email = Cookies.get("email");
            // Fixed: removed otp from resend request
            const res = await resendOtp({ email }).unwrap();

            console.log("resend res", res);

            if (res?.success) {
                toast.success(res.message);

                // ⏱ reset expiry
                const expiryTime = Date.now() + 3 * 60 * 1000;
                Cookies.set("otpExpiry", expiryTime.toString());

                // 🔥 force timer restart
                setTimerKey((prev) => prev + 1);
            }
        } catch (error: any) {
            console.log("handleResendOtp", error);
            toast.error(error?.data?.message);
        }
    };

    console.log("secondsLeft", secondsLeft);


    return (
        <div className="flex flex-col w-screen items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card className="w-[90%] mx-auto md:w-full max-w-xl p-0 sm:p-10" data-aos="zoom-in">
                {/* Card Header */}
                <CardHeader className="flex flex-col items-center space-y-3">
                    <img src="/logo.png" className='w-full  max-w-20 h-14 object-cover overflow-visible scale-70' alt="Logo" />
                    <h2 className="text-2xl font-bold text-center">OTP Verification</h2>
                    <p className='text-md text-center text-slate-500 font-sans'>
                        Enter the OTP sent to your email
                    </p>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* OTP Input Grid */}
                    <div className="flex justify-center gap-2 mb-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                // @ts-ignore
                                ref={(el) => (inputsRef.current[index] = el)}
                                type="text"
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={(e) => handlePaste(e, index)}
                                maxLength={1}
                                className="border-2 border-gray-300 p-2 text-center w-12 h-12 rounded text-xl font-semibold focus:border-blue-500 focus:outline-none"
                            />
                        ))}
                    </div>

                    <Button
                        onClick={handleVerify}
                        disabled={secondsLeft <= 0}
                        className="w-full mx-auto  px-6 py-2 rounded mb-4  font-semibold"
                    >
                        Verify OTP
                    </Button>

                    <p className="mb-2 text-center">
                        Time left:{" "}
                        <span className="font-bold text-red-500">
                            {secondsLeft > 0 ? formatTime(secondsLeft) : "Expired"}
                        </span>
                    </p>

                    <Button
                    variant="outline"
                        onClick={handleResendOtp}
                        disabled={secondsLeft > 0}
                        className={`w-full mx-auto px-4 py-2 rounded font-semibold ${secondsLeft > 0 ? 'bg-gray-300! text-gray-500! cursor-not-allowed' 
                            : 'border-gray-500! border-2! hover:bg-gray-200! transition-all! duration-300!'}`}
                    >
                        Resend OTP
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default OTPVerifyPage;
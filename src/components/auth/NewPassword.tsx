import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Eye, EyeOff } from "lucide-react";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill in both fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Submit your password data here
    console.log("New Password Submitted:", { password, confirmPassword });
    toast.success("Password submitted successfully!");
  };

  return (
    <div className="flex flex-col w-screen items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-[90%] mx-auto md:w-full max-w-xl p-0 sm:p-10">
        <CardHeader className="flex flex-col items-center space-y-3">
          <img
            src="/logo.png"
            className="w-full max-w-20 h-14 object-cover overflow-visible scale-70"
            alt="Logo"
          />
          <h2 className="text-2xl font-bold text-center">Set New Password</h2>
          <p className="text-md text-center text-slate-500 font-sans">
            Enter your new password below
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4">
            {/* Password Field */}
            <div className="flex flex-col relative">
              <label className="text-md text-gray-700 mb-1">Password</label>
              <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 w-full border-gray-300 p-2 h-12 rounded text-md focus:border-blue-500 focus:outline-none pr-10"
                placeholder="Enter new password"
              />
              <span onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
                {showPassword ? <EyeOff size={18}  /> : <Eye size={18} />}
              </span>              
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col">
              <label className="text-md text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-2 w-full border-gray-300 p-2 h-12 rounded text-md focus:border-blue-500 focus:outline-none pr-10"
                placeholder="Confirm new password"
              />
              <span  onClick={() => setShowConfirm(!showConfirm)} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18}  />}
              </span>
              </div>
              
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full mx-auto bg-green-800! text-white px-6 py-2 rounded mb-4 hover:bg-green-600 font-semibold"
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPassword;

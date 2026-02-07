import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui//button"
import { Input } from "../ui//input"
import { Label } from "../ui//label"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  return (
    <div className="min-h-screen  w-screen  flex items-center justify-center bg-gradient-to-br from-[#f7f8fc] to-[#eef2ff] px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <img src="/logo.png" className='w-full  max-w-20 h-14 object-cover overflow-visible scale-70' alt="Logo" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            Forgot Password
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your email address and we’ll send you a reset link
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email */}
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="enter email..."
              className="h-11"
            />
          </div>

          {/* Submit */}
          <Button className="w-full h-11 text-base">
            Send Reset Link
          </Button>

          {/* Back to login */}
          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

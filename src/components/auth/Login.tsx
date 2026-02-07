import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [acceptTerms, setAcceptTerms] = useState(false)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        const payload = {
            email,
            password,
            acceptTerms,
        }

        console.log("Login submitted:", payload)
    }

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-linear-to-br from-[#f7f8fc] to-[#eef2ff] px-4">
            <Card className="w-full max-w-md rounded-2xl shadow-lg">
                <CardHeader className="text-center space-y-2">
                    <div className="flex justify-center">
                        <img src="/logo.png" className='w-full  max-w-20 h-14 object-cover overflow-visible scale-70' alt="Logo" />
                    </div>
                    <CardTitle className="text-2xl font-semibold">
                        Welcome back
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Glad to see you again 👋 <br />
                        Login to your account below
                    </p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-1">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="enter email..."
                                className="h-11"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <Label>Password</Label>
                            <Input
                                type="password"
                                placeholder="enter password..."
                                className="h-11"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {/* Terms + Forgot */}
                        <div className="space-y-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="terms"
                                    className="inline"
                                    checked={acceptTerms}
                                    onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                                />
                                <Label
                                    htmlFor="terms"
                                    className="text-sm cursor-pointer"
                                >
                                    Accept terms and conditions
                                </Label>
                            </div>

                            <div className="flex justify-end">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-primary font-medium hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>


                        {/* Login Button */}
                        <Button type="submit" className="w-full h-11 text-base">
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

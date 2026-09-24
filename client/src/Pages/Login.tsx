import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Shield, Lock, Mail, ArrowRight, User, Eye, EyeOff } from "lucide-react";

import { useAuth } from "../context/AuthContext";

import { assets } from "../assets/assets";

import toast from "react-hot-toast";



const Login = () => {

    const navigate = useNavigate();

    const { login, register, isAuthenticated, user } = useAuth();

    const [isLogin, setIsLogin] = useState(true);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({

        email: "",

        password: "",

        name: "",

        confirmPassword: "",

    });

    const [isLoading, setIsLoading] = useState(false);



    // Redirect if already authenticated

    useEffect(() => {

        if (isAuthenticated) {

            if (user?.isAdmin) {

                navigate("/superAdmin");

            } else {

                navigate("/");

            }

        }

    }, [isAuthenticated, user, navigate]);



    const validatePassword = (password: string): { valid: boolean; message?: string } => {

        if (password.length < 8) {

            return { valid: false, message: "Password must be at least 8 characters long" };

        }

        const hasLetter = /[a-zA-Z]/.test(password);

        const hasNumber = /\d/.test(password);

        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);



        if (!hasLetter) {

            return { valid: false, message: "Password must contain at least one letter" };

        }

        if (!hasNumber) {

            return { valid: false, message: "Password must contain at least one number" };

        }

        if (!hasSpecialChar) {

            return { valid: false, message: "Password must contain at least one special character" };

        }

        return { valid: true };

    };



    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        setIsLoading(true);



        try {

            if (isLogin) {

                // Login

                await login(formData.email, formData.password);

            } else {

                // Register

                // Validate password

                const passwordValidation = validatePassword(formData.password);

                if (!passwordValidation.valid) {

                    toast.error(passwordValidation.message || "Invalid password");

                    return;

                }



                // Check password confirmation

                if (formData.password !== formData.confirmPassword) {

                    toast.error("Passwords do not match");

                    return;

                }



                await register(formData.name, formData.email, formData.password);

            }

        } catch (error: any) {

            console.error("Authentication error:", error);

            // Error is already handled by toast in AuthContext

        } finally {

            setIsLoading(false);

        }

    };



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };



    const toggleMode = () => {

        setIsLogin(!isLogin);

        setFormData({

            email: "",

            password: "",

            name: "",

            confirmPassword: "",

        });

    };



    return (

        <div className="min-h-screen bg-black flex">

            {/* Left Side - Decorative */}

            <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">

                <img src={assets.loginImage} alt="login Image" className="absolute inset-0 object-cover h-full bg-center" />

            </div>



            {/* Right Side - Form */}

            <div className="flex-1 flex-center px-4 py-12 bg-black">

                <div className="w-full max-w-md">

                    {/* Mobile Logo */}

                    <div className="lg:hidden text-center mb-8">

                        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-900 rounded-2xl mb-4">

                            <Shield className="w-8 h-8 text-white" />

                        </div>

                        <h1 className="text-2xl font-bold text-white mb-2">

                            {isLogin ? "Admin Access" : "Create Account"}

                        </h1>

                    </div>



                    {/* Form Card */}

                    <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-3xl p-8">

                        {/* Desktop Header */}

                        <div className="hidden lg:block mb-8">

                            <h1 className="text-3xl font-bold text-white mb-2">

                                {isLogin ? "Welcome Back" : "Get Started"}

                            </h1>

                            <p className="text-slate-400">

                                {isLogin ? "Sign in to manage your portfolio" : "Create your admin account"}

                            </p>

                        </div>



                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Name Field (Register Only) */}

                            {!isLogin && (

                                <div>

                                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">

                                        Full Name

                                    </label>

                                    <div className="relative">

                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                                        <input

                                            type="text"

                                            id="name"

                                            name="name"

                                            value={formData.name}

                                            onChange={handleChange}

                                            required={!isLogin}

                                            className="w-full pl-12 pr-4 py-3.5 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 focus:ring-1 focus:ring-orange-900 transition-all"

                                            placeholder="John Doe"

                                        />

                                    </div>

                                </div>

                            )}



                            {/* Email Field */}

                            <div>

                                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">

                                    Email Address

                                </label>

                                <div className="relative">

                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                                    <input

                                        type="email"

                                        id="email"

                                        name="email"

                                        value={formData.email}

                                        onChange={handleChange}

                                        required

                                        className="w-full pl-12 pr-4 py-3.5 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 focus:ring-1 focus:ring-orange-900 transition-all"

                                        placeholder="admin@example.com"

                                    />

                                </div>

                            </div>



                            {/* Password Field */}

                            <div>

                                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">

                                    Password

                                </label>

                                <div className="relative">

                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                                    <input

                                        type={showPassword ? "text" : "password"}

                                        id="password"

                                        name="password"

                                        value={formData.password}

                                        onChange={handleChange}

                                        required

                                        className="w-full pl-12 pr-12 py-3.5 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 focus:ring-1 focus:ring-orange-900 transition-all"

                                        placeholder="••••••••"

                                    />

                                    <button

                                        type="button"

                                        onClick={() => setShowPassword(!showPassword)}

                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"

                                    >

                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}

                                    </button>

                                </div>

                            </div>



                            {/* Confirm Password Field (Register Only) */}

                            {!isLogin && (

                                <div>

                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">

                                        Confirm Password

                                    </label>

                                    <div className="relative">

                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                                        <input

                                            type={showConfirmPassword ? "text" : "password"}

                                            id="confirmPassword"

                                            name="confirmPassword"

                                            value={formData.confirmPassword}

                                            onChange={handleChange}

                                            required={!isLogin}

                                            className="w-full pl-12 pr-12 py-3.5 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 focus:ring-1 focus:ring-orange-900 transition-all"

                                            placeholder="••••••••"

                                        />

                                        <button

                                            type="button"

                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}

                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"

                                        >

                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}

                                        </button>

                                    </div>

                                </div>

                            )}



                            {/* Remember Me & Forgot Password (Login Only) */}

                            {isLogin && (

                                <div className="flex items-center justify-between text-sm">

                                    <label className="flex items-center gap-2 text-slate-400 cursor-pointer">

                                        <input

                                            type="checkbox"

                                            className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-orange-900 focus:ring-orange-900 focus:ring-offset-0"

                                        />

                                        <span>Remember me</span>

                                    </label>

                                    <button

                                        type="button"

                                        className="text-orange-500 hover:text-orange-400 transition-colors"

                                    >

                                        Forgot password?

                                    </button>

                                </div>

                            )}



                            {/* Submit Button */}

                            <button

                                type="submit"

                                disabled={isLoading}

                                className="w-full bg-orange-900 hover:to-orange-800 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"

                            >

                                {isLoading ? (

                                    <>

                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                                        <span>{isLogin ? "Signing in..." : "Creating account..."}</span>

                                    </>

                                ) : (

                                    <>

                                        <span>{isLogin ? "Sign In" : "Create Account"}</span>

                                        <ArrowRight className="w-5 h-5" />

                                    </>

                                )}

                            </button>

                        </form>



                        {/* Toggle Login/Register */}

                        <div className="mt-6 text-center">

                            <p className="text-slate-400 text-sm">

                                {isLogin ? "Don't have an account? " : "Already have an account? "}

                                <button

                                    type="button"

                                    onClick={toggleMode}

                                    className="text-orange-900 hover:text-orange-800 font-semibold transition-colors"

                                >

                                    {isLogin ? "Sign up" : "Sign in"}

                                </button>

                            </p>

                        </div>



                        {/* Back to Home */}

                        <button

                            onClick={() => navigate("/")}

                            className="w-full mt-4 text-slate-500 hover:text-slate-300 text-sm transition-colors"

                        >

                            ← Back to Home

                        </button>

                    </div>



                    {/* Footer */}

                    <p className="text-center text-slate-600 text-xs mt-6">

                        © 2026 Portfolio Admin. Secure authentication.

                    </p>

                </div>

            </div>

        </div>

    );

};



export default Login;


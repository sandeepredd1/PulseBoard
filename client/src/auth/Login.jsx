import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Sparkles, Shield, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError("");
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Unable to sign in");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-purple-300/30 to-pink-300/30 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-300/30 to-cyan-300/30 blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-r from-indigo-200/20 to-purple-200/20 blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 animate-float opacity-20">
        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-xl" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float [animation-delay:2s] opacity-20">
        <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 blur-xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="group relative overflow-hidden rounded-[40px] bg-white/40 backdrop-blur-2xl p-8 shadow-2xl shadow-purple-200/50 border border-white/60 transition-all duration-500 hover:shadow-[0_30px_80px_rgba(139,92,246,0.25)] hover:-translate-y-2">
          {/* Card Glow */}
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-r from-purple-300/30 to-pink-300/30 blur-3xl transition-all duration-700 group-hover:scale-150" />
          <div className="absolute -left-32 -bottom-32 h-64 w-64 rounded-full bg-gradient-to-r from-blue-300/30 to-cyan-300/30 blur-3xl transition-all duration-700 group-hover:scale-150 [animation-delay:1s]" />

          <div className="relative">
            {/* Header */}
            <div className="mb-8 text-center">
             
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="mt-3 text-sm text-gray-600 max-w-xs mx-auto">
                Sign in to access your dashboard and manage your projects
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-200/80 bg-red-50/90 backdrop-blur-sm px-4 py-3 text-sm text-red-600 shadow-lg shadow-red-100/50">
                <div className="h-2 w-2 shrink-0 rounded-full bg-red-500 animate-pulse" />
                <p>{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="login-email" className="mb-2 block text-xs font-semibold text-gray-700 tracking-wide">
                  Email Address
                </label>
                <div className="group/input relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all group-focus-within/input:text-purple-500 group-focus-within/input:scale-110" size={18} />
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-white/60 bg-white/70 backdrop-blur-sm py-3.5 pl-11 pr-4 text-sm text-gray-900 shadow-sm outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-purple-300 hover:bg-white/80 hover:shadow-md focus:border-purple-400 focus:bg-white/90 focus:shadow-lg focus:shadow-purple-100/70 focus:ring-4 focus:ring-purple-200/50"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="login-password" className="block text-xs font-semibold text-gray-700 tracking-wide">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-xs font-medium text-purple-600 transition-all hover:text-purple-700 hover:underline hover:scale-105 inline-block">
                    Forgot password?
                  </Link>
                </div>
                <div className="group/input relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all group-focus-within/input:text-purple-500 group-focus-within/input:scale-110" size={18} />
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-white/60 bg-white/70 backdrop-blur-sm py-3.5 pl-11 pr-12 text-sm text-gray-900 shadow-sm outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-purple-300 hover:bg-white/80 hover:shadow-md focus:border-purple-400 focus:bg-white/90 focus:shadow-lg focus:shadow-purple-100/70 focus:ring-4 focus:ring-purple-200/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-gray-400 transition-all hover:bg-purple-50/80 hover:text-purple-600 hover:scale-110"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 accent-purple-600 focus:ring-purple-500 focus:ring-2 transition-all"
                />
                <label htmlFor="remember-me" className="text-xs text-gray-500">
                  Keep me signed in
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="group/button relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 py-3.5 text-sm font-semibold text-white shadow-xl shadow-purple-300/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-400/60 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/button:translate-x-full" />
                <span className="relative flex items-center gap-2">
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={17} className="transition-transform duration-300 group-hover/button:translate-x-1" />
                    </>
                  )}
                </span>
              </button>
            </form>

       

            {/* Register */}
            <p className="text-center my-4 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-purple-600 transition-all hover:text-purple-700 hover:underline hover:scale-105 inline-block">
                Create account
              </Link>
            </p>

        
          </div>
        </div>

    
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
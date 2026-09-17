import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  LockKeyhole,
  User,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setSuccess("");

      await register(form);

      setSuccess("Account created successfully. Please login.");

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err) {
      setError(err.message || "Unable to create account");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-r from-purple-300/30 to-pink-300/30 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-r from-blue-300/30 to-cyan-300/30 blur-3xl [animation-delay:1s]" />

        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-indigo-200/20 to-purple-200/20 blur-3xl [animation-delay:2s]" />
      </div>

      {/* Floating Shapes */}
      <div className="absolute left-10 top-20 animate-float opacity-20">
        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-xl" />
      </div>

      <div className="absolute bottom-20 right-10 animate-float opacity-20 [animation-delay:2s]">
        <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 blur-xl" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md px-4 py-8">
        <div className="group relative overflow-hidden rounded-[40px] border border-white/60 bg-white/40 p-8 shadow-2xl shadow-purple-200/50 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(139,92,246,0.25)]">
          {/* Card Glow */}
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-r from-purple-300/30 to-pink-300/30 blur-3xl transition-all duration-700 group-hover:scale-150" />

          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-gradient-to-r from-blue-300/30 to-cyan-300/30 blur-3xl transition-all duration-700 group-hover:scale-150 [animation-delay:1s]" />

          <div className="relative">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-4xl font-bold text-transparent">
                Create Account
              </h1>

              <p className="mx-auto mt-3 max-w-xs text-sm text-gray-600">
                Start managing your projects with PulseBoard
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-200/80 bg-red-50/90 px-4 py-3 text-sm text-red-600 shadow-lg shadow-red-100/50 backdrop-blur-sm">
                <div className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-red-500" />
                <p>{error}</p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-emerald-200/80 bg-emerald-50/90 px-4 py-3 text-sm text-emerald-600 shadow-lg shadow-emerald-100/50 backdrop-blur-sm">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <p>{success}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="register-name"
                  className="mb-2 block text-xs font-semibold tracking-wide text-gray-700"
                >
                  Full Name
                </label>

                <div className="group/input relative">
                  <User
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all group-focus-within/input:scale-110 group-focus-within/input:text-purple-500"
                    size={18}
                  />

                  <input
                    id="register-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        name: event.target.value,
                      })
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-2xl border border-white/60 bg-white/70 py-3.5 pl-11 pr-4 text-sm text-gray-900 shadow-sm outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400 hover:border-purple-300 hover:bg-white/80 hover:shadow-md focus:border-purple-400 focus:bg-white/90 focus:shadow-lg focus:shadow-purple-100/70 focus:ring-4 focus:ring-purple-200/50"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="register-email"
                  className="mb-2 block text-xs font-semibold tracking-wide text-gray-700"
                >
                  Email Address
                </label>

                <div className="group/input relative">
                  <Mail
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all group-focus-within/input:scale-110 group-focus-within/input:text-purple-500"
                    size={18}
                  />

                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        email: event.target.value,
                      })
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-white/60 bg-white/70 py-3.5 pl-11 pr-4 text-sm text-gray-900 shadow-sm outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400 hover:border-purple-300 hover:bg-white/80 hover:shadow-md focus:border-purple-400 focus:bg-white/90 focus:shadow-lg focus:shadow-purple-100/70 focus:ring-4 focus:ring-purple-200/50"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="register-password"
                  className="mb-2 block text-xs font-semibold tracking-wide text-gray-700"
                >
                  Password
                </label>

                <div className="group/input relative">
                  <LockKeyhole
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all group-focus-within/input:scale-110 group-focus-within/input:text-purple-500"
                    size={18}
                  />

                  <input
                    id="register-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        password: event.target.value,
                      })
                    }
                    placeholder="Minimum 8 characters"
                    className="w-full rounded-2xl border border-white/60 bg-white/70 py-3.5 pl-11 pr-12 text-sm text-gray-900 shadow-sm outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400 hover:border-purple-300 hover:bg-white/80 hover:shadow-md focus:border-purple-400 focus:bg-white/90 focus:shadow-lg focus:shadow-purple-100/70 focus:ring-4 focus:ring-purple-200/50"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-gray-400 transition-all hover:scale-110 hover:bg-purple-50/80 hover:text-purple-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>

                <p className="mt-1.5 text-[10px] text-gray-400">
                  Must be at least 8 characters
                </p>
              </div>

              {/* Register Button */}
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
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover/button:translate-x-1"
                      />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent" />

              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent" />
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="inline-block font-semibold text-purple-600 transition-all hover:scale-105 hover:text-purple-700 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* React CSS */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
import { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import {
  resetPassword,
} from "../services/api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || "";

  const otp =
    location.state?.otp || "";

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email || !otp) {
      setError(
        "Password reset session is missing. Please request a new OTP."
      );
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await resetPassword(
          email,
          otp,
          password,
          confirmPassword
        );

      setSuccess(
        response.message ||
          "Password reset successfully."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(
        err.message ||
          "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="dashboard-bg relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6">

      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">

        <div className="rounded-[32px] border border-white/70 bg-white/45 p-6 shadow-2xl shadow-violet-200/30 backdrop-blur-2xl sm:p-8">

          <div className="mb-8 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <LockKeyhole size={26} />
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900">
              Reset Password
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
              Create a new password for your
              PulseBoard account.
            </p>

            {email && (
              <p className="mt-3 break-all text-xs font-semibold text-violet-600">
                {email}
              </p>
            )}
          </div>

          {error && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-600">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-xs font-semibold text-gray-700"
              >
                New Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => {
                    setPassword(
                      event.target.value
                    );
                    setError("");
                  }}
                  placeholder="Minimum 8 characters"
                  className="w-full rounded-2xl border border-white/80 bg-white/65 py-3.5 pl-11 pr-12 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-violet-300 focus:bg-white/90 focus:ring-4 focus:ring-violet-100/70"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-violet-600"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
            </div>

            <div>

              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-xs font-semibold text-gray-700"
              >
                Confirm Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={
                    confirmPassword
                  }
                  onChange={(event) => {
                    setConfirmPassword(
                      event.target.value
                    );
                    setError("");
                  }}
                  placeholder="Re-enter your password"
                  className="w-full rounded-2xl border border-white/80 bg-white/65 py-3.5 pl-11 pr-12 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-violet-300 focus:bg-white/90 focus:ring-4 focus:ring-violet-100/70"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-violet-600"
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
            </div>

            <div className="rounded-2xl border border-violet-100 bg-violet-50/60 px-4 py-3">
              <p className="text-xs leading-5 text-violet-700">
                Your password must contain at
                least 8 characters.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-300/40 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Resetting Password..."
                : "Reset Password"}

              {!loading && (
                <ArrowRight size={17} />
              )}
            </button>

          </form>

          <div className="mt-7 text-center">

            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-violet-600"
            >
              <ArrowLeft size={16} />

              Back to Login
            </Link>

          </div>

        </div>

        <p className="mt-6 text-center text-[11px] text-gray-400">
          <ShieldCheck
            size={12}
            className="mr-1 inline"
          />
          Secure access to your PulseBoard workspace
        </p>

      </div>
    </main>
  );
}
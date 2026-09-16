import { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  MailCheck,
  ShieldCheck,
} from "lucide-react";

import {
  verifyOTP,
  forgotPassword,
} from "../services/api";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || "";

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [resending, setResending] =
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

    if (!email) {
      setError(
        "Email is missing. Please request a new OTP."
      );
      return;
    }

    if (otp.length !== 6) {
      setError(
        "Please enter the 6-digit OTP."
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await verifyOTP(
          email,
          otp
        );

      setSuccess(
        response.message ||
          "Email verified successfully."
      );

      setTimeout(() => {
        navigate(
          "/reset-password",
          {
            state: {
              email,
              otp,
            },
          }
        );
      }, 700);
    } catch (err) {
      setError(
        err.message ||
          "Invalid or expired OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      setError(
        "Email is missing. Please go back and enter your email."
      );
      return;
    }

    try {
      setResending(true);

      const response =
        await forgotPassword(
          email
        );

      setSuccess(
        response.message ||
          "A new OTP has been sent to your email."
      );

      setOtp("");
    } catch (err) {
      setError(
        err.message ||
          "Unable to resend OTP."
      );
    } finally {
      setResending(false);
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
              <MailCheck size={26} />
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900">
              Verify Your Email
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
              We've sent a 6-digit verification
              code to your email address.
            </p>

            {email && (
              <p className="mt-3 break-all text-sm font-semibold text-violet-600">
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
                htmlFor="otp"
                className="mb-2 block text-xs font-semibold text-gray-700"
              >
                Verification Code
              </label>

              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                required
                value={otp}
                onChange={(event) => {
                  const value =
                    event.target.value.replace(
                      /\D/g,
                      ""
                    );

                  setOtp(value);
                  setError("");
                }}
                placeholder="000000"
                className="w-full rounded-2xl border border-white/80 bg-white/65 px-4 py-4 text-center text-2xl font-semibold tracking-[0.5em] text-gray-900 shadow-sm outline-none transition focus:border-violet-300 focus:bg-white/90 focus:ring-4 focus:ring-violet-100/70"
              />

            </div>

            <button
              type="submit"
              disabled={
                loading ||
                otp.length !== 6
              }
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-300/40 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Verifying..."
                : "Verify Email"}

              {!loading && (
                <ArrowRight size={17} />
              )}
            </button>
          </form>

          <div className="mt-7 text-center">

            <p className="text-xs text-gray-500">
              Didn't receive the code?
            </p>

            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="mt-2 text-sm font-semibold text-violet-600 transition hover:text-violet-700 disabled:opacity-50"
            >
              {resending
                ? "Sending..."
                : "Resend OTP"}
            </button>

          </div>

          <div className="mt-6 text-center">

            <Link
              to="/forgot-password"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-violet-600"
            >
              <ArrowLeft size={16} />

              Change Email
            </Link>

          </div>

        </div>

        <p className="mt-6 text-center text-[11px] text-gray-400">
          Secure access to your PulseBoard workspace
        </p>

      </div>
    </main>
  );
}
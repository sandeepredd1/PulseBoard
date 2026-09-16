import {
  MessageCircle,
  HelpCircle,
  BookOpen,
  Mail,
} from "lucide-react";

import Layout from "../components/Layout";

export default function Support() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Support & Success
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get help and find useful resources for PulseBoard.
          </p>
        </div>

        {/* Welcome */}
        <div className="glass rounded-[24px] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <MessageCircle size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Welcome to Support 👋
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                We're here to help you get the most from PulseBoard.
              </p>
            </div>
          </div>
        </div>

        {/* Support Options */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="glass rounded-[20px] p-5">
            <HelpCircle
              size={22}
              className="text-violet-500"
            />

            <h3 className="mt-4 font-medium text-gray-900 dark:text-white">
              Help Center
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Find answers to common questions.
            </p>

            <button
              type="button"
              className="mt-5 text-xs font-medium text-violet-600"
            >
              View Help
            </button>
          </div>

          <div className="glass rounded-[20px] p-5">
            <BookOpen
              size={22}
              className="text-violet-500"
            />

            <h3 className="mt-4 font-medium text-gray-900 dark:text-white">
              Documentation
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Learn how to use PulseBoard.
            </p>

            <button
              type="button"
              className="mt-5 text-xs font-medium text-violet-600"
            >
              Read Docs
            </button>
          </div>

          <div className="glass rounded-[20px] p-5">
            <Mail
              size={22}
              className="text-violet-500"
            />

            <h3 className="mt-4 font-medium text-gray-900 dark:text-white">
              Contact Support
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Contact our support team.
            </p>

            <button
              type="button"
              className="mt-5 text-xs font-medium text-violet-600"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
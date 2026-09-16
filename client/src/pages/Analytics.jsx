import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import Layout from "../components/Layout";

export default function Analytics() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Project Analytics
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track your project performance, progress and trends.
          </p>
        </div>

        {/* Welcome */}
        <div className="glass rounded-[24px] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <BarChart3 size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Welcome to Project Analytics 👋
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Your project performance overview will appear here.
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="glass rounded-[20px] p-5">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-violet-500" size={20} />
              <span className="text-sm text-gray-500">
                Project Growth
              </span>
            </div>

            <p className="mt-5 text-3xl font-semibold text-gray-900 dark:text-white">
              —
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Data will be connected later
            </p>
          </div>

          <div className="glass rounded-[20px] p-5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-emerald-500" size={20} />
              <span className="text-sm text-gray-500">
                Completion Rate
              </span>
            </div>

            <p className="mt-5 text-3xl font-semibold text-gray-900 dark:text-white">
              —
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Data will be connected later
            </p>
          </div>

          <div className="glass rounded-[20px] p-5">
            <div className="flex items-center gap-3">
              <Clock3 className="text-orange-500" size={20} />
              <span className="text-sm text-gray-500">
                Average Delivery
              </span>
            </div>

            <p className="mt-5 text-3xl font-semibold text-gray-900 dark:text-white">
              —
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Data will be connected later
            </p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="glass rounded-[24px] p-6">
          <h2 className="text-base font-medium text-gray-900 dark:text-white">
            Project Performance
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Performance data will be displayed here.
          </p>

          <div className="mt-6 flex h-64 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/30">
            <p className="text-sm text-gray-400">
              Analytics chart coming soon
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
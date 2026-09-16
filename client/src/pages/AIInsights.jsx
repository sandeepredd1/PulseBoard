import {
  Bot,
  Lightbulb,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import Layout from "../components/Layout";

export default function AIInsights() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            AI Insight Hub
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Explore intelligent insights and recommendations for your projects.
          </p>
        </div>

        {/* AI Welcome */}
        <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 p-6 text-white shadow-xl sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
              <Bot size={28} />
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Welcome to AI Insight Hub 👋
              </h2>

              <p className="mt-1 text-sm text-white/75">
                Get smarter insights about your projects.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
            <p className="text-sm font-medium">
              AI Assistant
            </p>

            <p className="mt-2 text-xs leading-5 text-white/70">
              AI-powered project recommendations will be available here.
            </p>

            <div className="mt-5 flex gap-3">
              <input
                type="text"
                placeholder="Ask something about your projects..."
                className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/50"
              />

              <button
                type="button"
                className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-violet-600 transition hover:bg-white/90"
              >
                Ask
              </button>
            </div>
          </div>
        </div>

        {/* Insight Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="glass rounded-[20px] p-5">
            <Lightbulb
              size={22}
              className="text-yellow-500"
            />

            <h3 className="mt-4 font-medium text-gray-900 dark:text-white">
              Smart Recommendations
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Get recommendations based on your project activity.
            </p>
          </div>

          <div className="glass rounded-[20px] p-5">
            <TrendingUp
              size={22}
              className="text-emerald-500"
            />

            <h3 className="mt-4 font-medium text-gray-900 dark:text-white">
              Performance Insights
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Understand project performance and delivery trends.
            </p>
          </div>

          <div className="glass rounded-[20px] p-5">
            <Sparkles
              size={22}
              className="text-violet-500"
            />

            <h3 className="mt-4 font-medium text-gray-900 dark:text-white">
              AI Analysis
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              AI analysis will be connected to your project data later.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
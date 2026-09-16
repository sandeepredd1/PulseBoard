import {
  Plug,
  Database,
  Globe,
  Zap,
} from "lucide-react";

import Layout from "../components/Layout";

export default function Integrations() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Integrations
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Connect PulseBoard with your external services.
          </p>
        </div>

        {/* Welcome */}
        <div className="glass rounded-[24px] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <Plug size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Welcome to Integrations 👋
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Connect your favorite tools with PulseBoard.
              </p>
            </div>
          </div>
        </div>

        {/* Integration Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="glass rounded-[20px] p-5">
            <Database className="text-violet-500" size={22} />

            <h3 className="mt-4 font-medium text-gray-900 dark:text-white">
              Database
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Manage database integrations.
            </p>

            <button
              type="button"
              className="mt-5 rounded-xl bg-violet-50 px-4 py-2 text-xs font-medium text-violet-600 hover:bg-violet-100"
            >
              Configure
            </button>
          </div>

          <div className="glass rounded-[20px] p-5">
            <Globe className="text-violet-500" size={22} />

            <h3 className="mt-4 font-medium text-gray-900 dark:text-white">
              Web Services
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Connect external web services.
            </p>

            <button
              type="button"
              className="mt-5 rounded-xl bg-violet-50 px-4 py-2 text-xs font-medium text-violet-600 hover:bg-violet-100"
            >
              Configure
            </button>
          </div>

          <div className="glass rounded-[20px] p-5">
            <Zap className="text-violet-500" size={22} />

            <h3 className="mt-4 font-medium text-gray-900 dark:text-white">
              Automation
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Automate your project workflow.
            </p>

            <button
              type="button"
              className="mt-5 rounded-xl bg-violet-50 px-4 py-2 text-xs font-medium text-violet-600 hover:bg-violet-100"
            >
              Configure
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
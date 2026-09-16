import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
} from "lucide-react";

import Layout from "../components/Layout";

export default function Settings() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Settings
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your PulseBoard account and preferences.
          </p>
        </div>

        {/* Welcome */}
        <div className="glass rounded-[24px] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <SettingsIcon size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Welcome to Settings 👋
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage your account preferences from here.
              </p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="glass rounded-[20px] p-5">
            <User
              size={20}
              className="text-violet-500"
            />

            <h3 className="mt-4 font-medium text-gray-900 dark:text-white">
              Account
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Manage your profile and account information.
            </p>
          </div>

          <div className="glass rounded-[20px] p-5">
            <Bell
              size={20}
              className="text-violet-500"
            />

            <h3 className="mt-4 font-medium text-gray-900 dark:text-white">
              Notifications
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Control your notification preferences.
            </p>
          </div>

          <div className="glass rounded-[20px] p-5">
            <Shield
              size={20}
              className="text-violet-500"
            />

            <h3 className="mt-4 font-medium text-gray-900 dark:text-white">
              Security
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Manage your account security settings.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
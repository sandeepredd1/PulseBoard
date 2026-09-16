import {
  Users,
  UserPlus,
  Search,
} from "lucide-react";

import Layout from "../components/Layout";

export default function Customers() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Customers
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage and view your customer information.
            </p>
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
          >
            <UserPlus size={17} />
            Add Customer
          </button>
        </div>

        {/* Welcome */}
        <div className="glass rounded-[24px] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <Users size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Welcome to Customers 👋
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Your customer list will appear here.
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="glass rounded-[20px] p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/60 px-4 py-3">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search customers..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Empty State */}
        <div className="glass rounded-[24px] p-10 text-center">
          <Users
            size={40}
            className="mx-auto text-gray-300"
          />

          <h3 className="mt-4 text-base font-medium text-gray-800 dark:text-white">
            No customers yet
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Customer information will be connected later.
          </p>
        </div>
      </div>
    </Layout>
  );
}
import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      className="
        dashboard-bg
        min-h-screen

        bg-gray-50
        text-gray-900

        transition-colors
        duration-300

        dark:bg-slate-950
        dark:text-white
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-screen
          max-w-[1600px]
        "
      >
        <Sidebar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <div className="min-w-0 flex-1">
          <div className="px-3 sm:px-5 lg:px-6">
            <Topbar
              setMobileOpen={setMobileOpen}
            />

            <main
              className="
                pb-8

                text-gray-900

                dark:text-gray-100
              "
            >
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
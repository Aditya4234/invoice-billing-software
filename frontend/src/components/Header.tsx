"use client";

import { Search, Bell, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 h-20 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-900">
            Dashboard
          </h1>
          <span className="hidden rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 sm:inline-block">
            Admin Panel v2.0
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search invoices, clients..."
              className="w-72 rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Notifications */}
          <button className="relative rounded-xl border border-gray-200 bg-white p-2.5 text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">
            <Bell size={20} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Settings */}
          <button className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">
            <Settings size={20} />
          </button>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-gray-200 sm:block" />

          {/* Profile */}
          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white shadow-sm">
              AU
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@molyweb.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

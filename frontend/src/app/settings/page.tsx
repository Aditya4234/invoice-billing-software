"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Save, User, Bell, Shield, Building2, CreditCard } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 lg:p-8 min-w-0">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account and organization settings</p>
      </motion.div>

      <div className="space-y-6 max-w-2xl">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Building2 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Organization</h2>
              <p className="text-sm text-gray-500">Company name, address, and contact info</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Company Name</label>
              <input type="text" defaultValue="MolyWeb Inc." className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input type="email" defaultValue="admin@molyweb.com" className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <input type="text" defaultValue="123 Business Park, New Delhi, India" className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CreditCard size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Tax & Finance</h2>
              <p className="text-sm text-gray-500">GSTIN, PAN, and financial year settings</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">GSTIN</label>
              <input type="text" defaultValue="27AABCU1234D1Z5" className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">PAN</label>
              <input type="text" defaultValue="ABCDE1234F" className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            <Save size={18} /> {saved ? "Saved!" : "Save Settings"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

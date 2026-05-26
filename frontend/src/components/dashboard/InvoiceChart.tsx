"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import type { MonthlyRevenue } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface InvoiceChartProps {
  data: MonthlyRevenue[];
}

const data = [
  { month: "Jan", invoices: 42, growth: 12 },
  { month: "Feb", invoices: 38, growth: 8 },
  { month: "Mar", invoices: 55, growth: 15 },
  { month: "Apr", invoices: 48, growth: 10 },
  { month: "May", invoices: 62, growth: 18 },
  { month: "Jun", invoices: 58, growth: 14 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg">
      <p className="text-sm font-medium text-gray-900">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: {entry.value}{entry.name === "Growth" ? "%" : ""}
        </p>
      ))}
    </div>
  );
};

export default function InvoiceChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl border border-gray-100 bg-white p-4 lg:p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-900">Invoice Growth</h3>
      <p className="mt-1 text-sm text-gray-500">Monthly invoice volume & growth rate</p>

      <div className="mt-4 lg:mt-6 h-[200px] lg:h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="invoices"
              fill="url(#barGradient)"
              radius={[4, 4, 0, 0]}
              name="Invoices"
              animationBegin={300}
              animationDuration={800}
            />
            <Bar
              dataKey="growth"
              fill="#fbbf24"
              radius={[4, 4, 0, 0]}
              name="Growth"
              animationBegin={500}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

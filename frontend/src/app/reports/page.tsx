"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3, TrendingUp, TrendingDown, DollarSign, Users, FileText,
  Download, Calendar, CreditCard, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { getRevenueReport, getInvoiceStats, getClientStats, getApiData } from "@/lib/api";
import { generateReportPDF, downloadPDF } from "@/lib/invoice/pdf";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

const monthlyData = [
  { month: "Jan", revenue: 28500, expenses: 12000, profit: 16500, clients: 45 },
  { month: "Feb", revenue: 32200, expenses: 13500, profit: 18700, clients: 52 },
  { month: "Mar", revenue: 29800, expenses: 11000, profit: 18800, clients: 48 },
  { month: "Apr", revenue: 35600, expenses: 14200, profit: 21400, clients: 58 },
  { month: "May", revenue: 42800, expenses: 15800, profit: 27000, clients: 65 },
  { month: "Jun", revenue: 39500, expenses: 14500, profit: 25000, clients: 61 },
];

const quarterlyData = [
  { quarter: "Q1 2025", revenue: 90500, expenses: 36500, profit: 54000, growth: 12.4 },
  { quarter: "Q2 2025", revenue: 107400, expenses: 42500, profit: 64900, growth: 18.7 },
  { quarter: "Q3 2025", revenue: 117900, expenses: 44500, profit: 73400, growth: 15.2 },
  { quarter: "Q4 2025", revenue: 131200, expenses: 49800, profit: 81400, growth: 21.3 },
];

const yearlyData = [
  { year: "2022", revenue: 285000, expenses: 145000, profit: 140000, growth: 22.5 },
  { year: "2023", revenue: 342000, expenses: 162000, profit: 180000, growth: 28.6 },
  { year: "2024", revenue: 421000, expenses: 185000, profit: 236000, growth: 31.2 },
  { year: "2025", revenue: 521000, expenses: 210000, profit: 311000, growth: 34.8 },
];

const paymentMethodData = [
  { name: "Credit Card", value: 45, color: "#3b82f6" },
  { name: "Bank Transfer", value: 25, color: "#10b981" },
  { name: "PayPal", value: 18, color: "#f59e0b" },
  { name: "Other", value: 12, color: "#8b5cf6" },
];

const revenueSources = [
  { name: "Product Sales", value: 55, color: "#3b82f6" },
  { name: "Services", value: 25, color: "#10b981" },
  { name: "Subscriptions", value: 15, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#8b5cf6" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg">
        <p className="text-sm font-medium text-gray-900 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-xs" style={{ color: p.color }}>
            {p.name}: {p.name.includes("venue") || p.name.includes("ofit") || p.name.includes("penses") ? formatCurrency(p.value) : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const summaryCards = [
  { label: "Total Revenue (YTD)", value: "$521,000", change: "+34.8%", trend: "up", icon: DollarSign, color: "text-blue-600 bg-blue-50" },
  { label: "Net Profit", value: "$311,000", change: "+31.2%", trend: "up", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
  { label: "Total Expenses", value: "$210,000", change: "+13.5%", trend: "up", icon: BarChart3, color: "text-rose-600 bg-rose-50" },
  { label: "Active Clients", value: "573", change: "+18.7%", trend: "up", icon: Users, color: "text-purple-600 bg-purple-50" },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("monthly");
  const [liveSummaryCards, setLiveSummaryCards] = useState(summaryCards);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  useEffect(() => {
    Promise.all([
      getApiData(() => getRevenueReport("yearly").then((r) => r[0]), null),
      getApiData(() => getInvoiceStats(), null),
      getApiData(() => getClientStats(), null),
    ]).then(([yearly, invStats, clientStats]) => {
      if (yearly || invStats || clientStats) {
        const cards = [...summaryCards];
        if (yearly) {
          cards[0] = { ...cards[0], value: formatCurrency(yearly.revenue) };
          cards[1] = { ...cards[1], value: formatCurrency(yearly.profit || yearly.revenue - yearly.expenses) };
          cards[2] = { ...cards[2], value: formatCurrency(yearly.expenses) };
        }
        if (clientStats) {
          cards[3] = { ...cards[3], value: String(clientStats.total || clientStats.active + clientStats.inactive) };
        }
        setLiveSummaryCards(cards);
      }
    });
  }, []);

  const chartData = activeTab === "monthly" ? monthlyData : activeTab === "quarterly" ? quarterlyData : yearlyData;
  const dataKey = activeTab === "monthly" ? "month" : activeTab === "quarterly" ? "quarter" : "year";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 lg:p-8 min-w-0">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-6 lg:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="mt-1 text-sm text-gray-500">Generate and view comprehensive business reports</p>
        </div>
        <button onClick={async () => {
          const data = activeTab === "monthly" ? monthlyData : activeTab === "quarterly" ? quarterlyData : yearlyData;
          const periodLabel = activeTab === "monthly" ? "Monthly" : activeTab === "quarterly" ? "Quarterly" : "Yearly";
          const blob = await generateReportPDF("Business Report", data.map((d: any) => ({
            label: d.month || d.quarter || d.year,
            revenue: d.revenue,
            expenses: d.expenses,
            profit: d.profit,
          })), periodLabel);
          downloadPDF(blob, `report-${activeTab}-${new Date().toISOString().split("T")[0]}.pdf`);
        }} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
          <Download size={18} /> Download Report
        </button>
      </motion.div>

      <div className="grid gap-3 lg:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6 lg:mb-8">
        {liveSummaryCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className={cn("mb-3 flex h-10 w-10 items-center justify-center rounded-lg", card.color)}>
                <card.icon size={20} />
              </div>
              <span className={cn("flex items-center gap-1 text-xs font-medium", card.trend === "up" ? "text-emerald-600" : "text-red-600")}>
                {card.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {card.change}
              </span>
            </div>
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{card.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="mb-6">
        <Tabs
          tabs={[
            { id: "monthly", label: "Monthly" },
            { id: "quarterly", label: "Quarterly" },
            { id: "yearly", label: "Yearly" },
          ]}
          defaultTab="monthly"
          onChange={setActiveTab}
        />
      </div>

      <div className="grid gap-4 lg:gap-6 lg:grid-cols-2 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-gray-100 bg-white p-4 lg:p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Revenue vs Expenses</h3>
          <p className="text-xs text-gray-500 mb-4">Track revenue and expense trends over time</p>
          <div className="h-[220px] lg:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData as any}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey={dataKey} tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#revGrad)" name="Revenue" />
                <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} fill="url(#expGrad)" name="Expenses" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-gray-100 bg-white p-4 lg:p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Profit Analysis</h3>
          <p className="text-xs text-gray-500 mb-4">Monthly profit trend with growth indicators</p>
          <div className="h-[220px] lg:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData as any}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey={dataKey} tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="profit" fill="#10b981" radius={[6, 6, 0, 0]} name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-4 lg:gap-6 lg:grid-cols-2 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-2xl border border-gray-100 bg-white p-4 lg:p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Payment Methods</h3>
          <p className="text-xs text-gray-500 mb-4">Distribution of payment methods used</p>
          <div className="h-[200px] lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={paymentMethodData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                  {paymentMethodData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-gray-100 bg-white p-4 lg:p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Revenue Sources</h3>
          <p className="text-xs text-gray-500 mb-4">Breakdown of revenue by source</p>
          <div className="h-[200px] lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueSources} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                  {revenueSources.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-2xl border border-gray-100 bg-white p-4 lg:p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Growth Rate</h3>
        <p className="text-xs text-gray-500 mb-4">Period-over-period revenue growth</p>
        <div className="h-[220px] lg:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={(activeTab === "monthly" ? monthlyData : activeTab === "quarterly" ? quarterlyData : yearlyData) as any}>
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey={dataKey} tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey={activeTab === "yearly" ? "growth" : "revenue"} stroke="#8b5cf6" strokeWidth={2} fill="url(#growthGrad)" name={activeTab === "yearly" ? "Growth %" : "Revenue"} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl bg-gray-900 px-5 py-3 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </motion.div>
  );
}

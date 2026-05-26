import type { Stat, Invoice, Activity, MonthlyRevenue, PaymentStatus, Notification } from "@/types";

export const stats: Stat[] = [
  { label: "Total Revenue", value: "$284,500", change: "+12.5%", trend: "up", icon: "DollarSign", prefix: "", suffix: "" },
  { label: "Paid Invoices", value: "1,842", change: "+8.2%", trend: "up", icon: "CheckCircle", prefix: "", suffix: "" },
  { label: "Pending Payments", value: "$48,200", change: "-3.1%", trend: "down", icon: "Clock", prefix: "", suffix: "" },
  { label: "Overdue Invoices", value: "$22,300", change: "+2.4%", trend: "down", icon: "AlertTriangle", prefix: "", suffix: "" },
  { label: "Active Clients", value: "573", change: "+18.7%", trend: "up", icon: "Users", prefix: "", suffix: "" },
  { label: "Monthly Profit", value: "$27,000", change: "+15.3%", trend: "up", icon: "TrendingUp", prefix: "", suffix: "" },
];

export const invoices: Invoice[] = [
  { id: "INV-001", clientName: "Acme Corp", email: "billing@acme.com", amount: 12500, dueDate: "2026-05-15", status: "paid", createdAt: "2026-05-01", items: 5 },
  { id: "INV-002", clientName: "TechStart Inc", email: "finance@techstart.io", amount: 8400, dueDate: "2026-05-20", status: "pending", createdAt: "2026-05-03", items: 3 },
  { id: "INV-003", clientName: "GlobalTrade Ltd", email: "ap@globaltrade.com", amount: 22300, dueDate: "2026-05-10", status: "overdue", createdAt: "2026-04-20", items: 8 },
  { id: "INV-004", clientName: "DesignStudio Co", email: "payments@designstudio.co", amount: 5600, dueDate: "2026-05-25", status: "paid", createdAt: "2026-05-05", items: 2 },
  { id: "INV-005", clientName: "CloudBase Systems", email: "billing@cloudbase.io", amount: 18900, dueDate: "2026-05-18", status: "pending", createdAt: "2026-05-06", items: 6 },
  { id: "INV-006", clientName: "NexGen Solutions", email: "accounting@nexgen.com", amount: 3200, dueDate: "2026-05-30", status: "draft", createdAt: "2026-05-08", items: 1 },
  { id: "INV-007", clientName: "Quantum Labs", email: "finance@quantumlab.org", amount: 15750, dueDate: "2026-05-12", status: "paid", createdAt: "2026-04-28", items: 4 },
  { id: "INV-008", clientName: "Apex Digital", email: "invoices@apex.digital", amount: 9800, dueDate: "2026-05-22", status: "overdue", createdAt: "2026-05-02", items: 3 },
  { id: "INV-009", clientName: "Stellar Media", email: "accounts@stellarmedia.com", amount: 14500, dueDate: "2026-06-01", status: "pending", createdAt: "2026-05-09", items: 7 },
  { id: "INV-010", clientName: "Pinnacle Group", email: "finance@pinnacle.com", amount: 6700, dueDate: "2026-05-28", status: "draft", createdAt: "2026-05-10", items: 2 },
  { id: "INV-011", clientName: "Vertex Dynamics", email: "ap@vertexdyn.com", amount: 32000, dueDate: "2026-05-05", status: "paid", createdAt: "2026-04-15", items: 12 },
  { id: "INV-012", clientName: "NorthStar Analytics", email: "billing@northstar.io", amount: 11200, dueDate: "2026-06-05", status: "pending", createdAt: "2026-05-12", items: 4 },
];

export const recentActivity: Activity[] = [
  { id: "1", type: "payment", message: "Payment received from Acme Corp — $12,500", timestamp: new Date(Date.now() - 120000).toISOString(), user: "Stripe" },
  { id: "2", type: "invoice", message: "Invoice INV-005 sent to CloudBase Systems", timestamp: new Date(Date.now() - 900000).toISOString(), user: "System" },
  { id: "3", type: "client", message: "New client registered: DesignStudio Co", timestamp: new Date(Date.now() - 3600000).toISOString(), user: "Admin" },
  { id: "4", type: "failed", message: "Payment failed for GlobalTrade Ltd — $22,300", timestamp: new Date(Date.now() - 7200000).toISOString(), user: "Stripe" },
  { id: "5", type: "payment", message: "Payment received from Quantum Labs — $15,750", timestamp: new Date(Date.now() - 10800000).toISOString(), user: "PayPal" },
  { id: "6", type: "invoice", message: "Invoice INV-007 marked as paid", timestamp: new Date(Date.now() - 18000000).toISOString(), user: "System" },
  { id: "7", type: "client", message: "New client registered: Apex Digital", timestamp: new Date(Date.now() - 21600000).toISOString(), user: "Admin" },
  { id: "8", type: "refund", message: "Refund processed for TechStart Inc — $840", timestamp: new Date(Date.now() - 28800000).toISOString(), user: "Admin" },
];

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: "Jan", revenue: 28500, expenses: 12000, profit: 16500 },
  { month: "Feb", revenue: 32200, expenses: 13500, profit: 18700 },
  { month: "Mar", revenue: 29800, expenses: 11000, profit: 18800 },
  { month: "Apr", revenue: 35600, expenses: 14200, profit: 21400 },
  { month: "May", revenue: 42800, expenses: 15800, profit: 27000 },
  { month: "Jun", revenue: 39500, expenses: 14500, profit: 25000 },
];

export const paymentStatusData: PaymentStatus[] = [
  { label: "Paid", value: 65, color: "#10b981", amount: 184900 },
  { label: "Pending", value: 20, color: "#f59e0b", amount: 57000 },
  { label: "Overdue", value: 10, color: "#ef4444", amount: 32100 },
  { label: "Draft", value: 5, color: "#9ca3af", amount: 9900 },
];

export const notifications: Notification[] = [
  { id: "n1", title: "Payment Received", message: "Acme Corp paid $12,500", type: "success", read: false, timestamp: new Date(Date.now() - 120000).toISOString() },
  { id: "n2", title: "Invoice Overdue", message: "GlobalTrade Ltd invoice is overdue", type: "warning", read: false, timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: "n3", title: "New Client", message: "DesignStudio Co registered", type: "info", read: true, timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: "n4", title: "Payment Failed", message: "TechStart Inc payment declined", type: "error", read: false, timestamp: new Date(Date.now() - 14400000).toISOString() },
];

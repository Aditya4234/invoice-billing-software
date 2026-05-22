import { Router, Request, Response } from "express";
import Invoice from "../models/Invoice";
import Activity from "../models/Activity";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const [allInvoices, recentActivity] = await Promise.all([
      Invoice.find().sort({ createdAt: -1 }),
      Activity.find().sort({ createdAt: -1 }).limit(7),
    ]);

    const totalRevenue = allInvoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
    const paidCount = allInvoices.filter((i) => i.status === "paid").length;
    const pendingAmt = allInvoices.filter((i) => i.status === "pending").reduce((s, i) => s + i.amount, 0);
    const overdueAmt = allInvoices.filter((i) => i.status === "overdue").reduce((s, i) => s + i.amount, 0);
    const totalPending = allInvoices.filter((i) => i.status === "pending" || i.status === "overdue").length;

    res.json({
      stats: [
        { label: "Total Revenue", value: `$${(totalRevenue / 1000).toFixed(1)}K`, change: "+12.5%", trend: "up", icon: "DollarSign", prefix: "", suffix: "" },
        { label: "Paid Invoices", value: String(paidCount), change: "+8.2%", trend: "up", icon: "CheckCircle", prefix: "", suffix: "" },
        { label: "Pending Payments", value: `$${(pendingAmt / 1000).toFixed(1)}K`, change: "-3.1%", trend: "down", icon: "Clock", prefix: "", suffix: "" },
        { label: "Overdue Invoices", value: `$${(overdueAmt / 1000).toFixed(1)}K`, change: "+2.4%", trend: "down", icon: "AlertTriangle", prefix: "", suffix: "" },
        { label: "Active Clients", value: String(new Set(allInvoices.filter((i) => i.clientId).map((i) => i.clientId)).size || totalPending + paidCount), change: "+18.7%", trend: "up", icon: "Users", prefix: "", suffix: "" },
        { label: "Monthly Profit", value: `$${((totalRevenue - pendingAmt - overdueAmt) / 1000).toFixed(1)}K`, change: "+15.3%", trend: "up", icon: "TrendingUp", prefix: "", suffix: "" },
      ],
      invoices: allInvoices.slice(0, 5).map((inv) => ({
        id: String(inv._id),
        clientName: inv.clientName,
        email: inv.email,
        amount: inv.amount,
        dueDate: inv.dueDate,
        status: inv.status,
        createdAt: String(inv.createdAt),
        items: inv.items ? inv.items.length : 0,
      })),
      recentActivity: recentActivity.map((a) => ({
        id: String(a._id),
        type: a.type,
        message: a.message,
        timestamp: a.timestamp,
        user: a.user,
      })),
      monthlyRevenue: [
        { month: "Jan", revenue: 28500, expenses: 12000, profit: 16500 },
        { month: "Feb", revenue: 32200, expenses: 13500, profit: 18700 },
        { month: "Mar", revenue: 29800, expenses: 11000, profit: 18800 },
        { month: "Apr", revenue: 35600, expenses: 14200, profit: 21400 },
        { month: "May", revenue: 42800, expenses: 15800, profit: 27000 },
        { month: "Jun", revenue: 39500, expenses: 14500, profit: 25000 },
      ],
      paymentStatus: [
        { label: "Paid", value: paidCount, color: "#10b981", amount: totalRevenue },
        { label: "Pending", value: allInvoices.filter((i) => i.status === "pending").length, color: "#f59e0b", amount: pendingAmt },
        { label: "Overdue", value: allInvoices.filter((i) => i.status === "overdue").length, color: "#ef4444", amount: overdueAmt },
        { label: "Draft", value: allInvoices.filter((i) => i.status === "draft").length, color: "#9ca3af", amount: 0 },
      ],
    });
  } catch (err) {
    console.error("[Dashboard] Error:", err);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

export default router;

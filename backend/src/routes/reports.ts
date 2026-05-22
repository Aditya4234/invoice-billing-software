import { Router, Request, Response } from "express";
import Invoice from "../models/Invoice";
import Client from "../models/Client";
import Employee from "../models/Employee";
import Payment from "../models/Payment";

const router = Router();

router.get("/revenue", async (req: Request, res: Response) => {
  try {
    const monthlyData = [
      { month: "Jan", revenue: 28500, expenses: 12000 },
      { month: "Feb", revenue: 32200, expenses: 13500 },
      { month: "Mar", revenue: 29800, expenses: 11000 },
      { month: "Apr", revenue: 35600, expenses: 14200 },
      { month: "May", revenue: 42800, expenses: 15800 },
      { month: "Jun", revenue: 39500, expenses: 14500 },
    ];
    const period = (req.query.period as "monthly" | "quarterly" | "yearly") || "monthly";
    if (period === "quarterly") {
      const quarters = ["Q1", "Q2", "Q3", "Q4"];
      res.json(quarters.map((q, i) => ({
        label: q,
        revenue: monthlyData.slice(i * 3, i * 3 + 3).reduce((s, m) => s + m.revenue, 0),
        expenses: monthlyData.slice(i * 3, i * 3 + 3).reduce((s, m) => s + m.expenses, 0),
      })));
      return;
    }
    if (period === "yearly") {
      const totalRev = monthlyData.reduce((s, m) => s + m.revenue, 0);
      const totalExp = monthlyData.reduce((s, m) => s + m.expenses, 0);
      res.json([{ label: "2026", revenue: totalRev, expenses: totalExp }]);
      return;
    }
    res.json(monthlyData.map((m) => ({ label: m.month, revenue: m.revenue, expenses: m.expenses })));
  } catch (err) {
    console.error("[Reports] Revenue error:", err);
    res.status(500).json({ error: "Failed to fetch revenue report" });
  }
});

router.get("/invoices", async (_req: Request, res: Response) => {
  try {
    const invoices = await Invoice.find();
    const total = invoices.length;
    const paid = invoices.filter((i) => i.status === "paid").length;
    const pending = invoices.filter((i) => i.status === "pending").length;
    const overdue = invoices.filter((i) => i.status === "overdue").length;
    const draft = invoices.filter((i) => i.status === "draft").length;
    const totalAmount = invoices.reduce((s, i) => s + i.amount, 0);
    const paidAmount = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
    const pendingAmount = invoices.filter((i) => i.status === "pending" || i.status === "overdue").reduce((s, i) => s + i.amount, 0);
    res.json({ total, paid, pending, overdue, draft, totalAmount, paidAmount, pendingAmount });
  } catch (err) {
    console.error("[Reports] Invoice report error:", err);
    res.status(500).json({ error: "Failed to fetch invoice report" });
  }
});

router.get("/clients", async (_req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    const total = clients.length;
    const active = clients.filter((c) => c.status === "active").length;
    const inactive = clients.filter((c) => c.status === "inactive").length;
    res.json({ total, active, inactive });
  } catch (err) {
    console.error("[Reports] Client report error:", err);
    res.status(500).json({ error: "Failed to fetch client report" });
  }
});

router.get("/employees", async (_req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    const total = employees.length;
    const active = employees.filter((e) => e.status === "active").length;
    const onLeave = employees.filter((e) => e.status === "on-leave").length;
    const inactive = employees.filter((e) => e.status === "inactive").length;
    res.json({ total, active, onLeave, inactive });
  } catch (err) {
    console.error("[Reports] Employee report error:", err);
    res.status(500).json({ error: "Failed to fetch employee report" });
  }
});

router.get("/payments", async (_req: Request, res: Response) => {
  try {
    const all = await Payment.find();
    const totalCollected = all.filter((p) => p.status === "completed").reduce((s, p) => s + p.amount, 0);
    const totalPending = all.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0);
    const totalFailed = all.filter((p) => p.status === "failed").reduce((s, p) => s + p.amount, 0);
    const methodBreakdown = all.reduce<Record<string, number>>((acc, p) => {
      acc[p.method] = (acc[p.method] || 0) + p.amount;
      return acc;
    }, {} as Record<string, number>);
    res.json({ totalCollected, totalPending, totalFailed, total: all.length, methodBreakdown });
  } catch (err) {
    console.error("[Reports] Payment report error:", err);
    res.status(500).json({ error: "Failed to fetch payment report" });
  }
});

export default router;

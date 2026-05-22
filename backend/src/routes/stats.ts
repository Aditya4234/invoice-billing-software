import { Router, Request, Response } from "express";
import Invoice from "../models/Invoice";
import Client from "../models/Client";
import Employee from "../models/Employee";
import Department from "../models/Department";
import Payroll from "../models/Payroll";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json([
    { label: "Total Revenue", value: "$284,500", change: "+12.5%", trend: "up", icon: "DollarSign", prefix: "", suffix: "" },
    { label: "Paid Invoices", value: "1,842", change: "+8.2%", trend: "up", icon: "CheckCircle", prefix: "", suffix: "" },
    { label: "Pending Payments", value: "$48,200", change: "-3.1%", trend: "down", icon: "Clock", prefix: "", suffix: "" },
    { label: "Overdue Invoices", value: "$22,300", change: "+2.4%", trend: "down", icon: "AlertTriangle", prefix: "", suffix: "" },
    { label: "Active Clients", value: "573", change: "+18.7%", trend: "up", icon: "Users", prefix: "", suffix: "" },
    { label: "Monthly Profit", value: "$27,000", change: "+15.3%", trend: "up", icon: "TrendingUp", prefix: "", suffix: "" },
  ]);
});

router.get("/revenue", (_req: Request, res: Response) => {
  res.json([
    { month: "Jan", revenue: 28500, expenses: 12000, profit: 16500 },
    { month: "Feb", revenue: 32200, expenses: 13500, profit: 18700 },
    { month: "Mar", revenue: 29800, expenses: 11000, profit: 18800 },
    { month: "Apr", revenue: 35600, expenses: 14200, profit: 21400 },
    { month: "May", revenue: 42800, expenses: 15800, profit: 27000 },
    { month: "Jun", revenue: 39500, expenses: 14500, profit: 25000 },
  ]);
});

router.get("/payment-status", (_req: Request, res: Response) => {
  res.json([
    { label: "Paid", value: 65, color: "#10b981", amount: 184900 },
    { label: "Pending", value: 20, color: "#f59e0b", amount: 57000 },
    { label: "Overdue", value: 10, color: "#ef4444", amount: 32100 },
    { label: "Draft", value: 5, color: "#9ca3af", amount: 9900 },
  ]);
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
    console.error("[Stats] Invoice stats error:", err);
    res.status(500).json({ error: "Failed to fetch invoice stats" });
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
    console.error("[Stats] Client stats error:", err);
    res.status(500).json({ error: "Failed to fetch client stats" });
  }
});

router.get("/employees", async (_req: Request, res: Response) => {
  try {
    const [employees, departments, payrollRecords] = await Promise.all([
      Employee.find(),
      Department.find(),
      Payroll.find({ month: "May", year: 2026 }),
    ]);
    const total = employees.length;
    const active = employees.filter((e) => e.status === "active").length;
    const onLeave = employees.filter((e) => e.status === "on-leave").length;
    const inactive = employees.filter((e) => e.status === "inactive").length;
    const payrollTotal = payrollRecords.reduce((s, p) => s + p.netSalary, 0);
    res.json({ total, active, onLeave, inactive, payrollTotal, departmentCount: departments.length });
  } catch (err) {
    console.error("[Stats] Employee stats error:", err);
    res.status(500).json({ error: "Failed to fetch employee stats" });
  }
});

export default router;

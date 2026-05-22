import { Router, Request, Response } from "express";
import Invoice from "../models/Invoice";
import Activity from "../models/Activity";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 50));
    const search = req.query.search as string | undefined;
    const status = req.query.status as string | undefined;
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [{ clientName: regex }, { email: regex }];
    }
    const [data, total] = await Promise.all([
      Invoice.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Invoice.countDocuments(filter),
    ]);
    res.json({ data, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("[Invoices] List error:", err);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
});

router.get("/all", async (_req: Request, res: Response) => {
  try {
    const data = await Invoice.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("[Invoices] All error:", err);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
});

router.get("/stats", async (_req: Request, res: Response) => {
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
    console.error("[Invoices] Stats error:", err);
    res.status(500).json({ error: "Failed to fetch invoice stats" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      res.status(404).json({ error: "Invoice not found" });
      return;
    }
    res.json(invoice);
  } catch (err) {
    console.error("[Invoices] Get error:", err);
    res.status(500).json({ error: "Failed to fetch invoice" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { clientId, clientName, email, amount, dueDate, status, items, invoiceDate, notes } = req.body;
    if (!clientName || !email || !amount || !dueDate) {
      res.status(400).json({ error: "Missing required fields: clientName, email, amount, dueDate" });
      return;
    }
    const count = await Invoice.countDocuments();
    const invId = `INV-${String(count + 1).padStart(3, "0")}`;
    const invoice = await Invoice.create({
      _id: invId,
      clientId: clientId || "",
      clientName,
      email,
      amount: parseFloat(amount),
      dueDate,
      status: status || "draft",
      items: items || [],
      invoiceDate: invoiceDate || new Date().toISOString().split("T")[0],
      notes,
    });
    await Activity.create({ type: "invoice", message: `Invoice ${invId} created for ${clientName}`, user: "System" });
    res.status(201).json(invoice);
  } catch (err) {
    console.error("[Invoices] Create error:", err);
    res.status(500).json({ error: "Failed to create invoice" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!invoice) {
      res.status(404).json({ error: "Invoice not found" });
      return;
    }
    res.json(invoice);
  } catch (err) {
    console.error("[Invoices] Update error:", err);
    res.status(500).json({ error: "Failed to update invoice" });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!invoice) {
      res.status(404).json({ error: "Invoice not found" });
      return;
    }
    res.json(invoice);
  } catch (err) {
    console.error("[Invoices] Patch error:", err);
    res.status(500).json({ error: "Failed to update invoice" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await Invoice.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Invoice not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("[Invoices] Delete error:", err);
    res.status(500).json({ error: "Failed to delete invoice" });
  }
});

export default router;

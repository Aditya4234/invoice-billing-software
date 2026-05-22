import { Router, Request, Response } from "express";
import Activity from "../models/Activity";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 20));
    const [data, total] = await Promise.all([
      Activity.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Activity.countDocuments(),
    ]);
    res.json({ data, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("[Activities] List error:", err);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
});

router.get("/all", async (_req: Request, res: Response) => {
  try {
    const data = await Activity.find().sort({ createdAt: -1 }).limit(100);
    res.json(data);
  } catch (err) {
    console.error("[Activities] All error:", err);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
});

export default router;

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import corsMiddleware from "./middleware/cors";
import { errorHandler } from "./middleware/error";

import User from "./models/User";
import authRouter from "./routes/auth";
import { authMiddleware } from "./middleware/auth";
import invoicesRouter from "./routes/invoices";
import clientsRouter from "./routes/clients";
import employeesRouter from "./routes/employees";
import departmentsRouter from "./routes/departments";
import attendanceRouter from "./routes/attendance";
import leaveRouter from "./routes/leave";
import payrollRouter from "./routes/payroll";
import paymentsRouter from "./routes/payments";
import billingRouter from "./routes/billing";
import statsRouter from "./routes/stats";
import activitiesRouter from "./routes/activities";
import dashboardRouter from "./routes/dashboard";
import reportsRouter from "./routes/reports";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(corsMiddleware);
app.use(express.json({ limit: "10mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRouter);

app.use("/api", (req, res, next) => {
  if (req.method === "OPTIONS") return next();
  if (req.path === "/auth" || req.path.startsWith("/auth/") || req.path === "/health") return next();
  authMiddleware(req as any, res, next);
});

app.use("/api/dashboard", dashboardRouter);
app.use("/api/invoices", invoicesRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/departments", departmentsRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/payroll", payrollRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/billing", billingRouter);
app.use("/api/stats", statsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/reports", reportsRouter);

app.use("/api/*", (_req, res) => {
  res.status(404).json({ error: "API route not found" });
});

app.use(errorHandler);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/molyweb";

async function seedAdmin() {
  const existing = await User.findOne({ email: "admin@molyweb.com" });
  if (existing) {
    existing.password = "password123";
    await existing.save();
    console.log("Default admin password updated (admin@molyweb.com / password123)");
  } else {
    await User.create({
      email: "admin@molyweb.com",
      password: "password123",
      name: "Admin",
      role: "admin",
    });
    console.log("Default admin user created (admin@molyweb.com / password123)");
  }
}

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    await seedAdmin();
    app.listen(PORT, () => {
      console.log(`MolyWeb API running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

export default app;

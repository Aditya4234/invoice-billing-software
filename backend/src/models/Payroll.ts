import mongoose, { Schema, Document } from "mongoose";

export interface IPayroll extends Document {
  employeeId: string;
  employeeName: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: "paid" | "pending" | "processing";
  paidDate?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PayrollSchema = new Schema<IPayroll>(
  {
    employeeId: { type: String, required: true },
    employeeName: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    basicSalary: { type: Number, required: true },
    allowances: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    netSalary: { type: Number, required: true },
    status: {
      type: String,
      enum: ["paid", "pending", "processing"],
      default: "pending",
    },
    paidDate: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IPayroll>("Payroll", PayrollSchema);

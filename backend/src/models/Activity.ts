import mongoose, { Schema, Document } from "mongoose";

export interface IActivity extends Document {
  type: "payment" | "invoice" | "client" | "failed" | "refund" | "employee" | "leave" | "payroll";
  message: string;
  timestamp: string;
  user?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    type: {
      type: String,
      enum: ["payment", "invoice", "client", "failed", "refund", "employee", "leave", "payroll"],
      required: true,
    },
    message: { type: String, required: true },
    timestamp: { type: String, default: "Just now" },
    user: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>("Activity", ActivitySchema);

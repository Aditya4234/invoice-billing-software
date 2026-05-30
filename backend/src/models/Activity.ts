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
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret: Record<string, unknown>) {
        ret.id = String(ret._id);
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  }
);

export default mongoose.model<IActivity>("Activity", ActivitySchema);

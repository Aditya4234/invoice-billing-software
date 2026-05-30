import mongoose, { Schema, Document } from "mongoose";

export interface ILeaveRequest extends Document {
  employeeId: string;
  employeeName: string;
  type: "sick" | "casual" | "earned" | "maternity" | "paternity" | "unpaid" | "vacation" | "personal" | "other";
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const LeaveRequestSchema = new Schema<ILeaveRequest>(
  {
    employeeId: { type: String, required: true },
    employeeName: { type: String, required: true },
    type: {
      type: String,
      enum: ["sick", "casual", "earned", "maternity", "paternity", "unpaid", "vacation", "personal", "other"],
      required: true,
    },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    reason: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
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

export default mongoose.model<ILeaveRequest>("LeaveRequest", LeaveRequestSchema);

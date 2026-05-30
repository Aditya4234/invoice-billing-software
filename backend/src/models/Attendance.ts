import mongoose, { Schema, Document } from "mongoose";

export interface IAttendance extends Document {
  employeeId: string;
  employeeName: string;
  date: string;
  status: "present" | "absent" | "half-day" | "leave" | "holiday" | "wfh";
  checkIn: string;
  checkOut: string;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    employeeId: { type: String, required: true },
    employeeName: { type: String, required: true },
    date: { type: String, required: true },
    status: {
      type: String,
      enum: ["present", "absent", "half-day", "leave", "holiday", "wfh"],
      required: true,
    },
    checkIn: { type: String, default: "-" },
    checkOut: { type: String, default: "-" },
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

export default mongoose.model<IAttendance>("Attendance", AttendanceSchema);

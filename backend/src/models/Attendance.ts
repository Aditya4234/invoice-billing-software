import mongoose, { Schema, Document } from "mongoose";

export interface IAttendance extends Document {
  employeeId: string;
  employeeName: string;
  date: string;
  status: "present" | "absent" | "half-day" | "leave" | "holiday";
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
      enum: ["present", "absent", "half-day", "leave", "holiday"],
      required: true,
    },
    checkIn: { type: String, default: "-" },
    checkOut: { type: String, default: "-" },
  },
  { timestamps: true }
);

export default mongoose.model<IAttendance>("Attendance", AttendanceSchema);

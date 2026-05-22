import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "./models/User";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/molyweb";

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const existing = await User.findOne({ email: "admin@molyweb.com" });
  if (existing) {
    console.log("Default admin user already exists");
  } else {
    await User.create({
      email: "admin@molyweb.com",
      password: "password123",
      name: "Admin",
      role: "admin",
    });
    console.log("Default admin user created (admin@molyweb.com / password123)");
  }

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

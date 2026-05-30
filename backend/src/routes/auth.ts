import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User";
import { generateToken, authMiddleware, type AuthRequest } from "../middleware/auth";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      res.status(400).json({ error: "Missing required fields: email, password, name" });
      return;
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      res.status(409).json({ error: "User already exists with this email" });
      return;
    }
    const user = await User.create({ email, password, name });
    const token = generateToken({ id: user._id.toString(), email: user.email, role: user.role });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error("[Auth] Register error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Missing required fields: email, password" });
      return;
    }
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    const isMatch = await user.comparePassword(normalizedPassword);

    if (!isMatch) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    const token = generateToken({ id: user._id.toString(), email: user.email, role: user.role });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error("[Auth] Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/me", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user!.id).select("-password");
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.json({ message: "If that email exists, a reset link has been sent." });
      return;
    }
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await user.save();
    console.log(`[Auth] Password reset token for ${email}: ${token}`);
    res.json({
      message: "If that email exists, a reset link has been sent.",
      ...(process.env.NODE_ENV !== "production" && { resetToken: token }),
    });
  } catch (err) {
    console.error("[Auth] Forgot password error:", err);
    res.status(500).json({ error: "Failed to process request" });
  }
});

router.post("/reset-password", async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      res.status(400).json({ error: "Token and new password are required" });
      return;
    }
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });
    if (!user) {
      res.status(400).json({ error: "Invalid or expired reset token" });
      return;
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ message: "Password reset successful. You can now log in." });
  } catch (err) {
    console.error("[Auth] Reset password error:", err);
    res.status(500).json({ error: "Failed to reset password" });
  }
});

router.post("/change-password", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      res.status(400).json({ error: "Current password and new password are required" });
      return;
    }
    if (newPassword.length < 6) {
      res.status(400).json({ error: "New password must be at least 6 characters" });
      return;
    }
    const user = await User.findById(req.user!.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      res.status(401).json({ error: "Current password is incorrect" });
      return;
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("[Auth] Change password error:", err);
    res.status(500).json({ error: "Failed to change password" });
  }
});

export default router;

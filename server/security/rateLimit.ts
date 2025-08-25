import rateLimit from "express-rate-limit";
import type { Request } from "express";

// Limit combined by IP + email to reduce false positives
export const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,                   // 5 attempts per window
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    const ip = (rateLimit as any).ipKeyGenerator
      ? (rateLimit as any).ipKeyGenerator(req)
      : req.ip; // fallback (may trigger runtime warning on v7)
    const email = (req.body?.email || "").toLowerCase().trim();
    // if no email, just rate-limit by IP
    return email ? `${ip}|${email}` : ip;
  },
  //message: { message: "Too many submissions. Please try again later." },
});
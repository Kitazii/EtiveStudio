import type { RequestHandler } from "express";

/**
 * Reject if a hidden field is filled.
 * We use '_hp' as the honeypot field name.
 */
export const verifyHoneypot: RequestHandler = (req, res, next) => {
  const hp = typeof req.body?._hp === "string" ? req.body._hp.trim() : "";
  if (hp.length > 0) {
    return res.status(400).json({ message: "Bot detected" });
  }
  next();
};
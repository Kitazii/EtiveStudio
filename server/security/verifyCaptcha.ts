import type { RequestHandler } from "express";
// If you're on Node < 18, uncomment next line and install node-fetch
// import fetch from "node-fetch";

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

function ensureEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required environment variable: ${name}`);
  return v;
}

/**
 * Verifies Google reCAPTCHA v2 token server-side.
 * Expects req.body.captchaToken to be present.
 */
export const verifyRecaptcha: RequestHandler = async (req, res, next) => {
  const token = req.body?.captchaToken;
  if (!token) {
    return res.status(400).json({ message: "Missing CAPTCHA token" });
  }

  const secret = ensureEnv("RECAPTCHA_SECRET");

  try {
    const params = new URLSearchParams();
    params.set("secret", secret);
    params.set("response", token);
    // remoteip helps with Google risk signals; requires trust proxy
    params.set("remoteip", req.ip || "");

    const resp = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!resp.ok) {
      return res.status(502).json({ message: "CAPTCHA verification failed" });
    }
    
    const data = (await resp.json()) as {
      success: boolean;
      "error-codes"?: string[];
      hostname?: string;
      challenge_ts?: string;
    };

    if (!data.success) {
      return res.status(400).json({
        message: "CAPTCHA failed",
        errors: data["error-codes"] || [],
      });
    }

    // Optional: enforce your hostname in production
    // if (process.env.NODE_ENV === "production" && data.hostname !== "www.etivestudios.com") {
    //   return res.status(400).json({ message: "Invalid CAPTCHA host" });
    // }

    // Clean up so it never leaks further down:
    delete req.body.captchaToken;

    next();
  } catch (err) {
    next(err);
  }
};
import type { RequestHandler } from "express";
// If you're on Node < 18, uncomment next line and install node-fetch
// import fetch from "node-fetch";

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

function ensureEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required environment variable: ${name}`);
  return v;
}

// ✅ Hosts your reCAPTCHA is allowed to run on (production)
const validHosts = new Set<string>([
  "www.etivestudios.com",
  "etivestudios.com",
  "etive-studio.onrender.com",
  "localhost", // for local dev
]);

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

    // ✅ Enforce your hostname(s) in production
    if (process.env.NODE_ENV === "production") {
      // Google normally returns bare host (no scheme)
      const host = (data.hostname || "").toLowerCase();
      if (!validHosts.has(host)) {
        return res.status(400).json({ message: "Invalid CAPTCHA host" });
      }
    }

    // Clean up so it never leaks further down:
    delete req.body.captchaToken;

    next();
  } catch (err) {
    next(err);
  }
};
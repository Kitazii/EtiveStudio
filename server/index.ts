import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet"; // ✅ import helmet
import compression from "compression";
import { initializeMailer } from './services/mailer';
import { registerRoutes } from "./routes/contactRoutes";
import { setupVite, serveStatic, log } from "./vite";
import prerender from "prerender-node";
import path from "path";
import cors from "cors";

const PROD_ORIGINS = [
  "https://www.etivestudios.com",
  "https://etivestudios.com",
  "https://etive-studio.onrender.com",
];

const DEV_ORIGINS = [
  "http://localhost:5173", // Vite
  "http://localhost:5000", // same-host dev calls (if needed)
];

const ALLOW = (process.env.NODE_ENV === "production")
  ? PROD_ORIGINS
  : [...PROD_ORIGINS, ...DEV_ORIGINS];

const app = express();

// ✅ Enable gzip compression
app.use(compression());

// ✅ security headers go here
app.use(helmet({
  contentSecurityPolicy: false, // disable until you've tuned CSP for React/Vite
  crossOriginResourcePolicy: { policy: "same-site" },
}));

// add since im behind render proxy
app.set("trust proxy", 1);

// Allow-list CORS
app.use(cors({
  origin(origin, cb) {
    // Allow non-browser tools with no Origin (curl/Postman)
    if (!origin) return cb(null, true);

    if (ALLOW.includes(origin)) return cb(null, true);

    console.warn("[CORS] blocked origin:", origin);
    // Don’t throw; just disable CORS for this request
    return cb(null, false);
  },
  methods: ["GET", "POST", "OPTIONS"],
  // Let cors reflect Access-Control-Request-Headers automatically:
  // (remove this to avoid pinning and accidental blocks)
  // allowedHeaders: ["Content-Type", "x-api-key"],
  optionsSuccessStatus: 204,
  credentials: false, // set true only if you use cookies/auth with credentials
}));

// Belt & braces: ensure preflights always get handled fast
app.options("*", cors());

// ✅ request size limits (before routes)
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: false, limit: "50kb" }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {

      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      
      const isSensitive = path.startsWith("/api/contacts");

      if (!isSensitive && capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

const attachedDir = path.resolve(process.cwd(), "attached_assets");

// 2) Single-file guarantee route (only for this PNG)
app.get("/attached_assets/ETIVE_black_red_white_bg.png", (req, res, next) => {
  const filePath = path.join(attachedDir, "ETIVE_black_red_white_bg.png");
  res.sendFile(filePath, (err) => (err ? next(err) : undefined));
});

(async () => {
  // Serve static files from attached_assets directory with caching
  app.use('/attached_assets', express.static('attached_assets', {
    maxAge: '1y', // Cache for 1 year
    etag: false,
    setHeaders: (res, path) => {
      // Set specific caching for different file types
      if (path.endsWith('.webp') || path.endsWith('.jpg') || path.endsWith('.png')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year for images
      } else if (path.endsWith('.mp4')) {
        res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day for videos
      }
    }
  }));

  await initializeMailer(); 
  const server = await registerRoutes(app);

  //Enable prerendring in production (for bots) BEFORE static fallback
  if (app.get("env") !== "development" && process.env.PRERENDER_TOKEN) {
    prerender.set("prerenderToken", process.env.PRERENDER_TOKEN);
    //Force correct scheme & host (optional but recommended for canonical consistency)
    prerender.set("protocol", "https");
    prerender.set("host", "www.etivestudios.com");
    //Don't prerender API & asset routes
    // prerender.blacklist([
    //   '^/api',              // API endpoints
    //   '^/assets',           // Vite build assets (css/js)
    //   '^/attached_assets',  // your images/icons
    //   '^/favicon\\.ico$',
    //   '^/robots\\.txt$',
    //   '^/sitemap\\.xml$'
    // ]);
    app.use(prerender);
  }
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen(
    port,
    "0.0.0.0", () => {
    log(`serving on http://localhost:${port}`);
  });
})();

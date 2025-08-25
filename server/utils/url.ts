import type { Request } from "express";

/** Base URL like https://www.etivestudios.com (honors proxies on Render) */
export function getBaseUrl(req: Request): string {
  const xfProto = (req.headers["x-forwarded-proto"] as string)?.split(",")[0];
  const proto = xfProto || req.protocol || "http";

  const xfHost = (req.headers["x-forwarded-host"] as string)?.split(",")[0];
  const host = xfHost || req.headers.host || "localhost:5000";

  return `${proto}://${host}`;
}

/** Build an absolute URL for any path (e.g. /attached_assets/...) */
export function assetUrl(req: Request, pathname: string): string {
  const rel = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(rel, getBaseUrl(req)).toString();
}
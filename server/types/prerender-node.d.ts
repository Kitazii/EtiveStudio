declare module "prerender-node" {
  import { RequestHandler } from "express";
  interface PrerenderNode {
    set(key: string, value: any): this;
    whitelist(paths: string[]): this;
    blacklist(paths: string[]): this;
    whitelistPattern(pattern: RegExp): this;
    blacklistPattern(pattern: RegExp): this;
    [key: string]: any;
    (): RequestHandler;
  }
  const prerender: PrerenderNode;
  export = prerender;
}
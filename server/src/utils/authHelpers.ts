import type { Request, Response } from "express";

export function requireUser(req: Request, res: Response) {
  if (!req.userId) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return null;
  }
  return req.userId;
}

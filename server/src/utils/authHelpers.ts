import { Request, Response } from "express";

export function requireUser(req: Request, res: Response): string | null {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    return null;
  }
  return req.userId;
}

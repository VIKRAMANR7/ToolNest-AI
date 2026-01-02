import type { Request, Response, NextFunction } from "express";
import { getAuth, clerkClient } from "@clerk/express";

export async function auth(req: Request, res: Response, next: NextFunction) {
  const { userId, sessionId } = getAuth(req);

  if (!userId || !sessionId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const user = await clerkClient.users.getUser(userId);

  const plan = user.publicMetadata?.plan === "premium" ? "premium" : "free";

  const usage = user.privateMetadata?.free_usage;
  req.free_usage = typeof usage === "number" ? usage : 0;

  if (plan === "premium") {
    req.free_usage = 0;
  }

  req.userId = userId;
  req.plan = plan;

  next();
}

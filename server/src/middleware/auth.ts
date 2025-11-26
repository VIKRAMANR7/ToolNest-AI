import { getAuth, clerkClient } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

export async function auth(req: Request, res: Response, next: NextFunction) {
  const { userId, sessionId } = getAuth(req);

  if (!userId || !sessionId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  // Fetch user from Clerk
  const user = await clerkClient.users.getUser(userId);

  // Determine plan using public metadata
  const plan = user.publicMetadata?.plan === "premium" ? "premium" : "free";

  // Free plan usage
  const usage = user.privateMetadata?.free_usage;
  req.free_usage = typeof usage === "number" ? usage : 0;

  // Premium users reset usage
  if (plan === "premium") {
    req.free_usage = 0;
  }

  // Attach to request
  req.userId = userId;
  req.plan = plan;

  next();
}

import "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      plan?: "free" | "premium";
      free_usage?: number;
      auth?: () => Promise<{
        userId?: string;
        has?: (input: { plan: string }) => Promise<boolean>;
      }>;
    }
  }
}

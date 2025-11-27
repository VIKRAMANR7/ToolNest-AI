declare global {
  namespace Express {
    interface Request {
      userId?: string;
      plan?: "free" | "premium";
      free_usage?: number;
      file?: Express.Multer.File;
    }
  }
}

export {};

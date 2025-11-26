import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const allowedTypes: string[] = ["image/jpeg", "image/png", "image/gif", "application/pdf"];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (_req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    const isAllowed = allowedTypes.includes(file.mimetype);

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error("Unsupported file type"));
    }
  },
});

export { upload, allowedTypes };

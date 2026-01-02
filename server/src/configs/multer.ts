import multer from "multer";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (_req, file, callback) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Unsupported file type"));
    }
  },
});

export { upload, ALLOWED_TYPES };

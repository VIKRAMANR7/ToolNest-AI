import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

export async function uploadBase64Image(base64: string, folder: string) {
  return cloudinary.uploader.upload(base64, { folder });
}

export async function uploadFile(path: string, folder: string) {
  return cloudinary.uploader.upload(path, { folder });
}

export function cleanup(path: string) {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}

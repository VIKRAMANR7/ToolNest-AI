import "dotenv/config";

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
  return value;
}

const requiredEnvs = [
  "DATABASE_URL",
  "CLERK_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "GEMINI_API_KEY",
  "CLIENT_URL",
] as const;

export function validateEnv(): void {
  requiredEnvs.forEach(requireEnv);
}

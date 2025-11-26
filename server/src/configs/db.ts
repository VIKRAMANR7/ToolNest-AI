import { neon } from "@neondatabase/serverless";

let sql: ReturnType<typeof neon> | null = null;

/* Initializes the Neon database client. */
export function connectDB() {
  const url = process.env.DATABASE_URL!;

  try {
    sql = neon(url);
    console.log("✅ NeonDB initialized");
    return sql;
  } catch (error) {
    console.error("❌ Failed to initialize NeonDB");
    console.error(error);
    process.exit(1);
  }
}

/* Returns the initialized SQL client. */
export function db() {
  if (!sql) {
    throw new Error("NeonDB is not initialized. Call connectDB() first.");
  }
  return sql;
}

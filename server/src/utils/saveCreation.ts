import { db } from "../configs/db.js";
import type { CreateCreationParams } from "../types/database.js";

export async function saveCreation(params: CreateCreationParams) {
  const sql = db();

  await sql`
    INSERT INTO creations (user_id, prompt, content, type, publish)
    VALUES (${params.userId}, ${params.prompt}, ${params.content}, ${params.type}, ${params.publish ?? false})
  `;
}

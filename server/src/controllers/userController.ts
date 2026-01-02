import type { Request, Response } from "express";

import { asyncHandler } from "../middleware/asyncHandler.js";
import { db } from "../configs/db.js";
import type { Creation } from "../types/database.js";

interface LikesRow {
  id: number;
  likes: string[] | null;
}

export const getUserCreations = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const sql = db();

  const result = await sql`
    SELECT * FROM creations
    WHERE user_id = ${req.userId}
    ORDER BY created_at DESC
  `;

  const creations = result as Creation[];

  return res.json({ success: true, count: creations.length, creations });
});

export const getPublishedCreations = asyncHandler(async (_req: Request, res: Response) => {
  const sql = db();

  const result = await sql`
    SELECT * FROM creations
    WHERE publish = true
    ORDER BY created_at DESC
  `;

  const creations = result as Creation[];

  return res.json({ success: true, count: creations.length, creations });
});

export const toggleLikeCreation = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const creationId = req.params.id;

  if (!creationId) {
    return res.status(400).json({ success: false, message: "Creation ID is required" });
  }

  const sql = db();

  const result = await sql`
    SELECT id, likes
    FROM creations
    WHERE id = ${creationId}
  `;

  const rows = result as LikesRow[];
  const creation = rows.length > 0 ? rows[0] : null;

  if (!creation) {
    return res.status(404).json({ success: false, message: "Creation not found" });
  }

  const userIdStr = req.userId.toString();
  const existingLikes: string[] = creation.likes ?? [];

  const isLiked = !existingLikes.includes(userIdStr);

  const updatedLikes = isLiked
    ? [...existingLikes, userIdStr]
    : existingLikes.filter((uid: string) => uid !== userIdStr);

  const pgArray = `{${updatedLikes.join(",")}}`;

  await sql`
    UPDATE creations
    SET likes = ${pgArray}::text[]
    WHERE id = ${creationId}
  `;

  return res.json({
    success: true,
    isLiked,
    likesCount: updatedLikes.length,
    message: isLiked ? "Creation liked" : "Creation unliked",
  });
});

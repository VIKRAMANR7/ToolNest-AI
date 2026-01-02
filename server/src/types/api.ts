import type { Creation } from "./database.js";

export interface CreationsResponse {
  success: boolean;
  count: number;
  creations: Creation[];
}

export interface LikeResponse {
  success: boolean;
  isLiked: boolean;
  likesCount: number;
  message: string;
}

export interface ContentResponse {
  success: boolean;
  content: string;
}

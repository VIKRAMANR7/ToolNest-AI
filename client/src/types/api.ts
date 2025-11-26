import type { Creation } from "./database";

export interface ContentResponse {
  success: boolean;
  content: string;
  message?: string;
}

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

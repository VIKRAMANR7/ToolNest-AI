import { Creation } from "./database.js";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
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

export interface ContentResponse {
  success: boolean;
  content: string;
}

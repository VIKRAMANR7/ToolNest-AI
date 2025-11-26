export type CreationType = "article" | "blog-title" | "image" | "resume-review";

export interface Creation {
  id: number;
  user_id: string;
  prompt: string;
  content: string;
  type: CreationType;
  publish: boolean;
  likes: string[];
  created_at: Date;
  updated_at: Date;
}

export interface CreateCreationParams {
  userId: string;
  prompt: string;
  content: string;
  type: CreationType;
  publish?: boolean;
}

export interface UsageCheckResult {
  allowed: boolean;
  message?: string;
}

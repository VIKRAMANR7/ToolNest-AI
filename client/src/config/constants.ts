// Routes
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/ai",
  WRITE_ARTICLE: "/ai/write-article",
  BLOG_TITLES: "/ai/blog-titles",
  GENERATE_IMAGES: "/ai/generate-images",
  REMOVE_BACKGROUND: "/ai/remove-background",
  REMOVE_OBJECT: "/ai/remove-object",
  REVIEW_RESUME: "/ai/review-resume",
  COMMUNITY: "/ai/community",
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // AI Routes
  GENERATE_ARTICLE: "/api/ai/generate-article",
  GENERATE_BLOG_TITLE: "/api/ai/generate-blog-title",
  GENERATE_IMAGE: "/api/ai/generate-image",
  REMOVE_BACKGROUND: "/api/ai/remove-image-background",
  REMOVE_OBJECT: "/api/ai/remove-image-object",
  REVIEW_RESUME: "/api/ai/resume-review",

  // User Routes
  USER_CREATIONS: "/api/user/creations",
  PUBLISHED_CREATIONS: "/api/user/creations/published",
  TOGGLE_LIKE: (id: number) => `/api/user/creations/${id}/like`,
} as const;

// App Metadata
export const APP_NAME = "ToolNest AI";
export const APP_DESCRIPTION = "Your all-in-one AI-powered creative toolkit";

// Plans
export const PLANS = {
  FREE: "free",
  PREMIUM: "premium",
} as const;

export type PlanType = (typeof PLANS)[keyof typeof PLANS];

// Usage Limits
export const FREE_USAGE_LIMIT = 10;

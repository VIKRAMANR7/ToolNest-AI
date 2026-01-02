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
};

export const API_ENDPOINTS = {
  GENERATE_ARTICLE: "/api/ai/generate-article",
  GENERATE_BLOG_TITLE: "/api/ai/generate-blog-title",
  GENERATE_IMAGE: "/api/ai/generate-image",
  REMOVE_BACKGROUND: "/api/ai/remove-image-background",
  REMOVE_OBJECT: "/api/ai/remove-image-object",
  REVIEW_RESUME: "/api/ai/resume-review",
  USER_CREATIONS: "/api/user/creations",
  PUBLISHED_CREATIONS: "/api/user/creations/published",
  TOGGLE_LIKE: (id: number) => `/api/user/creations/${id}/like`,
};

export const APP_NAME = "ToolNest AI";
export const APP_DESCRIPTION = "Your all-in-one AI-powered creative toolkit";

export const PLANS = {
  FREE: "free",
  PREMIUM: "premium",
};

export const FREE_USAGE_LIMIT = 10;

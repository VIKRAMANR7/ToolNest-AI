import { clerkClient } from "@clerk/express";

const FREE_LIMIT = 10;
const PREMIUM = "premium";

export function checkUsage(plan?: string, usage?: number) {
  if (plan !== PREMIUM && (usage ?? 0) >= FREE_LIMIT) {
    return {
      allowed: false,
      message: "Free usage limit reached. Upgrade to premium.",
    };
  }

  return { allowed: true };
}

export async function bumpUsage(userId: string, plan?: string, usage?: number) {
  if (plan !== PREMIUM) {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: { free_usage: (usage ?? 0) + 1 },
    });
  }
}

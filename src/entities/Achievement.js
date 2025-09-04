// src/entities/Achievement.js

/**
 * Achievement entity schema with default values and descriptions
 */
export const Achievement = {
  student_phone: "", // Student phone (anonymous identifier) - required
  achievement_type: "", // Type of achievement earned - required
  badge_name: "", // Badge display name - required
  points_earned: 0, // Points earned for this achievement (default 0)
  earned_date: null, // Date achievement was earned (string, e.g., "2025-09-04")
  description: "" // Achievement description (optional)
};



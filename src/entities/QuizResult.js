// src/entities/QuizResult.js

/**
 * QuizResult entity schema with default values and descriptions
 */
export const QuizResult = {
  student_phone: "", // Student phone (anonymous identifier) - required
  score: 0, // Quiz score out of 100 - required
  total_questions: 0, // Total number of questions - required
  correct_answers: 0, // Number of correct answers - required
  time_taken_seconds: 0, // Time taken to complete quiz (optional)
  badge_earned: "", // Badge level achieved: "beginner", "intermediate", "expert", or "hero" (optional)
  language: "en" // Quiz language: "en" or "hi" (default "en")
};



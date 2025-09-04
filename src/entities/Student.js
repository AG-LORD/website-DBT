// src/entities/Student.js

/**
 * Student entity schema with default values and descriptions
 */
export const Student = {
  name: "", // Student full name (required)
  aadhaar_last_4: "", // Last 4 digits of Aadhaar for display (required)
  phone: "", // Student mobile number (required)
  email: "", // Student email address (optional)
  school_id: "", // Reference to school (optional)
  class_grade: "", // Student class/grade (optional)
  dbt_status: "not_checked", // DBT readiness status: "not_checked" (default)
  last_check_date: null, // Last verification date (string, e.g., "2025-09-04")
  has_opted_for_reminders: false // WhatsApp/SMS reminder consent (default: false)
};

export default Student;

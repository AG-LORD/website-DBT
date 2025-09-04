// src/entities/School.js

/**
 * School entity schema with default values and descriptions
 */
export const School = {
  name: "", // School name (required)
  district: "", // District name (required)
  state: "", // State name (required)
  principal_name: "", // Principal name (optional)
  contact_email: "", // School contact email (optional)
  contact_phone: "", // School contact phone (optional)
  total_students: 0, // Total number of students (optional, default 0)
  dbt_ready_count: 0 // Number of DBT ready students (optional, default 0)
};



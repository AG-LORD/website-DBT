// src/entities/Student.js

/**
 * Student entity schema with default values and descriptions
 */
export const Student = {
  name: "",               // Student full name (required)
  aadhaar_last_4: "",     // Last 4 digits of Aadhaar for display (required)
  phone: "",              // Student mobile number (required)
  email: "",              // Student email address (optional)
  school_id: "",          // Reference to school (optional)
  class_grade: "",        // Student class/grade (optional)
  dbt_status: "not_checked", // DBT readiness status: "not_checked" (default)
  last_check_date: null,  // Last verification date (string, e.g., "2025-09-04")
  has_opted_for_reminders: false // WhatsApp/SMS reminder consent (default: false)
};

/**
 * Mock list method to simulate fetching list of students
 * @param {string} order - Optional, sorting instructions (e.g., '-created_date')
 * @returns {Promise<Array>} - Resolves to array of student objects
 */
Student.list = async function(order) {
  // simulate asynchronous fetch delay
  await new Promise(resolve => setTimeout(resolve, 300));
  // Return mock data
  return [
    {
      name: "Alice Smith",
      aadhaar_last_4: "1234",
      phone: "9876543210",
      email: "alice@example.com",
      school_id: "s1",
      class_grade: "10",
      dbt_status: "ready",
      last_check_date: "2025-09-05",
      has_opted_for_reminders: true
    },
    {
      name: "Bob Kumar",
      aadhaar_last_4: "5678",
      phone: "9123456780",
      email: "bob@example.com",
      school_id: "s2",
      class_grade: "11",
      dbt_status: "not_ready",
      last_check_date: "2025-09-01",
      has_opted_for_reminders: false
    }
    // add more mock students as needed
  ];
};

export default Student;

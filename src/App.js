import './App.css';

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Learn from "./pages/Learn";
import SelfCheck from "./pages/SelfCheck";
import Quiz from "./pages/Quiz";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import FindBank from "./pages/FindBank";
import Schemes from "./pages/Schemes";
import Achievements from "./pages/Achievements";
import Chatbot from "./chatbot";  // Import your new Chatbot component

import Layout from "./layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Learn" element={<Learn />} />
          <Route path="/SelfCheck" element={<SelfCheck />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/FindBank" element={<FindBank />} />
          <Route path="/Schemes" element={<Schemes />} />
          <Route path="/Achievements" element={<Achievements />} />
          <Route path="/chatbot" element={<Chatbot />} />  {/* Add route for Chatbot */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

// FacultyHome.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./FacultyNavbar";
import "./FacultyHome.css"; // Import your CSS file

function FacultyHome() {
  const [teacherName, setTeacherName] = useState('');
  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Fetch teacher's name from the backend during login
    axios.get('/api/teacher-profile') // Replace with your actual API endpoint for teacher profile
      .then(response => {
        setTeacherName(response.data.teacherName);
        setBranches(response.data.branches);
        setSemesters(response.data.semesters);
        setSubjects(response.data.subjects);
      })
      .catch(error => {
        console.error('Error fetching teacher profile:', error);
      });
  }, []);

  return (
    <div>
        <Navbar/>
    <div className="faculty-home-container">
      <div className="welcome-section">
        <h1 className="welcome-header">Welcome, {teacherName}!</h1>
        <p className="welcome-text">
          This is your faculty home page. Explore the features and modules available for you.
        </p>
      <div className="associated-data">
        <h2>Your Associated Data:</h2>
        <p><strong>Branches:</strong> {branches.join(", ")}</p>
        <p><strong>Semesters:</strong> {semesters.join(", ")}</p>
        <p><strong>Subjects:</strong> {subjects.join(", ")}</p>
      </div>
      </div>
    </div>
    </div>
  );
}

export default FacultyHome;

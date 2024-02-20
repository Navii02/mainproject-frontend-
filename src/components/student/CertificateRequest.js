// components/StudentCertificateRequestPage.js

import React, { useState } from 'react';
import axios from 'axios';

function StudentCertificateRequestPage() {
  const [registerNumber, setRegisterNumber] = useState('');
  const userEmail = localStorage.getItem('email'); // Get the user's email from localStorage
  console.log('User Email:', userEmail);
  const [reason, setReason] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    try {
      // Validate inputs
      if (!registerNumber || !reason) {
        setErrorMessage('Register number and reason are required.');
        return;
      }

      
      const response = await axios.post('/api/student/submitRequest', {
        registerNumber,
        reason,
        userEmail
      });

      setSuccessMessage(response.data.message);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="certificate-request-form">
      <h2>Certificate Request Form</h2>
      <label>
        Register Number:
        <input type="text" value={registerNumber} onChange={(e) => setRegisterNumber(e.target.value)} />
      </label>
      <label>
        Reason:
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
      </label>
      <button onClick={handleSubmit}>Submit Request</button>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default StudentCertificateRequestPage;

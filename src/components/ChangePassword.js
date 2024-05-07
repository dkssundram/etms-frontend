import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Use useHistory hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/changePassword', {
        email: localStorage.getItem('email'),
        currentPassword,
        newPassword
      });
      setMessage(response.data.message);
      console.log('Password change successful');
      setTimeout(() => {
        navigate('/');
      }, 3000); // Redirect after 3 seconds

    } catch (error) {
      setMessage(error.response.data.message);
      console.error('Password change failed:', error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Change Password Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            className="form-control"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password:</label>
          <input
            type="password"
            id="newPassword"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Change Password</button>
      </form>
      {message && <p className="mt-3 alert alert-success">{message}</p>}
    </div>
  );
}

export default ChangePassword;

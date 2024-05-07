import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook
// import './Login.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useHistory hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      console.log('Password reset email sent');
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Password reset failed:', error.response.data.message);
      setError(error.response.data.message || 'An error occurred while resetting password.');
    }
  };

  return (
    <>
      <div className='body-forgot-password'>
        <div className="container mt-5">
          <div className="card" style={{width:"20rem"}}>
            <h2>Forgot Password</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="button-wrapper">
                <button type="button" className="btn btn-link back-to-login" onClick={() => navigate('/')}>
                  Back to Login
                </button>
                <button type="submit" className="btn btn-primary reset-password-button">Reset Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;

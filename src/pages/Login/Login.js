import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook
import './Login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useHistory hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user } = response.data; // Get passStatus from response data
      localStorage.setItem('token', token);

      console.log(user.passStatus)
      console.log(user)
      localStorage.setItem('email', email); 
      if (user.passStatus === false) {
        console.log('Password change required');
        localStorage.setItem('email', email); 
        navigate('/change-password'); // Redirect to change password page
        // navigate(`/change-password?email=${email}`);

      } else if (user.passStatus === true) {
        console.log('Login successful');
        console.log(token);
        console.log(email);

        if(user.roleId === 1)
         { navigate('/admin');  window.location.reload(); }
        else if(user.roleId === 4) 
         { navigate('/trainer') 
          window.location.reload();}
        else {
         
          navigate('/user');
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      setError(error.response.data.message || 'An error occurred while logging in.');
    }
  };

  return (
    <>
        <div className='body-login'>
            <div className="container mt-5">
                <div className="card" style={{width:"20rem"}}>
                    <h2>Login Page</h2>
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
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="button-wrapper">
                        <button type="button" className="btn btn-link forgot-password" onClick={() => navigate('/forgot-password')}>
        Forgot Password
    </button><button type="submit" className="btn btn-primary login-button">Login</button>
    
</div>



                    </form>
                </div>
            </div>
        </div>
    </>
);

  
}

export default Login;

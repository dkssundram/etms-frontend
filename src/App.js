
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login/Login';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import ChangePassword from './components/ChangePassword';
import ModulePage from './pages/ModulePage/ModulePage';
import TrainerDashboard from './pages/TrainerDashboard/TrainerDashboard';
import AssessmentPage from './pages/AssessmentPage/AssessmentPage';
import ForgotPassword from './pages/ForgotPasswordForm/ForgotPasswordForm';


function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/login', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error.response.data.message);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    };

    fetchData();
}, []);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Login/>} />
        <Route path="/forgot-password" element ={<ForgotPassword />} />
       
        {user &&  ( <Route path="/test/:trainingId" element={<AssessmentPage user={user}/>} />) }
        {user &&  (<Route path="/module/:trainingId" element={<ModulePage user={user}/>} />) }
        {user &&  (<Route  path="/change-password" element={<ChangePassword/>} />) }
        {user && user.roleId === 1 && (
          <Route  path="/admin" element={<AdminDashboard user={user}/>} />
        )}
        {user && user.roleId === 4 && (
          <Route  path="/trainer" element={<TrainerDashboard user={user}/>} />
        )}
        {user && user.roleId === 2 && (
          <Route  path="/user" element={<UserDashboard user={user}/>} />
        )}
        {(user && user.roleId === 3) && (
          <Route  path="/user" element={<UserDashboard user={user}/>} />
        )}
        {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
      </Routes>
    </Router>
  );
}



export default App;

import React, { useEffect, useState } from 'react';
import './AddUser.css'; // Update the CSS file name if needed
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

const user = {
    name: 'John Doe',
    role: 'Instructor'
};

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [roleId, setRoleId] = useState('1');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
          const response = await axios.post(
            'http://localhost:5000/api/user/create',
            { name, email, roleId },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
        //   setMessage(response.data.message);
          setName('');
          setEmail('');
          setRoleId('');
        } catch (error) {
          setMessage(error.response.data.message);
        }
      };



    return (
        <>
            {/* <Navbar user={user} /> */}
            <div className="add-user">
                <h2>Add User</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Role:</label>
                    <select value={roleId} onChange={(e) => setRoleId(e.target.value)}>
                        <option value="1">Admin</option>
                        <option value="2">Employee</option>
                        <option value="3">Intern</option>
                        <option value="4">Instructor</option>
                    </select>
                    <button type="submit">Add User</button>
                </form>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default AddUser;

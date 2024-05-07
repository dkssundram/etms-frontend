import React, { useState, useEffect } from 'react';
import './UserProfilePage.css'; // Update the CSS file name if needed
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios'; // Import axios for making HTTP requests

const UserProfilePage = ({userdetails}) => {
    const [user, setUser] = useState(null); // Initialize user state as null
    // console.log(userdetails);
    // Fetch user data from backend on component mount
    useEffect(() => {
                // Set userId in local storage
        // localStorage.setItem('userId', 3);

        // Make the API request
        const fetchUser = async () => {
            try {
                const userId = userdetails.id;
                const response = await axios.get(`http://localhost:5000/api/user//userbyid?userId=${userId}`);
                setUser(response.data); // Set user state with fetched data
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUser();

    }, []);

    const [isEditing, setIsEditing] = useState(false); // Set initial state to false

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const userId = localStorage.getItem('userId');
            await axios.put(`http://localhost:5000/api/user/update/${userId}`, user);
            console.log('User details saved:', user);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };
    

    return (
        <>
            <div className="user-profile-page">
            <h2>User Profile</h2>
            {user && (
            <div className="user-details">
                <label>Bio:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={user.bio}
                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    />
                ) : (
                    <span>{user.bio}</span>
                )}
                <label>Location:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={user.location}
                        onChange={(e) => setUser({ ...user, location: e.target.value })}
                    />
                ) : (
                    <span>{user.location}</span>
                )}
                <label>Website:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={user.website}
                        onChange={(e) => setUser({ ...user, website: e.target.value })}
                    />
                ) : (
                    <span>{user.website}</span>
                )}
                <label>Department:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={user.department}
                        // onChange={(e) => setUser({ ...user, department: e.target.value })}
                    />
                ) : (
                    <span>{user.department}</span>
                )}
                <label>Mobile:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={user.mobile}
                        onChange={(e) => setUser({ ...user, mobile: e.target.value })}
                    />
                ) : (
                    <span>{user.mobile}</span>
                )}
            </div>
            )}
            {isEditing ? (
                <button onClick={handleSave}>Save</button>
            ) : (
                <button onClick={handleEdit}>Edit</button>
            )}
         </div>
        </>
    );
};

export default UserProfilePage;
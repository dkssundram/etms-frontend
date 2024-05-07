import React, { useState, useEffect } from 'react';
import './BroadCast.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios'; // Import axios for making HTTP requests

const user = {
    name: 'John Doe',
    role: 'Admin'
};

const BroadcastMessagePage = () => {
    const [message, setMessage] = useState('');
    const [broadcasts, setBroadcasts] = useState([]);

    useEffect(() => {
        const fetchBroadcasts = () => {
            axios.get('http://localhost:5000/api/broadcast/')
                .then(response => {
                    // console.log('Broadcasts fetched:', response.data);
                    const sortedBroadcasts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setBroadcasts(sortedBroadcasts);
                })
                .catch(error => {
                    console.error('Error fetching broadcasts:', error);
                });
        };
    
        // Fetch broadcasts initially
        fetchBroadcasts();
    
        // Refresh broadcasts every second
        const interval = setInterval(fetchBroadcasts, 1);
    
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);
    
    

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleBroadcastMessage = () => {
        // Send the message to all users
        axios.post('http://localhost:5000/api/broadcast/', { message })
            .then(response => {
                // console.log('Broadcast successful:', response.data);
                setMessage('');
                // Add the new broadcast message to the list
                setBroadcasts([response.data, ...broadcasts]);
            })
            .catch(error => {
                console.error('Error broadcasting message:', error);
            });
    };

    return (
        <>
            {/* <Navbar user={user} /> */}
            <div className="broadcast-message-page">
                <h2>Broadcast Message</h2>
                <textarea
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Enter your message here..."
                ></textarea>
                <button onClick={handleBroadcastMessage}>Broadcast</button>
                <div className="broadcast-list">
                    <h3>Previous Broadcasts</h3>
                    <ul>
                        {broadcasts.map(broadcast => (
                            <li key={broadcast.id}>
                                <strong>Date:</strong> {new Date(broadcast.createdAt).toLocaleString()}<br />
                                <strong>Message:</strong> {broadcast.message}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default BroadcastMessagePage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook for navigation
import './ViewTrainingList.css'

const ViewTrainingList = () => {
    const [trainingList, setTrainingList] = useState([]);
    const navigate = useNavigate(); // Initialize useHistory

    useEffect(() => {
        fetch('http://localhost:5000/api/training/')
            .then(response => response.json())
            .then(data => setTrainingList(data))
            .catch(error => console.error('Error fetching training list:', error));
    }, []);

    const handleCardClick = (trainingId) => {
        // Navigate to ModulePage with trainingId as a parameter
        navigate(`/module/${trainingId}`);
    };
    

    return (
        <div>
            <h1>Training List</h1>
            <div className="training-list">
                {trainingList.map(training => (
                    <div key={training.id} className="training-card" onClick={() => handleCardClick(training.id)}>
                        <img src={training.trainingImage} alt={training.trainingName} />
                        <h2>{training.trainingName}</h2>
                        <p>{training.trainingDescription}</p>
                        <p>Number of Days Alloted: {training.numberOfDaysAlloted}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewTrainingList;

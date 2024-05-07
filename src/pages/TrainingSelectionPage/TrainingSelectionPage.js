import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrainingSelectionPage.css'; // Import the CSS file

// TrainingSelectionPage component
const TrainingSelectionPage = () => {
    const [trainings, setTrainings] = useState([]);
    const navigate = useNavigate();
    const [selectedTraining, setSelectedTraining] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/api/training')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(error => console.error('Error fetching trainings:', error));
    }, []);

    const handleStartTest = (trainingId) => {
        setShowPopup(true);
    };

    const startTest = () => {
        if (selectedTraining) {
            handleStartTest(selectedTraining);
        } else {
            console.error('No training selected');
        }
    };

    const confirmStartTest = () => {
        setShowPopup(false);
        navigate(`/test/${selectedTraining}`);
    
        // Request full screen mode
        document.documentElement.requestFullscreen()
            .then(() => {
                console.log('Full screen mode activated');
            })
            .catch((error) => {
                console.error('Error entering full screen mode:', error);
            });
    };
    

    return (
        <div className="container">
            <h1>Select a Training</h1>
            <select onChange={(e) => setSelectedTraining(e.target.value)} value={selectedTraining}>
                <option value="">Select a training</option>
                {trainings.map(training => (
                    <option key={training.id} value={training.id}>{training.trainingName}</option>
                ))}
            </select>
            <button disabled={!selectedTraining} onClick={startTest}>Start Test</button>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Confirmation</h2>
                        <p>Are you sure you want to start the test? The screen will go into full-screen mode.</p>
                        <div className="popup-buttons">
                            <button onClick={confirmStartTest}>Yes, Start Test</button>
                            <button onClick={() => setShowPopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainingSelectionPage;

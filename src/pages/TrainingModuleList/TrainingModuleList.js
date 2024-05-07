import React, { useState } from 'react';
import './TrainingModuleList.css'; // Update the CSS file name if needed
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const user = {
    name: 'John Doe',
    role: 'Instructor'
};

const TrainingModuleList = () => {
    const [modules, setModules] = useState([]);
    const [trainingName, setTrainingName] = useState('');
    const [trainingDescription, setTrainingDescription] = useState('');
    const [trainingImage, setTrainingImage] = useState('');
    const [numberOfDaysAlloted, setNumberOfDaysAlloted] = useState('');

    const handleAddModule = async () => {
        const newModule = { trainingName, trainingDescription, trainingImage, numberOfDaysAlloted };
        try {
            const response = await fetch('http://localhost:5000/api/training/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newModule)
            });
            if (response.ok) {
                console.log('Training added successfully');
                // Optionally, you can fetch the updated list of modules after adding a new one
                // This will update the modules state with the new list from the server
                // fetchModules();
            } else {
                console.error('Failed to add module');
            }
        } catch (error) {
            console.error('Error adding module:', error);
        }
        // Clear input fields after adding the module
        setTrainingName('');
        setTrainingDescription('');
        setTrainingImage('');
        setNumberOfDaysAlloted('');
    };

    return (
        <>
            <div className="training-module-page">
                <h2>Training Modules</h2>
                <div className="add-module-form">
                    <label>Training Name:</label>
                    <input
                        type="text"
                        value={trainingName}
                        onChange={(e) => setTrainingName(e.target.value)}
                        required
                    />
                    <label>Training Description:</label>
                    <textarea
                        value={trainingDescription}
                        onChange={(e) => setTrainingDescription(e.target.value)}
                        required
                    />
                    <label>Training Image URL:</label>
                    <input
                        type="text"
                        value={trainingImage}
                        onChange={(e) => setTrainingImage(e.target.value)}
                        required
                    />
                    <label>Number of Days Alloted:</label>
                    <input
                        type="number"
                        value={numberOfDaysAlloted}
                        onChange={(e) => setNumberOfDaysAlloted(e.target.value)}
                        required
                    />
                    <button onClick={handleAddModule}>Add Module</button>
                </div>
            </div>
        </>
    );
};

export default TrainingModuleList;

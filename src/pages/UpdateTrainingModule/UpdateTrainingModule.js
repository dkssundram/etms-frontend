import React, { useState, useEffect } from 'react';
import './UpdateTrainingModule.css'; // Update the CSS file name if needed
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const user = {
    name: 'John Doe',
    role: 'Instructor'
};

const UpdateTrainingModule = () => {
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    const [updatedTrainingName, setUpdatedTrainingName] = useState('');
    const [updatedTrainingDescription, setUpdatedTrainingDescription] = useState('');
    const [updatedTrainingImage, setUpdatedTrainingImage] = useState('');
    const [updatedNumberOfDaysAlloted, setUpdatedNumberOfDaysAlloted] = useState('');

    useEffect(() => {
        // Fetch modules data from backend or API
        // Example:
        fetch('http://localhost:5000/api/training/')
            .then(response => response.json())
            .then(data => setModules(data))
            .catch(error => console.error('Error fetching modules:', error));
    }, []);

    const handleModuleSelection = (moduleId) => {
        const module = modules.find(mod => mod.id === moduleId);
        setSelectedModule(module);
        setUpdatedTrainingName(module.trainingName);
        setUpdatedTrainingDescription(module.trainingDescription);
        setUpdatedTrainingImage(module.trainingImage);
        setUpdatedNumberOfDaysAlloted(module.numberOfDaysAlloted);
    };

    const handleSaveUpdate = () => {
        const updatedModule = {
            id: selectedModule.id,
            trainingName: updatedTrainingName,
            trainingDescription: updatedTrainingDescription,
            trainingImage: updatedTrainingImage,
            numberOfDaysAlloted: updatedNumberOfDaysAlloted
        };
        // Send updated module data to backend for update
        // Example:
        fetch(`http://localhost:5000/api/training/${selectedModule.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedModule)
        })
        .then(response => {
            if (response.ok) {
                console.log('Module updated successfully');
                // Optionally, you can fetch the updated list of modules after updating
                // This will update the modules state with the new list from the server
                // fetchModules();
            } else {
                console.error('Failed to update module');
            }
        })
        .catch(error => console.error('Error updating module:', error));
    };

    return (
        <>
            <div className="update-training-module-page">
                <h2>Update Training Module</h2>
                <div className="module-list">
                    <h3>Module List</h3>
                    <ul>
                        {modules.map(module => (
                            <li key={module.id}>
                                <button onClick={() => handleModuleSelection(module.id)}>Select</button>
                                {module.trainingName}
                            </li>
                        ))}
                    </ul>
                </div>
                {selectedModule && (
                    <div className="update-module-form">
                        <label>Training Name:</label>
                        <input
                            type="text"
                            value={updatedTrainingName}
                            onChange={(e) => setUpdatedTrainingName(e.target.value)}
                            required
                        />
                        <label>Training Description:</label>
                        <textarea
                            value={updatedTrainingDescription}
                            onChange={(e) => setUpdatedTrainingDescription(e.target.value)}
                            required
                        />
                        <label>Training Image URL:</label>
                        <input
                            type="text"
                            value={updatedTrainingImage}
                            onChange={(e) => setUpdatedTrainingImage(e.target.value)}
                            required
                        />
                        <label>Number of Days Alloted:</label>
                        <input
                            type="number"
                            value={updatedNumberOfDaysAlloted}
                            onChange={(e) => setUpdatedNumberOfDaysAlloted(e.target.value)}
                            required
                        />
                        <button onClick={handleSaveUpdate}>Save Update</button>
                    </div>
                )}
            </div>
        </>
    );

};

export default UpdateTrainingModule;

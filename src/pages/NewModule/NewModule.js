import React, { useState, useEffect } from 'react';
import './NewModulePage.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const user = {
    name: 'John Doe',
    role: 'Instructor'
};

const NewModulePage = () => {
    const [trainingOptions, setTrainingOptions] = useState([]);
    const [selectedTraining, setSelectedTraining] = useState('');
    const [moduleContents, setModuleContents] = useState([]);
    const [newContent, setNewContent] = useState('');
    const [newVideoLink, setNewVideoLink] = useState('');
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        // Fetch trainings from backend
        // Replace the placeholder URL with your actual API endpoint
        fetch('http://localhost:5000/api/training/')
            .then(response => response.json())
            .then(data => {
                setTrainings(data);
                setSelectedTraining(data.length > 0 ? data[0].id : ''); // Select the first training by default
            })
            .catch(error => console.error('Error fetching trainings:', error));
    }, []);

    const handleAddContent = () => {
        if (newContent.trim() !== '') {
            setModuleContents([...moduleContents, { content: newContent, videoLink: newVideoLink, trainingId: selectedTraining }]);
            setNewContent('');
            setNewVideoLink('');
        }
    };

    const handleRemoveContent = (index) => {
        const updatedContents = moduleContents.filter((_, i) => i !== index);
        setModuleContents(updatedContents);
    };

    const handleSaveModule = () => {
        fetch('http://localhost:5000/api/modules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(moduleContents),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save Module');
            }
            // Reset form fields
            // setQuestions([]);
        })
        .catch(error => {
            console.error('Error saving Module:', error);
        });
        setSelectedTraining('');
        setModuleContents([]);
        setNewContent('');
        setNewVideoLink('');
    };

    return (
        <>
            <div className="new-module-page">
                <h2>Create New Module</h2>
                <label>Select Training:</label>
                <select
                        value={selectedTraining}
                        onChange={(e) => setSelectedTraining(e.target.value)}
                    >
                        {trainings.map(training => (
                            <option key={training.id} value={training.id}>{training.trainingName}</option>
                        ))}
                    </select>
                <label>Module Contents:</label>
                <ul>
                    {moduleContents.map((content, index) => (
                        <li key={index}>
                            <strong>{content.content}</strong>
                            <span> - </span>
                            <a href={content.videoLink} target="_blank" rel="noopener noreferrer">Video Link</a>
                            <button onClick={() => handleRemoveContent(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <div className="add-content">
                    <input
                        type="text"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="Enter new content"
                    />
                    <input
                        type="text"
                        value={newVideoLink}
                        onChange={(e) => setNewVideoLink(e.target.value)}
                        placeholder="Enter video link"
                    />
                    <button onClick={handleAddContent}>Add Content</button>
                </div>
                <button onClick={handleSaveModule}>Save Module</button>
            </div>
        </>
    );
};

export default NewModulePage;
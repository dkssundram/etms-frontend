import React, { useState } from 'react';
import './AddTrainingModule.css'; 

const AddTrainingModule = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const newModule = { title, description };

        fetch('http://localhost:5000/training-modules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newModule)
        })
        .then(response => {
            if (response.ok) {
                console.log('Training module added successfully!');
                // Redirect or show a success message
            } else {
                console.error('Failed to add training module:', response.statusText);
            }
        })
        .catch(error => console.error('Error adding training module:', error));
    };

    return (
        <div>
            <h1>Add Training Module</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit">Add Training Module</button>
            </form>
        </div>
    );
};

export default AddTrainingModule;

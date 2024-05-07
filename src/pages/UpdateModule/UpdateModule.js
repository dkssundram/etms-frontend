import React, { useState } from 'react';
import './UpdateModule.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const user = {
    name: 'John Doe',
    role: 'Instructor'
};

const UpdateModulePage = () => {
    const [selectedModule, setSelectedModule] = useState('');
    const [moduleName, setModuleName] = useState('');
    const [moduleContents, setModuleContents] = useState([]);
    const [newContent, setNewContent] = useState('');
    const [newVideoLink, setNewVideoLink] = useState('');

    // Sample data for existing modules (replace with actual data from backend)
    const existingModules = [
        { id: 1, name: 'Module 1', contents: ['Content 1', 'Content 2'], videoLinks: ['Link 1', 'Link 2'] },
        { id: 2, name: 'Module 2', contents: ['Content 3', 'Content 4'], videoLinks: ['Link 3', 'Link 4'] }
    ];

    const handleModuleSelect = (moduleId) => {
        const selected = existingModules.find(module => module.id === moduleId);
        if (selected) {
            setSelectedModule(selected);
            setModuleName(selected.name);
            setModuleContents(selected.contents.map((content, index) => ({ content, videoLink: selected.videoLinks[index], isEditing: false })));
        }
    };

    const handleAddContent = () => {
        if (newContent.trim() !== '') {
            setModuleContents([...moduleContents, { content: newContent, videoLink: newVideoLink, isEditing: false }]);
            setNewContent('');
            setNewVideoLink('');
        }
    };

    const handleRemoveContent = (index) => {
        const updatedContents = moduleContents.filter((_, i) => i !== index);
        setModuleContents(updatedContents);
    };

    const handleEditContent = (index) => {
        const updatedContents = [...moduleContents];
        updatedContents[index].isEditing = true;
        setModuleContents(updatedContents);
    };

    const handleSaveContent = (index) => {
        const updatedContents = [...moduleContents];
        updatedContents[index].isEditing = false;
        setModuleContents(updatedContents);
    };

    const handleSaveModule = () => {
        // Save module to backend or perform other actions
        console.log('Module Updated:', { id: selectedModule.id, name: moduleName, contents: moduleContents });
        // Reset form fields
        setSelectedModule('');
        setModuleName('');
        setModuleContents([]);
        setNewContent('');
        setNewVideoLink('');
    };

    return (
        <>
            {/* <Navbar user={user} /> */}
            <div className="update-module-page">
                <h2>Update Module</h2>
                <label>Select Module:</label>
                <select value={selectedModule.id} onChange={(e) => handleModuleSelect(parseInt(e.target.value))}>
                    <option value="">Select Module</option>
                    {existingModules.map(module => (
                        <option key={module.id} value={module.id}>{module.name}</option>
                    ))}
                </select>
                {selectedModule && (
                    <>
                        <label>Module Name:</label>
                        <input
                            type="text"
                            value={moduleName}
                            onChange={(e) => setModuleName(e.target.value)}
                            placeholder="Enter module name"
                        />
                        <label>Module Contents:</label>
                        <ul>
                            {moduleContents.map((content, index) => (
                                <li key={index}>
                                    {content.isEditing ? (
                                        <>
                                            <input
                                                type="text"
                                                value={content.content}
                                                onChange={(e) => {
                                                    const updatedContents = [...moduleContents];
                                                    updatedContents[index].content = e.target.value;
                                                    setModuleContents(updatedContents);
                                                }}
                                            />
                                            <input
                                                type="text"
                                                value={content.videoLink}
                                                onChange={(e) => {
                                                    const updatedContents = [...moduleContents];
                                                    updatedContents[index].videoLink = e.target.value;
                                                    setModuleContents(updatedContents);
                                                }}
                                            />
                                            <button onClick={() => handleSaveContent(index)}>Save</button>
                                        </>
                                    ) : (
                                        <>
                                            <strong>{content.content}</strong>
                                            <span> - </span>
                                            <a href={content.videoLink} target="_blank" rel="noopener noreferrer">Video Link</a>
                                            <button onClick={() => handleRemoveContent(index)}>Remove</button>
                                            <button onClick={() => handleEditContent(index)}>Edit</button>
                                        </>
                                    )}
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
                            <input type="text"
value={newVideoLink}
onChange={(e) => setNewVideoLink(e.target.value)}
placeholder="Enter video link"
/>
<button onClick={handleAddContent}>Add Content</button>
</div>
<button onClick={handleSaveModule}>Save Module</button>
</>
)}
</div>
{/* <Footer /> */}
</>
);
};

export default UpdateModulePage;
                               

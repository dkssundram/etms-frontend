import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './ModulePage.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ModulePage = ({ user }) => {
    const { trainingId } = useParams();
    const [moduleContent, setModuleContent] = useState([]);
    const [videos, setVideos] = useState([]);
    const [selectedContentIndex, setSelectedContentIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [progress, setProgress] = useState(0);
    const fetchModuleData = async (trainingId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/modules/training/${trainingId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch module data');
            }
            const data = await response.json();
            const contents = data.map(item => item.content);
            const videoLinks = data.map(item => item.videoLink);
            setModuleContent(contents);
            setVideos(videoLinks);
        } catch (error) {
            console.error('Error fetching module data:', error);
        }
    };
    const updateProgress = async (trainingId, progress) => {
        try {
            // console.log(user.id);
            // console.log(trainingId);
            const response = await fetch(`http://localhost:5000/api/progress/${user.id}/progress/${trainingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: progress })
            });
            if (!response.ok) {
                throw new Error('Failed to update progress');
            }
            console.log('Progress updated successfully');
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };
    
    useEffect(() => {
        fetchModuleData(trainingId);
    
        // Fetch progress from the database
        const fetchProgress = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/progress/${user.id}/progress/${trainingId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch progress');
                }
                const data = await response.json();
                setProgress(data.status);
                console.log(data.status);
            } catch (error) {
                console.error('Error fetching progress:', error);
            }
        };
    
        fetchProgress();
    }, []);
    
    const handleContentClick = (index) => {
        setSelectedContentIndex(index);
        setIsCompleted(false);
    };

    // const handleMarkAsComplete = () => {
    //     setIsCompleted(true);
    //     const completedContents = moduleContent.filter((content, index) => index < selectedContentIndex + 1);
    //     const completedPercentage = (completedContents.length / moduleContent.length) * 100;
    //     setProgress(completedPercentage);
    
    //     // Update progress in the database
    //     updateProgress(trainingId, completedPercentage);
    // };
    const handleMarkAsComplete = () => {
        setIsCompleted(true);
        const completedContents = moduleContent.filter((content, index) => index < selectedContentIndex + 1);
        const completedPercentage = (completedContents.length / moduleContent.length) * 100;
        const roundedPercentage = completedPercentage; // Round to 2 decimal places
        setProgress(roundedPercentage);
    
        // Update progress in the database
        updateProgress(trainingId, roundedPercentage);
    };
    
    

    const handlePrevious = () => {
        if (selectedContentIndex > 0) {
            setSelectedContentIndex(selectedContentIndex - 1);
            setIsCompleted(false);
        }
    };

    const handleNext = () => {
        if (selectedContentIndex < moduleContent.length - 1) {
            setSelectedContentIndex(selectedContentIndex + 1);
            setIsCompleted(false);
        }
    };

    return (
        <>
            <Navbar user={user} />
            <div className="module-page">
                <div className="module-contents">
                    <h2>Module Contents</h2>
                    <ul>
                        {moduleContent.map((content, index) => (
                            <li
                                key={index}
                                onClick={() => handleContentClick(index)}
                                className={selectedContentIndex === index ? 'active' : ''}
                            >
                                {content}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="video-player">
                    <h2 id="id1">Video or Reading Material</h2>
                    <div className="progress-container" id="id2">
                        <p>Progress: {progress}%</p>
                    </div>
                    {videos[selectedContentIndex] && videos[selectedContentIndex].startsWith('http') ? (
                        <iframe
                            title="Video Player"
                            width="560"
                            height="315"
                            src={videos[selectedContentIndex]}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <p className="video-not-available">Video not available</p>
                    )}
                    <div className="button-container">
                        <button className="left-button" onClick={handlePrevious} disabled={selectedContentIndex === 0}>
                            Previous
                        </button>
                        <button onClick={handleMarkAsComplete}>
                            Mark as Complete
                        </button>
                        <button className="right-button" onClick={handleNext} disabled={selectedContentIndex === moduleContent.length - 1}>
                            Next
                        </button>
                    </div>

                    {isCompleted && <p className="complete-message">Marked as Complete!</p>}

                </div>

            </div>
        </>
    );
};
export default ModulePage;

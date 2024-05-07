import React, { useState, useEffect } from 'react';
import './AssessmentScore.css'; // Import the CSS file

const ScorePage = ({ user }) => {
    const [scoreData, setScoreData] = useState([]);
    const userId = user.id;

    useEffect(() => {
        fetch(`http://localhost:5000/api/assessment/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch score data');
                }
                return response.json();
            })
            .then(data => {
                // Map each score item to a Promise that fetches the training name
                const promises = data.map(score => fetchTrainingName(score.trainingId));
                // Wait for all promises to resolve
                Promise.all(promises)
                    .then(names => {
                        // Update scoreData with training names
                        const updatedScoreData = data.map((score, index) => ({
                            ...score,
                            trainingName: names[index]
                        }));
                        setScoreData(updatedScoreData);
                    });
            })
            .catch(error => {
                console.error('Error fetching score data:', error);
            });
    }, []);

    const fetchTrainingName = async (trainingId) => {
        const response = await fetch(`http://localhost:5000/api/training/${trainingId}`);
        const data = await response.json();
        return data.trainingName; // Assuming 'name' is the property that stores the training name
    };

    return (
       
        <div className="table-container">
            {scoreData.length > 0 ? (
                <div>
                    <h1>Score Page</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Training Name</th>
                                <th>Obtained Score</th>
                                <th>Total Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scoreData.map((score, index) => (
                                <tr key={index}>
                                    <td>{score.trainingName}</td>
                                    <td>{score.obtainedScore}</td>
                                    <td>{score.totalScore}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="empty-score">
                    <p>You have not yet appeared in any test. Please attempt a test first.</p>
                </div>
            )}
        </div>
    );
};

export default ScorePage;

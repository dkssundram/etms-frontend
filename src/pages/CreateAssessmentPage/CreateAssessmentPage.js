import React, { useState, useEffect } from 'react';
import './CreateAssessmentPage.css'; // Update the CSS file name if needed
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const user = {
    name: 'Admin',
    role: 'Admin'
};

const CreateAssessmentPage = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [trainings, setTrainings] = useState([]);
    const [selectedTraining, setSelectedTraining] = useState('');

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

    const handleAddQuestion = () => {
        const question = {
            newques: newQuestion,
            option1: options[0],
            option2: options[1],
            option3: options[2],
            option4: options[3],
            correctAnswer,
            trainingId: selectedTraining
        };
        setQuestions([...questions, question]);
        setNewQuestion('');
        setOptions(['', '', '', '']);
        setCorrectAnswer('');
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = [...options];
        updatedOptions.splice(index, 1);
        setOptions(updatedOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleSaveAssessment = () => {
        // Prepare the data to be sent to the backend
        const assessmentData = questions
        // {
        //     questions: questions,
        // };
        // Make a POST request to your backend API endpoint
        fetch('http://localhost:5000/api/assessment-pages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assessmentData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save assessment');
            }
            // Reset form fields
            setQuestions([]);
        })
        .catch(error => {
            console.error('Error saving assessment:', error);
        });
    };
    

    // const handleSaveAssessment = () => {
    //     // Prepare the data to be sent to the backend
    //     const assessmentData = {
    //         questions: questions,
    //         selectedTraining: selectedTraining,
    //     };
    //     // Make a POST request to your backend API endpoint
    //     fetch('http://localhost:5000/api/assessment-pages', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(assessmentData),
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Failed to save assessment');
    //         }
    //         // Reset form fields
    //         setQuestions([]);
    //         setSelectedTraining('');
    //     })
    //     .catch(error => {
    //         console.error('Error saving assessment:', error);
    //     });
    // };
    

    return (
        <>
            {/* <Navbar user={user} /> */}
            <div className="create-assessment-page">
                <h2>Create Assessment</h2>
                <div className="question-form">
                <label>Training:</label>
                    <select
                        value={selectedTraining}
                        onChange={(e) => setSelectedTraining(e.target.value)}
                    >
                        {trainings.map(training => (
                            <option key={training.id} value={training.id}>{training.trainingName}</option>
                        ))}
                    </select>
                    <label>New Question:</label>
                    <input
                        type="text"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                    />
                    <label>Options:</label>
                    {options.map((option, index) => (
                        <div key={index} className="option">
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                            {/* {index > 1 && (
                                <button onClick={() => handleRemoveOption(index)}>Remove</button>
                            )} */}
                        </div>
                    ))}
                    {/* <button onClick={handleAddOption}>Add Option</button> */}
                    <label>Correct Answer:</label>
                    <select
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                    >
                        <option value="">Select</option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                    
                    <button onClick={handleAddQuestion}>Add Question</button>
                </div>
                <div className="questions-list">
                    {questions.map((question, index) => (
                        <div key={index} className="question">
                            <p>{question.newques}</p>
                            <ul>
                                <li>{question.option1}</li>
                                <li>{question.option2}</li>
                                <li>{question.option3}</li>
                                <li>{question.option4}</li>
                            </ul>
                            <p>Correct Answer: {question.correctAnswer}</p>
                            <p>Training ID: {question.trainingId}</p>
                        </div>
                    ))}
                </div>
                <button onClick={handleSaveAssessment}>Save Assessment</button>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default CreateAssessmentPage;

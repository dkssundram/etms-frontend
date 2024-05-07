import React, { useState, useEffect } from 'react';
import './AssessmentPage.css'; // Update the CSS file name if needed
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';

const AssessmentPage = ({user}) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [marks, setMarks] = useState(null);
    const { trainingId } = useParams();

    useEffect(() => {
        // console.log(trainingId);
        fetch(`http://localhost:5000/api/assessment-pages/${trainingId}`)
            .then(response => {
                if (!response.ok) {
                    
                    throw new Error('Failed to fetch questions');
                }
                return response.json();
            })
            .then(data => {
                // console.log(data);
                if (Array.isArray(data)) {
                    setQuestions(data);
                } else {
                    throw new Error('Fetched data is not an array');
                }
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, []);
    
    

    const handleAnswerChange = (questionId, answer) => {
        setAnswers({...answers, [questionId]: answer});
    };

    const handleSubmit = () => {
        // Check if questions data is available
        if (questions.length === 0) {
            console.error('Questions data not yet fetched');
            return;
        }
    
        // Calculate marks
        let totalMarks = 0;
        questions.forEach((question, index) => {
            if (answers[question.id] === question.correctAnswer) {
                totalMarks += 1;
            }
        });
        setMarks(totalMarks);
    
        // Set submitted flag to true
        setSubmitted(true);
    
        // Send score to API
        fetch('http://localhost:5000/api/assessment/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user.id, // Assuming user.id is the user's ID
                trainingId: trainingId,
                obtainedScore: totalMarks,
                totalScore: questions.length
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save score');
            }
            console.log('Score saved successfully');
        })
        .catch(error => {
            console.error('Error saving score:', error);
        });
    };
    
    

    const resetAssessment = () => {
        setAnswers({});
        setSubmitted(false);
        setMarks(null);
    };

    return (
        <>
            <Navbar user={user} />
            <div className="assessment-page">
                <h2>Assessment</h2>
                {!submitted ? (
                    <>
                        {questions.map((question, index) => (
                            <div key={question.id} className="question">
                                <p>{question.newques}</p>
                                <div className="answers">
                                    {[question.option1, question.option2, question.option3, question.option4].map((option, idx) => (
                                        <label key={idx}>
                                            <input
                                                type="radio"
                                                name={`question_${question.id}`}
                                                value={option}
                                                checked={answers[question.id] === option}
                                                onChange={() => handleAnswerChange(question.id, option)}
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button onClick={handleSubmit}>Submit</button>
                    </>
                ) : (
                    <>
                        <p>Assessment submitted successfully!</p>
                        <p>Your marks: {marks}/{questions.length}</p>
                        <button onClick={resetAssessment}>Take Again</button>
                    </>
                )}
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default AssessmentPage;

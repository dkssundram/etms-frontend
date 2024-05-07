import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UserProfilePage from '../UserProfilePage/UserProfilePage';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TrainingCalendar from '../TrainingCalendar/TrainingCalendar';
import './TrainerDashboard.css';
import NewModulePage from '../NewModule/NewModule';
import CreateAssessmentPage from '../CreateAssessmentPage/CreateAssessmentPage';

const TrainerDashboard = ({ user }) => {
    const [activeButton, setActiveButton] = useState('Schedule');
    const [trainingSchedule, setTrainingSchedule] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const roleId = 3;

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 10);
        const fetchTrainingSchedule = async () => {
            let trainerid = parseInt(user.id);
            // console.log(trainerid)
            try {
                const response = await fetch('http://localhost:5000/api/training-schedule');
                const data = await response.json();
                // Convert ISO strings to Date objects
                let filteredResponse;
                filteredResponse = data.filter(item => item.trainerId === trainerid)
                const formattedData = filteredResponse.map(item => ({
                    ...item,
                    start: new Date(item.start),
                    end: new Date(item.end)
                }));
                setTrainingSchedule(formattedData);
            } catch (error) {
                console.error('Failed to fetch training schedule:', error);
            }
        };

        fetchTrainingSchedule();
    }, []);

    const handleButtonClick = (title) => {
        setActiveButton(title);
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="wrapper">
            <Navbar user={user} />
            <div className="content container-fluid">
                <div className="row">
                    <div className={isCollapsed ? 'col-md-1' : 'col-md-2'}>
                        <nav className={`col-md-2 d-md-block bg-light sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                            <div className="sidebar-sticky">

                                <button className="toggle-button" onClick={toggleSidebar}>
                                    {isCollapsed ? <i className="fas fa-bars"></i> : <i className="fas fa-angle-double-left"></i>}
                                </button>


                                <ul className="nav flex-column">

                                    {isCollapsed ? (
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Schedule' ? 'active' : ''}`} onClick={() => handleButtonClick('Schedule')}>
                                                    <i className="fas fa-calendar-alt sidebar-icon"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Create Assessment' ? 'active' : ''}`} onClick={() => handleButtonClick('Create Assessment')}>
                                                    <i className="fas fa-clipboard-check sidebar-icon"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Profile' ? 'active' : ''}`} onClick={() => handleButtonClick('Profile')}>
                                                    <i className="fas fa-user sidebar-icon"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Add Module' ? 'active' : ''}`} onClick={() => handleButtonClick('Add Module')}>
                                                    <i className="fas fa-book-open sidebar-icon"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    ) : (
                                        <>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Schedule' ? 'active' : ''}`} onClick={() => handleButtonClick('Schedule')}>
                                                    <i className="fas fa-calendar-alt sidebar-icon"></i>
                                                    Schedule
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Create Assessment' ? 'active' : ''}`} onClick={() => handleButtonClick('Create Assessment')}>
                                                    <i className="fas fa-clipboard-check sidebar-icon"></i>
                                                    Create Assessment
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Profile' ? 'active' : ''}`} onClick={() => handleButtonClick('Profile')}>
                                                    <i className="fas fa-user sidebar-icon"></i>
                                                    Profile
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Add Module' ? 'active' : ''}`} onClick={() => handleButtonClick('Add Module')}>
                                                    <i className="fas fa-book-open sidebar-icon"></i>
                                                    Add Module
                                                </a>
                                            </li>
                                        </>
                                    )}

                                </ul>

                            </div>
                        </nav>
                    </div>
                    <div className={isCollapsed ? 'col-md-11' : 'col-md-10'}>
                        <main role="main" className="col-md-12 ml-sm-auto col-lg-12 px-4">
                            {activeButton === "Profile" && <UserProfilePage />}
                            {activeButton === "Add Module" && <NewModulePage />}
                            {/* {activeButton === "Update Module" && <UpdateModulePage/> } */}
                            {activeButton === "Create Assessment" && <CreateAssessmentPage />}
                            {activeButton === "Schedule" && <TrainingCalendar trainings={trainingSchedule} />}
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TrainerDashboard;

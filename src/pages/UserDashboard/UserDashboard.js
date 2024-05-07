import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UserProfilePage from '../UserProfilePage/UserProfilePage';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AssessmentScore from '../AssessmentScore/AssessmentScore';
import ViewTrainingList from '../ViewTrainingList/ViewTrainingList';
import ReportPage from '../ReportPage/ReportPage';
import TrainingScheduleList from '../TrainingScheduleList/TrainingScheduleList';
import TrainingCalendar from '../TrainingCalendar/TrainingCalendar';
import './UserDashboard.css';
import TrainingSelectionPage from '../TrainingSelectionPage/TrainingSelectionPage';

const UserDashboard = ({ user }) => {
    const [activeButton, setActiveButton] = useState('Training Schedule');
    const [trainingSchedule, setTrainingSchedule] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const roleId = 3;

    useEffect(() => {
        fetchTrainingSchedule();
    }, []);

    const fetchTrainingSchedule = async () => {
        let roleid = parseInt(user.roleId);
        try {
            const response = await fetch('http://localhost:5000/api/training-schedule');
            if (!response.ok) {
                throw new Error('Failed to fetch training schedule');
            }
            const data = await response.json();
            let filteredResponse = data.filter(item => item.roleId === roleid);
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
                <div className={isCollapsed ? 'col-md-1 ' : 'col-md-2'}>
                        <nav className={`col-md-2 d-md-block bg-light sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                            <div className="sidebar-sticky">

                                <button className="toggle-button" onClick={toggleSidebar}>
                                    {isCollapsed ? <i className="fas fa-bars"></i> : <i className="fas fa-angle-double-left"></i>}
                                </button>


                                <ul className="nav flex-column">

                                    {isCollapsed ? (
                                        <>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Dashboard' ? 'active' : ''}`} onClick={() => handleButtonClick('Dashboard')}>
                                                    <i className="fas fa-chart-line sidebar-icon"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Schedule' ? 'active' : ''}`} onClick={() => handleButtonClick('Schedule')}>
                                                    <i className="fas fa-calendar-alt sidebar-icon"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Training Schedule' ? 'active' : ''}`} onClick={() => handleButtonClick('Training Schedule')}>
                                                    <i className="fas fa-calendar-check sidebar-icon"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Profile' ? 'active' : ''}`} onClick={() => handleButtonClick('Profile')}>
                                                    <i className="fas fa-user sidebar-icon"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'My Trainings' ? 'active' : ''}`} onClick={() => handleButtonClick('My Trainings')}>
                                                    <i className="fas fa-book-open sidebar-icon"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Give Assessment' ? 'active' : ''}`} onClick={() => handleButtonClick('Give Assessment')}>
                                                    <i className="fas fa-clipboard-check sidebar-icon"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Assessment Score' ? 'active' : ''}`} onClick={() => handleButtonClick('Assessment Score')}>
                                                    <i className="fas fa-poll-h sidebar-icon"></i>
                                                </a>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Dashboard' ? 'active' : ''}`} onClick={() => handleButtonClick('Dashboard')}>
                                                    <i className="fas fa-chart-line sidebar-icon"></i>
                                                    Dashboard
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Schedule' ? 'active' : ''}`} onClick={() => handleButtonClick('Schedule')}>
                                                    <i className="fas fa-calendar-alt sidebar-icon"></i>
                                                    Schedule
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Training Schedule' ? 'active' : ''}`} onClick={() => handleButtonClick('Training Schedule')}>
                                                    <i className="fas fa-calendar-check sidebar-icon"></i>
                                                    Training Schedule
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Profile' ? 'active' : ''}`} onClick={() => handleButtonClick('Profile')}>
                                                    <i className="fas fa-user sidebar-icon"></i>
                                                    Profile
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'My Trainings' ? 'active' : ''}`} onClick={() => handleButtonClick('My Trainings')}>
                                                    <i className="fas fa-book-open sidebar-icon"></i>
                                                    My Trainings
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Give Assessment' ? 'active' : ''}`} onClick={() => handleButtonClick('Give Assessment')}>
                                                    <i className="fas fa-clipboard-check sidebar-icon"></i>
                                                    Give Assessment
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Assessment Score' ? 'active' : ''}`} onClick={() => handleButtonClick('Assessment Score')}>
                                                    <i className="fas fa-poll-h sidebar-icon"></i>
                                                    Assessment Score
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
                            {activeButton === 'Dashboard' && <ReportPage />}
                            {activeButton === 'Profile' && <UserProfilePage userdetails={user} />}
                            {activeButton === 'Training Schedule' && <TrainingScheduleList user={user} />}
                            {activeButton === 'Give Assessment' && <TrainingSelectionPage />}
                            {activeButton === 'Assessment Score' && <AssessmentScore user={user} />}
                            {activeButton === 'My Trainings' && <ViewTrainingList />}
                            {activeButton === 'Schedule' && <TrainingCalendar trainings={trainingSchedule} />}
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserDashboard;

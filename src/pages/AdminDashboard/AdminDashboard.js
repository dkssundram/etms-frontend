import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UserProfilePage from '../UserProfilePage/UserProfilePage';
import ViewUsers from '../ViewUsers/ViewUsers';
import AddUser from '../AddUser/AddUser';
import TrainingModuleList from '../TrainingModuleList/TrainingModuleList';
import BookingPage from '../BookingPage/BookingPage';
import BroadcastMessagePage from '../BroadCast/BroadCast';
import UpdateTraining from '../UpdateTrainingModule/UpdateTrainingModule';
import TrainingCalendar from '../TrainingCalendar/TrainingCalendar';
import './AdminDashboard.css';
const AdminDashboard = ({ user }) => {
    const [trainingSchedule, setTrainingSchedule] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeButton, setActiveButton] = useState('Schedule');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 10);
        const fetchTrainingSchedule = async () => {
            let roleid = parseInt(user.roleId);
            // console.log(roleid)
            try {
                const response = await fetch('http://localhost:5000/api/training-schedule');
                const data = await response.json();
                // let filteredResponse;
                // filteredResponse = data.filter(item => item.roleId===roleid)
                // Convert ISO strings to Date objects
                const formattedData = data.map(item => ({
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
                                        <>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Schedule' ? 'active' : ''}`} onClick={() => handleButtonClick('Schedule')}>
                                                    <i className="fas fa-chart-line sidebar-icon"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Profile' ? 'active' : ''}`} onClick={() => handleButtonClick('Profile')}>
                                                    <i className="fas fa-user sidebar-icon"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'View User' ? 'active' : ''}`} onClick={() => handleButtonClick('View User')}>
                                                    <i className="fas fa-users sidebar-icon"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Add User' ? 'active' : ''}`} onClick={() => handleButtonClick('Add User')}>
                                                    <i className="fas fa-user-plus sidebar-icon"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Add New Training' ? 'active' : ''}`} onClick={() => handleButtonClick('Add New Training')}>
                                                    <i className="fas fa-plus-circle sidebar-icon"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Update Training' ? 'active' : ''}`} onClick={() => handleButtonClick('Update Training')}>
                                                    <i className="fas fa-edit sidebar-icon"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Schedule Training' ? 'active' : ''}`} onClick={() => handleButtonClick('Schedule Training')}>
                                                    <i className="fas fa-calendar-plus sidebar-icon"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Broadcast Message' ? 'active' : ''}`} onClick={() => handleButtonClick('Broadcast Message')}>
                                                    <i className="fas fa-broadcast-tower sidebar-icon"></i>
                                                </a>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Schedule' ? 'active' : ''}`} onClick={() => handleButtonClick('Schedule')}>
                                                    <i className="fas fa-chart-line sidebar-icon"></i>
                                                    Schedule
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Profile' ? 'active' : ''}`} onClick={() => handleButtonClick('Profile')}>
                                                    <i className="fas fa-user sidebar-icon"></i>
                                                    Profile
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'View User' ? 'active' : ''}`} onClick={() => handleButtonClick('View User')}>
                                                    <i className="fas fa-users sidebar-icon"></i>
                                                    View User
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Add User' ? 'active' : ''}`} onClick={() => handleButtonClick('Add User')}>
                                                    <i className="fas fa-user-plus sidebar-icon"></i>
                                                    Add User
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Add New Training' ? 'active' : ''}`} onClick={() => handleButtonClick('Add New Training')}>
                                                    <i className="fas fa-plus-circle sidebar-icon"></i>
                                                    Add New Training
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Update Training' ? 'active' : ''}`} onClick={() => handleButtonClick('Update Training')}>
                                                    <i className="fas fa-edit sidebar-icon"></i>
                                                    Update Training
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Schedule Training' ? 'active' : ''}`} onClick={() => handleButtonClick('Schedule Training')}>
                                                    <i className="fas fa-calendar-plus sidebar-icon"></i>
                                                    Schedule Training
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className={`nav-link ${activeButton === 'Broadcast Message' ? 'active' : ''}`} onClick={() => handleButtonClick('Broadcast Message')}>
                                                    <i className="fas fa-broadcast-tower sidebar-icon"></i>


                                                    Broadcast Message
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
                            {activeButton === "Schedule" && <TrainingCalendar trainings={trainingSchedule} />}
                            {activeButton === 'Profile' && <UserProfilePage userdetails={user} />}
                            {activeButton === 'View User' && <ViewUsers />}
                            {activeButton === 'Add User' && <AddUser />}
                            {activeButton === 'Add New Training' && <TrainingModuleList />}
                            {activeButton === 'Update Training' && <UpdateTraining />}
                            {activeButton === 'Schedule Training' && <BookingPage />}
                            {activeButton === 'Broadcast Message' && <BroadcastMessagePage />}
                            {activeButton === 'Training Schedule' && <TrainingCalendar trainings={trainingSchedule} />}
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminDashboard;

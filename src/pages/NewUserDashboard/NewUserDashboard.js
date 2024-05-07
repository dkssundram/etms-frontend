import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  styles from './NewUserDashboard.module.css'; 
import Navbar from '../../components/Navbar';
import CardButton from '../../components/CardButton';
import Graph from '../../components/Graph';
import Footer from '../../components/Footer';
import ViewUsers from '../ViewUsers/ViewUsers';
import AddUser from '../AddUser/AddUser';
import TrainingModuleList from '../TrainingModuleList/TrainingModuleList';
import BookingPage from '../BookingPage/BookingPage';
import BroadcastMessagePage from '../BroadCast/BroadCast';
import UserProfilePage from '../UserProfilePage/UserProfilePage';
import { act } from '@testing-library/react';
import UpdateTraining from '../UpdateTrainingModule/UpdateTrainingModule';
import ModulePage from '../ModulePage/ModulePage';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import AssessmentPage from '../AssessmentPage/AssessmentPage';
import AssessmentScore from '../AssessmentScore/AssessmentScore'
import ViewTrainingList from '../ViewTrainingList/ViewTrainingList';
import ReportPage from '../ReportPage/ReportPage'
import TrainingScheduleList from '../TrainingScheduleList/TrainingScheduleList';
import TrainingScheduleGanttChart from '../HorizontalBarChart/HorizontalBarChart';
import TrainingCalendar from '../TrainingCalendar/TrainingCalendar';
import CustomSidebar from '../../components/CustomSidebar';


const NewUserDashboard = ({user}) => {
    const [activeButton, setActiveButton] = useState('Dashboard');
    const [trainingSchedule, setTrainingSchedule] = useState([]);
    const roleId = 3; //for
    // useEffect(() => {
    //     fetchTrainingSchedule();
    // }, []);

    // const fetchTrainingSchedule = async () => {
    //     let roleid = parseInt(user.roleId);
    //     try {
    //         const response = await fetch('http://localhost:5000/api/training-schedule');
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch training schedule');
    //         }
    //         const data = await response.json();
    //         let filteredResponse = data.filter(item => item.roleId === roleid);
    //         const formattedData = filteredResponse.map(item => ({
    //             ...item,
    //             start: new Date(item.start),
    //             end: new Date(item.end)
    //         }));
    //         setTrainingSchedule(formattedData);
    //     } catch (error) {
    //         console.error('Failed to fetch training schedule:', error);
    //         // Handle error (e.g., show a message to the user)
    //     }
    // };

    const handleButtonClick = (title) => {
        setActiveButton(title);
    };

    return (
        
        <div className={styles.admin_dashboard}>
             {/* Use the styles.admin_dashboard class */}
            <Navbar user={user} />
            
            <div className={styles.dashboard_content}> {/* Use the styles.dashboard_content class */}
                <div className={styles.left_panel}> {/* Use the styles.left_panel class */}
                    <CardButton title="Dashboard" onClick={() => handleButtonClick("Dashboard")} />
                    <CardButton title="Schedule" onClick={() => handleButtonClick("Schedule")} />
                    <CardButton title="Training Schedule" onClick={() => handleButtonClick("Training Schedule")} />
                    <CardButton title="Profile" onClick={() => handleButtonClick("Profile")} />
                    <CardButton title="My Trainings" onClick={() => handleButtonClick("My Trainings")} />
                    <CardButton title="Give Assessment" onClick={() => handleButtonClick("Give Assessment")} />
                    <CardButton title="Assessment Score" onClick={() => handleButtonClick("Assessment Score")} />
                </div>
                <div className={styles.right_panel}> {/* Use the styles.right_panel class */}
                    {activeButton === "Dashboard" && <ReportPage />}
                    {activeButton === "Profile" && <UserProfilePage userdetails={user} />}
                    {activeButton === "Training Schedule" && <TrainingScheduleList user={user} />}
                    {activeButton === "Give Assessment" && <AssessmentPage />}
                    {activeButton === "Assessment Score" && <AssessmentScore />}
                    {activeButton === "My Trainings" && <ViewTrainingList />}
                    {activeButton === "Schedule" && <TrainingCalendar trainings={trainingSchedule} />}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NewUserDashboard;

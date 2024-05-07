// UserDashboard.js
import React, {useState,useEffect} from 'react';
import './ReportPage.css'; 
import Navbar from '../../components/Navbar';
import CardButton from '../../components/CardButton';
import Graph from '../../components/Graph';
import Footer from '../../components/Footer';
// import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import moment from 'moment';



// const localizer = momentLocalizer(moment);

// const Calendar = ({ events }) => {
//     return (
//         <div>
//             <BigCalendar
//                 localizer={localizer}
//                 events={events}
//                 startAccessor="start"
//                 endAccessor="end"
//                 style={{ height: 500 }}
//             />
//         </div>
//     );
// };

const ReportPage = ({ user }) => {
    const [trainingSchedule, setTrainingSchedule] = useState([]);
    // useEffect(() => {
        // const fetchTrainingSchedule = async () => {
            // let roleid = parseInt(user.roleId);
            // console.log(roleid)
            // try {
            //     const response = await fetch('http://localhost:5000/api/training-schedule');
            //     const data = await response.json();
            //     let filteredResponse;
            //     filteredResponse = data.filter(item => item.roleId===roleid)
            //     // Convert ISO strings to Date objects
            //     const formattedData = filteredResponse.map(item => ({
            //         ...item,
            //         start: new Date(item.start),
            //         end: new Date(item.end)
            //     }));
            //     setTrainingSchedule(formattedData);
            // } catch (error) {
            //     console.error('Failed to fetch training schedule:', error);
            // }
    //     };
    
    //     fetchTrainingSchedule();
    // }, []);
    

    return (
        <div className="user-dashboard">
            {/* <Navbar user={user} /> */}
            <div className="dashboard-content">
                <div className="left-panel">
                    <div className="search-bar">
                        <input type="text" placeholder="Search Training" />
                    </div>
                    <div className="dashboard-summary">
                        <CardButton title="Courses in Progress" value="5" />
                        <CardButton title="Completed Courses" value="10" />
                        <CardButton title="Upcoming Courses" value="30" />
                        <CardButton title="Learning Time" value="30h" />
                        <CardButton title="No. of Badges" value="3" />
                        {/* <CardButton title="Points" value="500" /> */}
                    </div>
                    <div className="training-cards">
                        <div className="training-card">
                            <img src="https://picsum.photos/200" alt="Training 1" />
                            <p>Training 1</p>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '50%' }}>50%</div>
                            </div>
                        </div>
                        <div className="training-card">
                            <img src="https://picsum.photos/200" alt="Training 2" />
                            <p>Training 2</p>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '75%' }}>75%</div>
                            </div>
                        </div>
                        <div className="training-card">
                            <img src="https://picsum.photos/200" alt="Training 3" />
                            <p>Training 3</p>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '100%' }}>100%</div>
                            </div>
                        </div>
                        {/* <div className="training-card">
                            <img src="https://picsum.photos/200" alt="Training 1" />
                            <p>Training 4</p>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '50%' }}>50%</div>
                            </div>
                        </div>
                        <div className="training-card">
                            <img src="https://picsum.photos/200" alt="Training 2" />
                            <p>Training 5</p>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '75%' }}>75%</div>
                            </div>
                        </div>
                        <div className="training-card">
                            <img src="https://picsum.photos/200" alt="Training 3" />
                            <p>Training 6</p>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '100%' }}>100%</div>
                            </div>
                        </div> */}
                        {/* Add more training cards as needed */}
                    </div>
                </div>
                {/*<div className="right-panel">
                    <div className="calendar">
                        <div className="calendar">
                            <h3>Schedule</h3>
                            <Calendar events={trainingSchedule}/>
                        </div>
                    </div>*/}
                    {/* <div className="graph"> */}
                        {/* Graph component */}
                        {/* <h3>Graph</h3> */}
                        {/* Add graph component here */}
                    {/* </div> */}
                {/* </div> */}
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default ReportPage;

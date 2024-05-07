import React, { useState, useEffect } from 'react';
import './TrainingScheduleList.css';

const TrainingScheduleList = ({ user }) => {
    const [trainingSchedules, setTrainingSchedules] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all'); // Default to show all schedules
    const roleId = user.roleId;

    useEffect(() => {
        fetch(`http://localhost:5000/api/training-schedule/roleId/${roleId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch training schedules');
                }
                return response.json();
            })
            .then(data => setTrainingSchedules(data))
            .catch(error => {
                if (error.message === 'Failed to fetch training schedules') {
                    setTrainingSchedules([]);
                } else {
                    console.error('Error fetching training schedules:', error);
                }
            });
    }, [roleId]);
    

    const getStatus = (startDate, endDate) => {
        const currentDate = new Date();
        const startDateTime = new Date(startDate);
        const endDateTime = new Date(endDate);

        if (currentDate < startDateTime) {
            return "Upcoming";
        } else if (currentDate > endDateTime) {
            return "Completed";
        } else {
            return "Ongoing";
        }
    };

    const handleFilterChange = (filter) => {
        setStatusFilter(filter);
    };

    return (
        <div>
            <h1>Training Schedules</h1>
            <div className="filter-buttons">
                <button className={statusFilter === 'all' ? 'active' : ''} onClick={() => handleFilterChange('all')}>All</button>
                <button className={statusFilter === 'upcoming' ? 'active' : ''} onClick={() => handleFilterChange('upcoming')}>Upcoming</button>
                <button className={statusFilter === 'ongoing' ? 'active' : ''} onClick={() => handleFilterChange('ongoing')}>Ongoing</button>
                <button className={statusFilter === 'completed' ? 'active' : ''} onClick={() => handleFilterChange('completed')}>Completed</button>
            </div>
            {!trainingSchedules || trainingSchedules.length === 0 ? (
                <p>No training schedules found</p>
            ) : (
                <table className="training-schedule-table">
                    <thead>
                        <tr>
                            <th>Training ID</th>
                            <th>Trainer ID</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainingSchedules.map(schedule => {
                            const status = getStatus(schedule.startDate, schedule.endDate);
                            if (statusFilter === 'all' || statusFilter === status.toLowerCase()) {
                                return (
                                    <tr key={schedule.id}>
                                        <td>{schedule.trainingId}</td>
                                        <td>{schedule.trainerId}</td>
                                        <td>{schedule.startDate}</td>
                                        <td>{schedule.endDate}</td>
                                        <td>{schedule.startTime}</td>
                                        <td>{schedule.endTime}</td>
                                        <td>{status}</td>
                                    </tr>
                                );
                            } else {
                                return null; // Don't render if status doesn't match filter
                            }
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TrainingScheduleList;

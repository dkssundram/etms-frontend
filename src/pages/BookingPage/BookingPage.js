import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './BookingPage.css';

const user = {
    name: 'John Doe',
    role: 'Admin'
};

const BookingPage = () => {
    const [roles, setRoles] = useState([]);
    const [training, setTraining] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [formData, setFormData] = useState({
        roleId: '',
        trainingId: '',
        trainerId: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rolesResponse = await fetch('http://localhost:5000/api/roles');
                const rolesData = await rolesResponse.json();
                setRoles(rolesData);

                const trainingResponse = await fetch('http://localhost:5000/api/training');
                const trainingData = await trainingResponse.json();
                setTraining(trainingData);

                const trainersResponse = await fetch('http://localhost:5000/api/user/fetchTrainers');
                const trainersData = await trainersResponse.json();
                setTrainers(trainersData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if roleId is selected
    if (!formData.roleId) {
        alert('Please select a role.');
        return;
    }

    // Convert roleId to integer
    const roleId = parseInt(formData.roleId);

    // Check for conflicts
    const existingSchedulesResponse = await fetch(`http://localhost:5000/api/training-schedule/roleId/${roleId}`);
    // const existingSchedulesData = await existingSchedulesResponse.json();
        const existingSchedulesData = await existingSchedulesResponse.json();
    
        // console.log('Existing Schedules:', existingSchedulesData);
    
        const conflicts = existingSchedulesData.some(schedule => {
            const startDateTime = new Date(formData.startDate + 'T' + formData.startTime);
            const endDateTime = new Date(formData.endDate + 'T' + formData.endTime);
            const scheduleStartDateTime = new Date(schedule.startDate+ 'T' + schedule.startTime);
            const scheduleEndDateTime = new Date(schedule.endDate + 'T' + schedule.endTime);
        
            // console.log('Start DateTime:', startDateTime);
            // console.log('End DateTime:', endDateTime);
            // console.log('Schedule Start DateTime:', scheduleStartDateTime);
            // console.log('Schedule End DateTime:', scheduleEndDateTime);
        
            // Check if the schedules are for the same training and trainer
            // if (schedule.trainingId === formData.trainingId && schedule.trainerId === formData.trainerId) {
                // Check if the new booking's start or end time falls within the existing schedule
                if ((startDateTime >= scheduleStartDateTime && startDateTime < scheduleEndDateTime) ||
                    (endDateTime > scheduleStartDateTime && endDateTime <= scheduleEndDateTime)) {
                    return true;
                }
                // Check if the existing schedule's start or end time falls within the new booking
                if ((scheduleStartDateTime >= startDateTime && scheduleStartDateTime < endDateTime) ||
                    (scheduleEndDateTime > startDateTime && scheduleEndDateTime <= endDateTime)) {
                    return true;
                }
                // Check if the end time of the new schedule falls between the start and end times of any other schedule
                if (endDateTime > scheduleStartDateTime && endDateTime < scheduleEndDateTime) {
                    return true;
                }
                // Check if the start time of the new schedule falls between the start and end times of any other schedule
                if (startDateTime > scheduleStartDateTime && startDateTime < scheduleEndDateTime) {
                    return true;
                }
            return false;
        });
        
    
        if (conflicts) {
            console.log('Booking conflict! Cannot book at this time.');
            alert('Booking conflict! Cannot book at this time.');
            return;
        }
    
        // If no conflicts, proceed with booking
        try {
            const response = await fetch('http://localhost:5000/api/training-schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                console.log('Booking successful!');
                alert('Booking successful!');
                setFormData({
                    roleId: '',
                    trainingId: '',
                    trainerId: '',
                    startDate: '',
                    endDate: '',
                    startTime: '',
                    endTime: ''
                });
            } else {
                console.error('Booking failed. Server responded with:', response.status);
                alert('Booking failed. Please try again.');
            }
        } catch (error) {
            console.error('Error booking calendar:', error);
            alert('Booking failed. Please try again.');
        }
    };
    
    




    return (
        <>
            <div className="container">
                {error && <p className="error-message">{error}</p>}
                <h1>Book Calendar</h1>
                <form onSubmit={handleSubmit}>
                    <label>Role:</label>
                    <select name="roleId" value={formData.roleId} onChange={handleChange}>
                        <option value="" disabled selected>Select a role</option>
                        {roles?.length > 0 ? (roles?.map(role => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))) : (
                            <option value="" disabled>No roles available</option>
                        )}
                    </select>

                    <label>Training:</label>
                    <select name="trainingId" value={formData.trainingId} onChange={handleChange}>
                        <option value="" disabled selected>Select a training</option>
                        {training?.length > 0 ? (training?.map(training => (
                            <option key={training.id} value={training.id}>{training.trainingName}</option>
                        ))) : (
                            <option value="" disabled>No trainings available</option>
                        )}
                    </select>

                    <label>Trainer:</label>
                    <select name="trainerId" value={formData.trainerId} onChange={handleChange}>
                        <option value="" disabled selected>Select a trainer</option>
                        {trainers.length > 0 ? (trainers.map(trainer => (
                            <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
                        ))) : (
                            <option value="" disabled>No trainers available</option>
                        )}
                    </select>

                    <br />
                    <label>Start Date:</label>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                    <br />
                    <label>End Date:</label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                    <br />
                    <label>Start Time:</label>
                    <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
                    <br />
                    <label>End Time:</label>
                    <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
                    <br />
                    <button type="submit">Book Calendar</button>
                </form>
            </div>
        </>
    );
};

export default BookingPage;

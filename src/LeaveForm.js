import React, { useState } from 'react';
import axios from 'axios';
import './LeaveForm.css';

const LeaveForm = () => {
    const [formData, setFormData] = useState({
        employeeId: '',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/leaves', formData); 
            console.log('Leave request submitted:', response.data);
            alert("Your leave request has been submitted successfully")
        } catch (error) {
            console.error('Error submitting leave request:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="employeeId" placeholder="Employee ID" value={formData.employeeId} onChange={handleChange} required />
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
            <textarea name="reason" placeholder="Reason" value={formData.reason} onChange={handleChange} required />
            <button type="submit">Submit Leave Request</button>
        </form>
    );
};

export default LeaveForm;

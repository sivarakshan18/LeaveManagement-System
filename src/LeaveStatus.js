import React, { useState } from 'react';
import axios from 'axios';
import './LeaveStatus.css';

const LeaveStatus = () => {
    const [leaveId, setLeaveId] = useState('');
    const [status, setStatus] = useState('');

    const handleIdChange = (e) => {
        setLeaveId(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:5000/api/leaves/${leaveId}`, { status }); 
            console.log('Leave status updated:', response.data);
        } catch (error) {
            console.error('Error updating leave status:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="leave-status-form">
            <label htmlFor="leaveId">Employee ID:</label>
            <input
                type="text"
                id="leaveId"
                value={leaveId}
                onChange={handleIdChange}
                required
            />
            <label htmlFor="status">Update Leave Status:</label>
            <select id="status" value={status} onChange={handleStatusChange} required>
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
            </select>
            <button type="submit">Update Status</button>
        </form>
    );
};

export default LeaveStatus;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LeaveList.css';

const LeaveList = () => {
    const [leaves, setLeaves] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/leaves');
                setLeaves(response.data);
            } catch (error) {
                console.error('Error fetching leave requests:', error);
                setError('Error fetching leave requests');
            }
        };

        fetchLeaves();
    }, []);

    const handleUpdateStatus = async (leaveId, status) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/leaves/${leaveId}`, { status });
            console.log('Leave status updated:', response.data);

            // Update the UI after successful response
            setLeaves((prevLeaves) =>
                prevLeaves.map((leave) =>
                    leave._id === leaveId ? { ...leave, status: response.data.status } : leave
                )
            );
        } catch (error) {
            console.error('Error updating leave status:', error);
            setError('Error updating leave status');
        }
    };

    return (
        <div className="leave-list">
            <h2>Leave Requests</h2>
            {error && <p className="error">{error}</p>}
            <ul>
                {leaves.map((leave) => (
                    <li key={leave._id}>
                        <span>{leave.employeeId}</span>
                        <span>{new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}</span>
                        <span>{leave.reason}</span>
                        <span className={`status ${leave.status.toLowerCase()}`}>{leave.status}</span>
                        <button onClick={() => handleUpdateStatus(leave._id, 'Approved')}>Approve</button>
                        <button onClick={() => handleUpdateStatus(leave._id, 'Rejected')}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaveList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserRequestPage.css';

const UserRequestPage = () => {
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
    }, []);  // No WebSocket, just fetching data once on mount

    return (
        <div className="user-request-page">
            <h2>Leave Requests</h2>
            {error && <p className="error">{error}</p>}
            <ul>
                {leaves.map((leave) => (
                    <li key={leave._id}>
                        <span>{leave.employeeId}</span>
                        <span>{new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}</span>
                        <span>{leave.reason}</span>
                        <span className={`status ${leave.status.toLowerCase()}`}>{leave.status}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserRequestPage;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import LeaveList from './LeaveList';

import UserRequestPage from './components/UserRequestPage';

import './App.css';

const App = () => {
    return (
        <Router>
            <div className="container">
                <h1>User Management System</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                       
                        <li><Link to="/user-requests">Your Leave Requests</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/leaves" element={<LeaveList />} />
                   
                    <Route path="/user-requests" element={<UserRequestPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

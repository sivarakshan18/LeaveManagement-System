import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LeaveForm from './LeaveForm';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            const { role } = response.data;
            setRole(role);
            setIsLoggedIn(true);
            if (role === 'admin') {
                navigate('/leaves');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            {!isLoggedIn ? (
                <form onSubmit={handleLogin} className="login-form">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <div>
                    <h2>Welcome, {username}!</h2>
                    {role !== 'admin' && <LeaveForm />}
                </div>
            )}
        </div>
    );
};

export default Login;

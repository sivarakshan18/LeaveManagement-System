import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', { username, password, role });
            console.log('User registered successfully');
            navigate('/login');
        } catch (error) {
            console.error('Error registering user:', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleRegister} className="register-form">
            {error && <p className="error">{error}</p>}
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
            <label htmlFor="role">Role:</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;

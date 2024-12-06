import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://reqres.in/api/login', { email, password });
            localStorage.setItem('authToken', response.data.token);
            setMessage('Login successful! Redirecting...');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            const errorMsg = error.response?.data?.error || 'Login failed. Please try again.';
            setMessage(errorMsg);
        }
    };

    return (
        <div className="w-50 mx-auto">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-success">Login</button>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
};

export default Login;

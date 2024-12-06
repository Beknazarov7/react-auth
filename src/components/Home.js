import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        console.log('Token from localStorage:', token);
        if (token) {
            setIsAuthenticated(true);
            fetchUserData(token);
        } else {
            console.warn('No token found. User is not authenticated.');
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get('https://reqres.in/api/users/2', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserData(response.data.data);
            console.log('User data fetched successfully:', response.data.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error.response || error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setUserData(null);
        navigate('/login');
    };

    return (
        <div className="text-center mt-5">
            {isAuthenticated ? (
                userData ? (
                    <div>
                        <h1>Welcome Back!</h1>
                        <p><strong>Name:</strong> {userData.first_name} {userData.last_name}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <img
                            src={userData.avatar}
                            alt="User Avatar"
                            className="rounded-circle"
                            style={{ width: '150px', height: '150px' }}
                        />
                        <button className="btn btn-danger mt-3" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )
            ) : (
                <div>
                    <h1>Welcome to React Auth</h1>
                    <p>
                        <a href="/register" className="btn btn-primary me-2">
                            Register
                        </a>
                        <a href="/login" className="btn btn-success">
                            Login
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Home;

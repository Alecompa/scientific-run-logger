import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Custom CSS file for additional styling


const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/auth/register', { username, password });
            setSuccess("User registered successfully! Please login.");
            setUsername('');
            setPassword('');
            setError(null);

        } catch (error) {
            setError("Failed to register user.");
            setSuccess(null);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="form-container p-4 shadow-sm rounded">
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="form-control" placeholder="New Username" required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" placeholder="New Password" required />
                        </div>
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        {success && <div className="alert alert-success mt-3">{success}</div>}
                        <button type="submit" className="btn btn-primary mt-3 w-100">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
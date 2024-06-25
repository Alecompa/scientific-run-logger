import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RunForm from './components/RunForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
//import RunChart from './RunChart';
import RunTable from './components/RunTable';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [runs, setRuns] = useState([]);
  const [token, setToken] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const fetchRuns = async () => {
      try {
        const response = await axios.get('http://localhost:3000/runs/', {
          headers: { Authorization: token }
        });
        setRuns(response.data);
      } catch (error) {
        console.error('Error fetching runs:', error);
      }
    };

    fetchRuns();
  }, [token]);

  if (!token) {
    return (
      <div className="container mt-4">
        {isRegistering ? (
          <RegisterForm />
        ) : (
          <LoginForm setToken={setToken} />
        )}
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="btn btn-link mt-3"
          //center
          style={{ display: 'block', margin: 'auto' }}
        >
          {isRegistering ? 'Go to Login' : 'Go to Register'}
        </button>
      </div>
    );
  }

  const handleRunSubmit = () => {
    // Re-fetch the runs after a new run is submitted
    const fetchRuns = async () => {
      try {
        const response = await axios.get('http://localhost:3000/runs/', {
          headers: { Authorization: token }
        });
        setRuns(response.data);
      } catch (error) {
        console.error('Error fetching runs:', error);
      }
    };

    fetchRuns();
  };

  return (
    <div className="container mt-4">
      <h1 align="center">Metadata Logger</h1>
      <RunForm token={token} onRunSubmit={handleRunSubmit} />
        <RunTable runs={runs} />
    </div>
  );
};

export default App;
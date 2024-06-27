import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RunForm from './components/RunForm';
import NoteForm from './components/NoteForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
//import RunChart from './RunChart';
import RunTable from './components/RunTable';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [runs, setRuns] = useState([]);
  const [token, setToken] = useState();
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

  const handleNoteSubmit = () => {
    // Re-fetch the runs after a new note is submitted
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
  }
  return (
    <div className="container mt-4">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">LUNA metadata logger</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="row">
        <div className="col-md-6">
          <RunForm token={token} onRunSubmit={handleRunSubmit} />
        </div>
        <div className="col-md-6">
          <NoteForm token={token} onNoteSubmit={handleNoteSubmit} />

        </div>
      </div>
       <div className="row">
          <RunTable runs={runs} />
      </div> 
    </div>
  );
};

export default App;

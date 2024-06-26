import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NoteForm.css'; // Custom CSS file for additional styling

const NoteForm = ({ token, onNoteSubmit }) => {
    const [runNumber, setRunNumber] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchNextRunNumber = async () => {
            try {
                const response = await axios.get('http://localhost:3000/runs/next-run-number', {
                    headers: { Authorization: token }
                });
                setRunNumber(response.data.nextRunNumber);
            } catch (error) {
                console.error('Error fetching next run number:', error);
            }
        };

        fetchNextRunNumber();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(runNumber, notes);
        try {
            await axios.post('http://localhost:3000/runs/add-note/', {
                runNumber: runNumber,
                note: notes
            }, {
                headers: { Authorization: token }
            });

            // Notify parent component about the new submission
            onNoteSubmit();

            setSuccess("Note data submitted successfully!");
            setRunNumber('');
            setError(null);

            const response = await axios.get('http://localhost:3000/runs/next-run-number', {
                headers: { Authorization: token }
            });
            setRunNumber(response.data.nextRunNumber);
        } catch (error) {
            setError("Failed to submit Note data." + error);
            console.error('Failed to submit Note data:', error);
            setSuccess(null);
        }
    };

    const handleNoteFormRunNumberChange = async (e) => {
        const runNumber = e.target.value;
        setRunNumber(runNumber);
        try {
            const response = await axios.get(`http://localhost:3000/runs/get-note/${runNumber}/`, {
                headers: { Authorization: token }
            });
            setNotes(response.data.note);
        } catch (error) {
            console.error('Error fetching note:', error);
            setNotes('');
        }
    }

    return (
        <div className="container mt-4 ">
            <div className="row justify-content-center">
                    <form onSubmit={handleSubmit} className="form-container p-4 shadow-sm rounded">
                        <div className="form-group">
                            <label>Run Number</label>
                            <input type="number" value={runNumber} onChange={handleNoteFormRunNumberChange} className="form-control" placeholder="Run Number" required />
                        </div>
                        <div className="form-group">
                            <label>Notes</label>
                            <textarea rows="3" type="text" value={notes} onChange={e => setNotes(e.target.value)} className="form-control" placeholder="Notes" />
                        </div>
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        {success && <div className="alert alert-success mt-3">{success}</div>}
                        <button type="submit" className="btn btn-primary mt-3 w-100">Add note</button>
                    </form>
            </div>
        </div>
    );
};

export default NoteForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RunForm.css'; // Custom CSS file for additional styling

const RunForm = ({ token, onRunSubmit }) => {
    const [runNumber, setRunNumber] = useState('');
    const [notes, setNotes] = useState('');
    const [startTime, setStartTime] = useState('');
    const [runType, setRunType] = useState('');
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

        const fetchCurrentDatetime = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setStartTime(`${year}-${month}-${day}T${hours}:${minutes}`);
        }

        fetchCurrentDatetime();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/runs/', {
                run_number: runNumber,
                notes: notes,
                start_time: startTime,
                run_type: runType
            }, {
                headers: { Authorization: token }
            });

            // Notify parent component about the new submission
            onRunSubmit();

            setSuccess("Run data submitted successfully!");
            setRunNumber('');
            setNotes('');
            //setStartTime('');
            const fetchCurrentDatetime = () => {
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                setStartTime(`${year}-${month}-${day}T${hours}:${minutes}`);
            }

            fetchCurrentDatetime();
            //setRunType('long_run');
            setError(null);

            const response = await axios.get('http://localhost:3000/runs/next-run-number', {
                headers: { Authorization: token }
            });
            setRunNumber(response.data.nextRunNumber);
        } catch (error) {
            setError("Failed to submit run data.");
            console.error('Failed to submit run data:', error);
            setSuccess(null);
        }
    };

    return (
        <div className="container mt-4 ">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="form-container p-4 shadow-sm rounded">
                        <div className="form-group">
                            <label>Run Number</label>
                            <input type="number" value={runNumber} onChange={e => setRunNumber(e.target.value)} className="form-control" placeholder="Run Number" required />
                        </div>
                        <div className="form-group">
                            <label>Notes</label>
                            <input type="text" value={notes} onChange={e => setNotes(e.target.value)} className="form-control" placeholder="Notes" />
                        </div>
                        <div className="form-group">
                            <label>Start Time</label>
                            <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Run Type</label>
                            <select value={runType} onChange={e => setRunType(e.target.value)} className="form-control">
                                <option value="long_run">Long Run</option>
                                <option value="scan">scan</option>
                                <option value="Type3">Type3</option>
                                <option value="Type4">Type4</option>
                            </select>
                        </div>
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        {success && <div className="alert alert-success mt-3">{success}</div>}
                        <button type="submit" className="btn btn-primary mt-3 w-100">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RunForm;
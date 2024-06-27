import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RunForm.css'; // Custom CSS file for additional styling

const RunForm = ({ token, onRunSubmit }) => {
    const [runNumber, setRunNumber] = useState('');
    const [startTime, setStartTime] = useState('');
    const [stopTime, setStopTime] = useState('');
    const [realTime, setRealTime] = useState('');
    const [runType, setRunType] = useState('');
    const [chargeValue, setChargeValue] = useState('');
    const [scanNumber, setScanNumber] = useState('');
    const [isitTrash, setTrash] = useState('');
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
                start_time: startTime,
                stop_time: stopTime,
                real_time: realTime,
                run_type: runType,
                scan_number: scanNumber,
                charge: chargeValue,
                isit_trash: isitTrash,
                notes: notes
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
            };

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
    const handleDateClick_start = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        setStartTime(`${year}-${month}-${day}T${hours}:${minutes}`);
    };
    const handleDateClick_stop = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        setStopTime(`${year}-${month}-${day}T${hours}:${minutes}`);
    };

    return (
        <div className="container mt-4 ">
            <div className="row justify-content-center">
                    <form onSubmit={handleSubmit} className="form-container p-4 shadow-sm rounded">
                        <div className="form-group">
                            <label>Run Number</label>
                            <input type="number" value={runNumber} onChange={e => setRunNumber(e.target.value)} className="form-control" placeholder="Run Number" required  />
                        </div>
                        <div className="form-group">
                            <label>Start Time</label>
                            <div class="row align-items-center">
                                <div class="col align-self-center">
                                    <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} className="form-control"/>
                                </div>
                                <div class="col align-self-center">
                                    <button type="button" onClick={e => setStartTime(handleDateClick_start)} className="btn btn-secondary w-100">Get time</button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Stop Time</label>
                            <div class="row align-items-center">
                                <div class="col align-self-center">
                                    <input type="datetime-local" value={stopTime} onChange={e => setStopTime(e.target.value)} className="form-control"/>
                                </div>
                                <div class="col align-self-center">
                                    <button type="button" onClick={e => setStopTime(handleDateClick_stop)} className="btn btn-secondary w-100">Get time</button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Real Time</label>
                            <input type="number" value={realTime} onChange={e => setRealTime(e.target.value)} className="form-control" placeholder="Real time [us]"/>
                        </div>
                        <div className="form-group">
                            <label>Run Type</label>
                            <select value={runType} onChange={e => setRunType(e.target.value)} className="form-control" required>
                                <option value="">--Please choose an option--</option>
                                <option value="long_run">Long Run</option>
                                <option value="scan">Scan</option>
                                <option value="Type3">Type3</option>
                                <option value="Type4">Type4</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Scan Number</label>
                            <input type="number" value={scanNumber} onChange={e => setScanNumber(e.target.value)} className="form-control" placeholder="Scan number" />
                        </div>
                        <div className="form-group">
                            <label>Charge</label>
                            <input type="number" value={chargeValue} onChange={e => setChargeValue(e.target.value)} className="form-control" placeholder="Charge value [uC]" required />
                        </div>
                        <div className="form-group">
                            <label>Valid run</label>
                            <select value={isitTrash} onChange={e => setTrash(e.target.value)} className="form-control" required>
                                <option value="">--Please choose an option--</option>
                                <option values="yes">Yes</option>
                                <option values="no">No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Notes</label>
                            <input type="text" value={notes} onChange={e => setNotes(e.target.value)} className="form-control" placeholder="Notes" />
                        </div>
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        {success && <div className="alert alert-success mt-3">{success}</div>}
                        <button type="submit" className="btn btn-primary mt-3 w-100">Submit</button>
                    </form>
            </div>
        </div>
    );
};

export default RunForm;

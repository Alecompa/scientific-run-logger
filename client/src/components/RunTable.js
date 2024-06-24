// client/src/components/RunTable.js
import React from 'react';
import { format } from 'date-fns';
import './RunTable.css'; // Import the CSS file for styling

const RunTable = ({ runs }) => {

    const formatDateTime = (dateTime) => {
        return format(new Date(dateTime), 'Pp');
    };
    
    return (
        <div className="table-container">
            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>Run Number</th>
                        <th>Start Time</th>
                        <th>Run Type</th>
                        <th>Scan Number</th>
                        <th>Charge</th>
                        <th>ROI</th>
                        <th>Valid</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {runs.map((run) => (
                        <tr key={run.id}>
                            <td>{run.run_number}</td>
                            <td>{formatDateTime(run.start_time)}</td>
                            <td>{run.run_type}</td>
                            <td>{run.scan_number}</td>
                            <td>{run.charge}</td>
                            <td>{run.roi}</td>
                            <td>{run.isit_trash}</td>
                            <td>{run.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RunTable;

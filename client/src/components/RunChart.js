import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const RunChart = () => {
    const [runs, setRuns] = useState([]);

    useEffect(() => {
        const fetchRuns = async () => {
            try {
                const response = await axios.get('http://localhost:3000/runs', {});
                console.log(response.data); // Log the data to verify its structure
                setRuns(response.data);
            } catch (error) {
                console.error('Error fetching runs:', error);
            }
        };

        fetchRuns();
    });

    const data = {
        labels: runs.length ? runs.map(run => new Date(run.start_time).toLocaleString()) : ['No data'],
        datasets: [
            {
                label: 'Run Numbers',
                data: runs.length ? runs.map(run => run.run_number) : [0],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    return (
        <div className="container mt-4">
            <h2>Run Data Chart</h2>
            <Line data={data} />
        </div>
    );
};

export default RunChart;
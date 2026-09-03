import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ChartA() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/visualizations/a')
      .then(response => {
        const data = response.data.data;
        setChartData({
          labels: data.bins.slice(0, 30),
          datasets: [{
            label: 'Frequency',
            data: data.frequencies.slice(0, 30),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        });
      })
      .catch(error => console.error('Error:', error));
  }, []);

  if (!chartData) return <div>Loading Chart A...</div>;

  return (
    <div>
      <h2>A. Distribution of Transaction Amounts</h2>
      <Bar data={chartData} options={{responsive: true, maintainAspectRatio: true}} />
    </div>
  );
}

export default ChartA;

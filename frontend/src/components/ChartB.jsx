import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ChartB() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/visualizations/b')
      .then(response => {
        const data = response.data.data.weekly;
        setChartData({
          labels: data.weeks.slice(-52),
          datasets: [{
            label: 'Weekly Revenue (£)',
            data: data.revenues.slice(-52),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            tension: 0.1
          }]
        });
      })
      .catch(error => console.error('Error:', error));
  }, []);

  if (!chartData) return <div>Loading Chart B...</div>;

  return (
    <div>
      <h2>B. Transaction Amount Over Time</h2>
      <Line data={chartData} options={{responsive: true, maintainAspectRatio: true}} />
    </div>
  );
}

export default ChartB;

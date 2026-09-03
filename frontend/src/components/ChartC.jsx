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

function ChartC() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/visualizations/c')
      .then(response => {
        const data = response.data.data;
        setChartData({
          labels: data.categories,
          datasets: [{
            label: 'Revenue by Category (£)',
            data: data.revenues,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        });
      })
      .catch(error => console.error('Error:', error));
  }, []);

  if (!chartData) return <div>Loading Chart C...</div>;

  return (
    <div>
      <h2>C. Revenue by Product Category</h2>
      <Bar data={chartData} options={{responsive: true, maintainAspectRatio: true}} />
    </div>
  );
}

export default ChartC;

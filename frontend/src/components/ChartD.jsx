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

function ChartD() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/visualizations/d')
      .then(response => {
        const data = response.data.data;
        setChartData({
          labels: data.top_countries,
          datasets: [{
            label: 'Revenue by Country (£)',
            data: data.country_revenues,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        });
      })
      .catch(error => console.error('Error:', error));
  }, []);

  if (!chartData) return <div>Loading Chart D...</div>;

  return (
    <div>
      <h2>D. Customer Purchasing Behavior</h2>
      <Bar data={chartData} options={{responsive: true, maintainAspectRatio: true}} />
    </div>
  );
}

export default ChartD;

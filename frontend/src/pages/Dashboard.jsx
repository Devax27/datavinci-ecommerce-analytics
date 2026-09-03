import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartA from '../components/ChartA';
import ChartB from '../components/ChartB';
import ChartC from '../components/ChartC';
import ChartD from '../components/ChartD';
import '../styles/Dashboard.css';

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch summary from backend
    axios.get('http://localhost:5000/api/data/summary')
      .then(response => {
        setSummary(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📊 DataVinci Analytics Dashboard</h1>
        <p>E-Commerce Data Analysis - 500,000+ Transactions</p>
      </header>

      {summary && (
        <div className="summary-cards">
          <div className="card">
            <h3>Total Transactions</h3>
            <p className="value">{summary.total_transactions.toLocaleString()}</p>
          </div>
          <div className="card">
            <h3>Total Revenue</h3>
            <p className="value">£{summary.total_revenue.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
          </div>
          <div className="card">
            <h3>Avg Transaction</h3>
            <p className="value">£{summary.average_transaction.toFixed(2)}</p>
          </div>
          <div className="card">
            <h3>Unique Customers</h3>
            <p className="value">{summary.unique_customers.toLocaleString()}</p>
          </div>
        </div>
      )}

      <div className="visualizations">
        <div className="viz-container">
          <ChartA />
        </div>
        <div className="viz-container">
          <ChartB />
        </div>
        <div className="viz-container">
          <ChartC />
        </div>
        <div className="viz-container">
          <ChartD />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

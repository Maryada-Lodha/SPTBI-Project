
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import './AnalyticsPage.css';
import analyticsData from './analyticsData.json';
import Navbar from './Navbar';

const AnalyticsPage = () => {
  
  useEffect(() => {
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const barCtx = document.getElementById('barGraph').getContext('2d');

    const pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: analyticsData.domainData,
      options: {
        plugins: {
          legend: {
            
              position: 'bottom'
            
          }
        }
      }
    });

    const barChart = new Chart(barCtx, {
      type: 'bar',
      data: analyticsData.revenueData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      pieChart.destroy();
      barChart.destroy();
    };
  }, []);

  return (
    <div>
      <div>
        <Navbar/>
      </div>
    <div className="canvas-container">
      {/* <h2>Analytics Page</h2> */}
      <div className="chart-container">
        <div className="chart-box">
          <h3>Funded Data by Domain </h3>
          <canvas id="pieChart"></canvas>
        </div>
        <div className="chart-box">
          <h3>Revenue and Investment Raised </h3>
          <canvas id="barGraph"></canvas>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AnalyticsPage;

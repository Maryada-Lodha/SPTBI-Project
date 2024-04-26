import React, { useState, useEffect } from 'react';
import './StartupPage.css'; 
import Chart from 'chart.js/auto';
import { useRef } from 'react';
import ProgressBar from './ProgressBar';
import startupData from './StartupData.json';
import Navbar from './Navbar';

const StartupPage = () => {
  const [startupName, setStartupName] = useState('');
  const [startupInfo, setStartupInfo] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const [supportedProgramFilter, setSupportedProgramFilter] = useState('');
  const [domainFilter, setDomainFilter] = useState('');
  const [womenFounderFilter, setWomenFounderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [patentStatusFilter, setPatentStatusFilter] = useState('');
  const [yearOfIncubationFilter, setYearOfIncubationFilter] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionDropdownRef = useRef(null);
  let chartRef = useRef(null);
  

  const handleSearch = () => {
    const filteredStartups = startupData.filter(startup => {
      return (
        (startupName === '' || startup["Company Name"].toLowerCase().includes(startupName.toLowerCase())) &&
        (supportedProgramFilter === '' || startup["SupportedProgram"] === supportedProgramFilter) &&
        (domainFilter === '' || startup["Domain"] === domainFilter) &&
        (womenFounderFilter === '' || parseInt(startup["No. of Women Founder"]) >= parseInt(womenFounderFilter)) &&
        (statusFilter === '' || startup["Status"] === statusFilter) &&
        (patentStatusFilter === '' || startup["patentStatus"] === patentStatusFilter) &&
        (yearOfIncubationFilter === '' || parseInt(startup["Year of Incubation"]) === parseInt(yearOfIncubationFilter))
      );
    });
    setSuggestions(filteredStartups);
    setShowSuggestions(true);
  };

  const handleSupportedProgramFilterChange = (value) => {
    setSupportedProgramFilter(value);
  };

  const handleDomainFilterChange = (value) => {
    setDomainFilter(value);
  };

  const womenFounderFilterchange = (value) => {
    setWomenFounderFilter(value);
  };

  const statusFilterchange = (value) => {
    setStatusFilter(value);
  };

  const patentStatusFilterchnage = (value) => {
    setPatentStatusFilter(value);
  };

  const yearOfIncubationFilterchange = (value) => {
    setYearOfIncubationFilter(value);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setStartupName(inputValue);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (selectedStartup) => {
    setStartupInfo(selectedStartup);
    setStartupName(''); 
    setShowSuggestions(false);
    
  };

  useEffect(() => {
    handleSearch();
  }, [startupName, supportedProgramFilter, domainFilter, womenFounderFilter, statusFilter, patentStatusFilter, yearOfIncubationFilter]);

  useEffect(() => {
    if (startupInfo) {
      const ctx = chartRef.current.getContext('2d');
      if (chartInstance) {
        chartInstance.destroy(); 
      }

      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Sanctioned Amount', 'Distributed Amount', 'Remaining Amount'],
          datasets: [{
            label: 'Amount',
            data: [startupInfo.sanctionedAmount, startupInfo.distributedAmount, startupInfo.sanctionedAmount - startupInfo.distributedAmount],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      setChartInstance(newChartInstance); 
    }
  }, [startupInfo]);

  const getProgressData = (status) => {
    let progress = 0;
    let statusText = '';
    let color = '';
  
    if (status === 'filed') {
      progress = 33;
      statusText = 'Filed';
      color = '#ffc107'; 
    } else if (status === 'granted') {
      progress = 66;
      statusText = 'Granted';
      color = '#4caf50'; 
    } else if (status === 'published') {
      progress = 100;
      statusText = 'Published';
      color = '#2196f3'; 
    }

    return { progress, statusText, color };
  };
  useEffect(() => {
    // Close suggestions dropdown when startup info is set
    setShowSuggestions(false);
  }, [startupInfo]);

  useEffect(() => {
    // Close suggestions dropdown when a new search is performed
    if (suggestions.length === 0) {
      setShowSuggestions(false);
    }
  }, [suggestions]);

  


  return (
    <div>
      <div><Navbar/></div>
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter startup name"
          value={startupName}
          onChange={handleInputChange}
        />
        <div className="select-container">
        <select onChange={(e) => handleSupportedProgramFilterChange(e.target.value)}>
            <option value="">Supported Program</option>
            <option value="SISFS">SISFS</option>
            {/* Add more options */}
          </select>
          <select onChange={(e) => handleDomainFilterChange(e.target.value)}>
            <option value="">Domain</option>
            <option value="Clean Tech">Clean Tech</option>
            {/* Add more options */}
          </select>
          <select onChange={(e) => womenFounderFilterchange(e.target.value)}>
            <option value="">no. of woman founder</option>
            <option value="1 ">1</option>
            <option value="2 ">2</option>
            {/* Add more options */}
          </select>
          <select onChange={(e) => statusFilterchange(e.target.value)}>
            <option value="">status</option>
            <option value="Active">Active</option>
            {/* Add more options */}
          </select>
          <select onChange={(e) => patentStatusFilterchnage(e.target.value)}>
            <option value="">patent status</option>
            <option value="filed">filed</option>
            <option value="granted">granted</option>
            <option value="published">published</option>
            {/* Add more options */}
          </select>
          <select onChange={(e) => yearOfIncubationFilterchange(e.target.value)}>
            <option value="">Year</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            {/* Add more options */}
          </select>
          </div>
        <div> 
        {showSuggestions && suggestions.length > 0 && (
          <div className="dropdown" ref={suggestionDropdownRef}>
            {suggestions.map((startup, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleSelectSuggestion(startup)}
              >
                {startup["Company Name"]}
              </div>
            ))}
          </div>
        )}
        </div> 
      </div>
      {startupInfo && (  
      <div>
        <div className="startup-grid">
          <div>
            <div className="startup-header">
              <h3>{startupInfo["Company Name"]}</h3>
            </div>
            <div className="startup-info">
              {Object.entries(startupInfo).map(([key, value]) => (
                <div key={key} className="startup-field">
                  <div className="field-name">{key}</div>
                  <div className="field-value">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="startup-content">
          <div className="chart-section">
            <h3>Bar Chart</h3>
            <div className="chart-container">
              {startupInfo && <canvas ref={chartRef}></canvas>}
            </div>
          </div>
          <div className="progress-bar-section">
            <h3>Patent Progress</h3>
            <div className="startup-infof">
              <div className="startup-field">
                <div className="field-name">Patent Status</div>
                <div className="field-value">
                  <ProgressBar patentStatus={startupInfo?.patentStatus} />
                  <h3>patent no.: {startupInfo["patent no."]}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  </div>
    
  );
};

export default StartupPage;
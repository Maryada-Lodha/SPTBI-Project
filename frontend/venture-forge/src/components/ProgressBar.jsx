

import React from 'react';
import './ProgressBar.css'; 
const ProgressBar = ({ patentStatus }) => {
  let progress = 0;
  let statusText = '';
  let color = '';
  
  if (patentStatus === 'filed') {
    progress = 33;
    statusText = 'Filed';
    color = '#ffc107'; 
  } else if (patentStatus === 'granted') {
    progress = 66;
    statusText = 'Granted';
    color = '#4caf50'; 
  } else if (patentStatus === 'published') {
    progress = 100;
    statusText = 'Published';
    color = '#2196f3'; 
  }

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%`, backgroundColor: color }}>
        <div className="status-text">{statusText}</div>
      </div>
    </div>
  );
};

export default ProgressBar;

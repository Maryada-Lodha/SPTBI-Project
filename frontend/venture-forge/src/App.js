import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StartupPage from './components/StartupPage';
import AnalyticsPage from './components/AnalyticsPage';
// import CompanyPage from './components/CompanyPage';
// import Login from './components/Login';
import Login from './components/login';

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* <Navbar /> */}
        <Routes> {/* Use <Routes> wrapper */}
          <Route path="/Login"  element={<Login />} />
          <Route path="/" element={<StartupPage />} /> 
          <Route path="/analytics" element={<AnalyticsPage />} /> 
          {/* <Route path="/company" element = {< CompanyPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

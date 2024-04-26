import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo_left from './styles/sptbi.png';
import logo_right from './styles/spitlogo.png';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('startup');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <header className='header-t'>
    <img src={logo_left}  className="logo1" />
    <div className="header-titles">
        <h3 className='sub-h' >An initiative of Bharatiya Vidhya Bhavan's Sardar Patel Institute of Technology</h3>
        <h1>Sardar Patel Technology Business Incubator</h1>
        <h3 className='sub-h2'>Supported by Department of Science and Technology - Government of India</h3>
        
        {/* <h2>hwyy</h2> */}
    </div>
    <img src={logo_right}  className="logo2" />
</header>

    {/* <header className='head'>
    <img src={logo_left} alt="logo_left" className="logo" />
    <h1>Welcome to Startup Dashboard</h1>
    <h2>hwyy</h2>
  </header> */}

      <nav className="navbar">
        <ul>
          <li className={activeTab === 'startup' ? 'active' : ''} onClick={() => handleTabChange('startup')}>
            <Link to="/">Startup</Link>
          </li>
          <li className={activeTab === 'analytics' ? 'active' : ''} onClick={() => handleTabChange('analytics')}>
            <Link to="/analytics">Analytics</Link>
          </li>
        </ul>
      </nav>
      </div>
  );
};

export default Navbar;

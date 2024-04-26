// // CompanyPage.js

// import React, { useState } from 'react';
// import './CompanyPage.css'; // Import your CSS file for styling the page
// import ProgressBar from './ProgressBar'; // Import ProgressBar component

// const CompanyPage = () => {
//   const [companyName, setCompanyName] = useState('');
//   const [patentStatus, setPatentStatus] = useState('');
//   const [searchedCompany, setSearchedCompany] = useState(null);

//   // Dummy company data
//   const companyData = [
//     { companyName: 'Company A', patentStatus: 'filed' },
//     { companyName: 'Company B', patentStatus: 'granted' },
//     { companyName: 'Company C', patentStatus: 'published' },
//     // Add more dummy company data as needed
//   ];

//   const handleSearch = () => {
//     // Simulating data retrieval based on the entered company name
//     const foundCompany = companyData.find(company => company.companyName.toLowerCase() === companyName.toLowerCase());
//     if (foundCompany) {
//       setSearchedCompany(foundCompany);
//     } else {
//       // Reset the searchedCompany if not found
//       setSearchedCompany(null);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Company Page</h2>
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Enter company name"
//           value={companyName}
//           onChange={(e) => setCompanyName(e.target.value)}
//         />
//         <select value={patentStatus} onChange={(e) => setPatentStatus(e.target.value)}>
//           <option value="">Select Patent Status</option>
//           <option value="filed">Filed</option>
//           <option value="granted">Granted</option>
//           <option value="published">Published</option>
//         </select>
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       {searchedCompany && (
//         <div className="company-info">
//           <h3>{searchedCompany.companyName}</h3>
//           <ProgressBar patentStatus={searchedCompany.patentStatus} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompanyPage;

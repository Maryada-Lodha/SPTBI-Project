import React, { useState, useEffect } from "react";
import "./StartupPage.css";
import Chart from "chart.js/auto";
import { useRef } from "react";
import ProgressBar from "./ProgressBar";
import Navbar from "./Navbar";
import axios from "axios";


const StartupPage = () => {
  const [startupData, setStartupData] = useState([]);
  const [founderData, setFounderData] = useState([]);
  const [fundsData, setFundsData] = useState([]);
  const [fundsForImpactData, setFundsForImpactData] = useState([]);
  const [file, setFile] = useState(null);

  const [startupName, setStartupName] = useState("");
  const [startupInfo, setStartupInfo] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const [supportedProgramFilter, setSupportedProgramFilter] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [womenFounderFilter, setWomenFounderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [patentStatusFilter, setPatentStatusFilter] = useState("");
  const [yearOfIncubationFilter, setYearOfIncubationFilter] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [displayType, setDisplayType] = useState("basic");
  const suggestionDropdownRef = useRef(null);
  let chartRef = useRef(null);

  const fetchData = async () => {
    try {
      // Fetch data from multiple endpoints concurrently
      const [
        basicInfoResponse,
        foundersResponse,
        fundsRaisedResponse,
        impactsResponse,
      ] = await Promise.all([
        fetch("http://localhost:5000/api/v1/basicinfo"),
        fetch("http://localhost:5000/api/v1/founders"),
        fetch("http://localhost:5000/api/v1/fundraised"),
        fetch("http://localhost:5000/api/v1/impacts"),
      ]);

      // Check if any of the responses is not OK
      if (
        !basicInfoResponse.ok ||
        !foundersResponse.ok ||
        !fundsRaisedResponse.ok ||
        !impactsResponse.ok
      ) {
        throw new Error("Failed to fetch data from one or more endpoints");
      }

      // Parse response data
      const [startupData, founderData, fundsData, fundsForImpactData] =
        await Promise.all([
          basicInfoResponse.json(),
          foundersResponse.json(),
          fundsRaisedResponse.json(),
          impactsResponse.json(),
        ]);

      // Set state with fetched data
      setStartupData(startupData);
      setFounderData(founderData);
      setFundsData(fundsData);
      setFundsForImpactData(fundsForImpactData);

      console.log("Fetched all Data");
      console.log(startupData);
      console.log(founderData);
      console.log(fundsData);
      console.log(fundsForImpactData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Effect hook to fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredStartups = startupData.filter((startup) => {
      return (
        (startupName === "" ||
          startup["Company Name"]
            .toLowerCase()
            .includes(startupName.toLowerCase())) &&
        (supportedProgramFilter === "" ||
          startup["SupportedProgram"] === supportedProgramFilter) &&
        (domainFilter === "" || startup["Domain"] === domainFilter) &&
        (womenFounderFilter === "" ||
          parseInt(startup["No. of Women Founder"]) >=
            parseInt(womenFounderFilter)) &&
        (statusFilter === "" || startup["Status"] === statusFilter) &&
        (patentStatusFilter === "" ||
          startup["patentStatus"] === patentStatusFilter) &&
        (yearOfIncubationFilter === "" ||
          parseInt(startup["Year of Incubation"]) ===
            parseInt(yearOfIncubationFilter))
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
    setStartupName("");
    setShowSuggestions(false);
  };

  const handleDisplayFunds = () => {
    if (startupInfo) {
      // Find the funds data for the selected startup (if available)
      const fundsInfo = fundsData.find(
        (fund) => fund["Company Name"] === startupInfo["Company Name"]
      );
      if (fundsInfo) {
        // Set the startup info to tsethe found funds data
        setStartupInfo(fundsInfo);
        // Set the display type to 'funds'
        setDisplayType("funds");
      }
    }
  };
  const handleDisplayFundsForImpact = () => {
    if (startupInfo) {
      // Find the funds for impact data for the selected startup (if available)
      const fundsForImpactInfo = fundsForImpactData.find(
        (fund) => fund["Company Name"] === startupInfo["Company Name"]
      );
      if (fundsForImpactInfo) {
        // Set the startup info to the found funds for impact data
        setStartupInfo(fundsForImpactInfo);
        // Set the display type to 'fundsForImpact'
        setDisplayType("fundsForImpact");
      }
    }
  };

  useEffect(() => {
    handleSearch();
  }, [
    startupName,
    supportedProgramFilter,
    domainFilter,
    womenFounderFilter,
    statusFilter,
    patentStatusFilter,
    yearOfIncubationFilter,
  ]);

  useEffect(() => {
    if (startupInfo && displayType === "basic") {
      const ctx = chartRef.current.getContext("2d");
      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Sanctioned Amount",
            "Distributed Amount",
            "Remaining Amount",
          ],
          datasets: [
            {
              label: "Amount",
              data: [
                startupInfo.sanctionedAmount,
                startupInfo.distributedAmount,
                startupInfo.sanctionedAmount - startupInfo.distributedAmount,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [startupInfo, displayType]);

  const getProgressData = (status) => {
    let progress = 0;
    let statusText = "";
    let color = "";

    if (status === "filed") {
      progress = 33;
      statusText = "Filed";
      color = "#ffc107";
    } else if (status === "granted") {
      progress = 66;
      statusText = "Granted";
      color = "#4caf50";
    } else if (status === "published") {
      progress = 100;
      statusText = "Published";
      color = "#2196f3";
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
  const handleDisplayTypeChange = (type) => {
    setDisplayType(type);
    switch (type) {
      case "basic":
        if (startupInfo) {
          const basicData = startupData.find(
            (startup) => startup["Company Name"] === startupInfo["Company Name"]
          );
          setStartupInfo(basicData);
        }
        break;
      case "founder":
        // No need to change startupInfo here as it's already set
        break;
      case "funds":
        if (startupInfo) {
          const fundsInfo = fundsData.find(
            (fund) => fund["Company Name"] === startupInfo["Company Name"]
          );
          setStartupInfo(fundsInfo);
        }
        break;
      case "fundsForImpact": // Changed from 'funds' to 'fundsForImpact'
        if (startupInfo) {
          const fundsForImpactInfo = fundsForImpactData.find(
            (fund) => fund["Company Name"] === startupInfo["Company Name"]
          );
          setStartupInfo(fundsForImpactInfo);
        }
        break;
      default:
        break;
    }
  };
const handleFileChange = (e) => {
  setFile(e.target.files[0]);
};

const handleUpload = async () => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5000/api/v1/founders/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("File uploaded successfully!");
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Error uploading file. Please try again.");
  }
};

const handleDownload = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/founders/download",
      {
        responseType: "blob",
      }
    );
    // Create a blob URL for the Excel file
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);

    // Create a temporary anchor element and click it to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.xlsx";
    document.body.appendChild(a);
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error downloading file:", error);
    alert("Error downloading file. Please try again.");
  }
};
  return (
    <div>
      <div>
        <Navbar />
        <button
          style={{ margin: "3px", padding: "5px 10px", width: 150}}
          onClick={handleDownload}
        >
          Download Data
        </button>
        <input type="file" onChange={handleFileChange} />
        <button
          style={{ margin: "3px", padding: "5px 10px" }}
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
      <div className="container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter startup name"
            value={startupName}
            onChange={handleInputChange}
          />
          <div className="select-container">
            <select
              onChange={(e) =>
                handleSupportedProgramFilterChange(e.target.value)
              }
            >
              <option value="">Supported Program</option>
              <option value="SISFS">SISFS</option>
              <option value="PRAYAS">PRAYAS</option>
              {/* Add more options */}
            </select>
            <select onChange={(e) => handleDomainFilterChange(e.target.value)}>
              <option value="">Domain</option>
              <option value="Clean Tech">Clean Tech</option>
              <option value="Agri-Tech">Agri-Tech</option>
              <option value="Transportation">Transportation</option>
              <option value="CleanTech">CleanTech</option>
              <option value="Others">Others</option>
              <option value="Textile">Textile</option>
              <option value="Mobility">Mobility</option>
              <option value="Smart City">Smart City</option>
              <option value="Electronics">Electronics</option>
              <option value="Medical Devices Biomedical">
                Medical Devices Biomedical
              </option>
              <option value="EduTech">EduTech</option>
              <option value="Aerospace">Aerospace</option>
              <option value="Biotechnology">Biotechnology</option>
              <option value="Healthcare Technology">
                Healthcare Technology
              </option>
              <option value="Mechatronics">Mechatronics</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="Defence">Defence</option>
              <option value="Organic Agriculture">Organic Agriculture</option>
              <option value="Electric Vehicles">Electric Vehicles</option>
              <option value="Nanotechnology">Nanotechnology</option>
              <option value="Fintech">Fintech</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Business Finance">Business Finance</option>
              {/* Add more options */}
            </select>
            <select onChange={(e) => womenFounderFilterchange(e.target.value)}>
              <option value="">no. of woman founder</option>
              <option value="0 ">0</option>
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
            <select
              onChange={(e) => yearOfIncubationFilterchange(e.target.value)}
            >
              <option value="">Year</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              {/* Add more options */}
            </select>
          </div>
          <div>
            {/* Buttons to switch between basic info and founder info */}
            <button
              style={{ margin: "3px", padding: "5px 10px" }}
              onClick={() => handleDisplayTypeChange("basic")}
            >
              Basic Info
            </button>
            <button
              style={{ margin: "3px", padding: "5px 10px", width: 150 }}
              onClick={() => handleDisplayTypeChange("founder")}
            >
              Founder Info
            </button>
            <button
              style={{ margin: "3px", padding: "5px 10px" }}
              onClick={handleDisplayFunds}
            >
              Funds
            </button>
            <button
              style={{ margin: "3px", padding: "5px 10px" }}
              onClick={handleDisplayFundsForImpact}
            >
              Impact
            </button>
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
        {startupInfo && displayType === "basic" && (
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
        {startupInfo && displayType === "founder" && (
          <div>
            {founderData.map((founder) => {
              if (founder["Company Name"] === startupInfo["Company Name"]) {
                return (
                  <div className="startup-grid">
                    <div>
                      <div className="startup-header">
                        <h3>{founder["Founder Name"]}</h3>
                      </div>
                      <div className="startup-info">
                        {Object.entries(founder).map(([key, value]) => (
                          <div key={key} className="startup-field">
                            <div className="field-name">{key}</div>
                            <div className="field-value">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
        {startupInfo && displayType === "funds" && (
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
          </div>
        )}

        {startupInfo && displayType === "fundsForImpact" && (
          <div>
            {/* Render funds for impact info */}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default StartupPage;

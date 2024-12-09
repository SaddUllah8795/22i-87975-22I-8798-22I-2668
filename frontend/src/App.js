import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VoterManagement from './pages/VoterManagement'; 
import CandidateManagement from './pages/CandidateManagement'; 
import ElectionMonitoring from './pages/ElectionMonitoring'; 
import ResultsPublishing from './pages/ResultsPublishing'; 
import PollingStationManagement from './pages/PollingStationManagement';
import FeedbackManagement from './pages/FeedbackManagement'; 
import FraudDetectionManagement from './pages/FraudDetectionManagement';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage-voters" element={<VoterManagement />} />
        <Route path="/manage-candidates" element={<CandidateManagement />} /> 
        <Route path="/monitor-elections" element={<ElectionMonitoring />} /> 
        <Route path="/results-publishing" element={<ResultsPublishing />} /> 
        <Route path="/polling-station-management" element={<PollingStationManagement />} />
        <Route path="/feedback-management" element={<FeedbackManagement />} /> 
        <Route path="/fraud-detection" element={<FraudDetectionManagement />} />

      </Routes>
    </Router>
  );
}

export default App;

/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {
        // Add other module pages here 
        }
      </Routes>
    </Router>
  );
};

export default App;
*/
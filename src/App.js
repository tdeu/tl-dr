import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Codes from './pages/Codes';
import Writings from './pages/Words';
import Homepage from './components/Homepage/Homepage';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
        <Route path="/" element={<Homepage />} />
          <Route path="/" element={<Home />} />
          <Route path="/dapps" element={<Codes />} />
          <Route path="/writings" element={<Writings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
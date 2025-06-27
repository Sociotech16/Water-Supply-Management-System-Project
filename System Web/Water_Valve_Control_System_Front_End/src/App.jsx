import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import Account from './pages/Account';
import Automation from './pages/Automation.jsx';


export default function App() {
  return (
    <div className="app">
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <div>
            <Routes>
            <Route path="/" element={<Account />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/automation" element={<Automation />} />
            </Routes>

          </div>
          
        </main>
      </div>
    </Router>
    </div>
  );
}

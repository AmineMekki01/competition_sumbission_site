import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Submit from './pages/Submit';
import Leaderboard from './pages/Leaderboard';
import Navbar from './components/Navbar';
import GlobalStyle from './components/GlobalStyles';
import SubmissionHistory from './pages/SubmissionHistory';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <GlobalStyle /> 
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/submit" element={isAuthenticated ? <Submit /> : <Navigate to="/login" />} />
        <Route path="/submission-history" element={isAuthenticated ? <SubmissionHistory /> : <Navigate to="/login" />} />
        <Route path="/leaderboard" element={isAuthenticated ? <Leaderboard /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/leaderboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;

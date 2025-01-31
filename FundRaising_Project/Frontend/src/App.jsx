import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Donation from "./components/Donation";
import FundraiserCount from "./components/FundraiserCount";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Campaigns from "./components/campaigns";
import AddCampaign from "./components/AddCampaign";
import Payment from "./components/payment";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    localStorage.removeItem('token'); // Clear token on logout
    localStorage.removeItem('user');  // Clear user data on logout
  };

  return (
    <Router>
      <main className="pt-6">
        <Routes>
          {/* Home Page with Navbar */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Donation />
              <FundraiserCount />
              <FAQ />
            </>
          } />

          {/* Login Page */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to="/campaigns" /> : 
                <Login setAuth={setIsAuthenticated} setUser={setUserName} />
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/campaigns" 
            element={isAuthenticated ? <Campaigns userName={userName} onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/add-campaign" 
            element={isAuthenticated ? <AddCampaign userName={userName} onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/payment/:id" 
            element={isAuthenticated ? <Payment /> : <Navigate to="/login" />} 
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

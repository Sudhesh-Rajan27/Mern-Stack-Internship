import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAllCampaigns } from "../services/api";

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
  </svg>
);

const Campaigns = ({ userName, onLogout }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const data = await getAllCampaigns();
      setCampaigns(data);
    } catch (err) {
      setError("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg";
  };

  const calculateProgress = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const isGoalReached = (campaign) => {
    return campaign.raisedAmount >= campaign.goalAmount;
  };

  const isActive = (campaign) => {
    return !isGoalReached(campaign) && campaign.daysLeft > 0;
  };

  const getFilteredCampaigns = () => {
    switch (filter) {
      case 'Goal Attained':
        return campaigns.filter(campaign => isGoalReached(campaign));
      case 'Active':
        return campaigns.filter(campaign => isActive(campaign));
      default:
        return campaigns;
    }
  };

  const filteredCampaigns = getFilteredCampaigns();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Success Message */}
        {location.state?.message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <HeartIcon />
            <span className="ml-2">{location.state.message}</span>
          </div>
        )}

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${userName}`}
                alt="avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h1 className="text-3xl font-bold text-green-600">Hello, {userName}</h1>
                <p className="text-gray-600">Welcome to your fundraising dashboard</p>
              </div>
            </div>
            <div className="flex gap-4">
              <ul className="flex gap-2 mr-4">
                <li
                  onClick={() => setFilter('All')}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${filter === 'All' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  All
                </li>
                <li
                  onClick={() => setFilter('Active')}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${filter === 'Active' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  Active
                </li>
                <li
                  onClick={() => setFilter('Goal Attained')}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${filter === 'Goal Attained' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  Goal Attained
                </li>
              </ul>
              <Link to="/add-campaign">
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition flex items-center">
                  <HeartIcon />
                  <span className="ml-2">Start New Campaign</span>
                </button>
              </Link>
              <button 
                onClick={onLogout} 
                className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <HeartIcon className="text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-800">{campaigns.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <ChartIcon className="text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500">Total Raised</p>
                <p className="text-2xl font-bold text-gray-800">
                  ₹{campaigns.reduce((sum, c) => sum + c.raisedAmount, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <CalendarIcon className="text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500">Active Campaigns</p>
                <p className="text-2xl font-bold text-gray-800">
                  {campaigns.filter(campaign => isActive(campaign)).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map(campaign => (
            <div key={campaign._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
              <div className="relative aspect-w-16 aspect-h-9">
                <img 
                  src={campaign.image} 
                  alt={campaign.title} 
                  className="w-full h-48 object-cover"
                  onError={handleImageError}
                  loading="lazy"
                />
                {isGoalReached(campaign) && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white text-lg font-bold">Goal Attained!</span>
                  </div>
                )}
                <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 m-2 rounded-full text-sm">
                  {campaign.daysLeft} days left
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{campaign.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-600 font-semibold">₹{campaign.raisedAmount} raised</span>
                    <span className="text-gray-600">of ₹{campaign.goalAmount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 rounded-full h-2 transition-all duration-500"
                      style={{ width: `${calculateProgress(campaign.raisedAmount, campaign.goalAmount)}%` }}
                    ></div>
                  </div>
                </div>

                <button 
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 flex items-center justify-center"
                  onClick={() => navigate(`/payment/${campaign._id}`, { state: { campaign } })}
                >
                  <HeartIcon />
                  <span className="ml-2">Donate Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Campaigns Found</h3>
            <p className="text-gray-500 mb-4">Start your first campaign and make a difference!</p>
            <Link to="/add-campaign">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition">
                Create Campaign
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCampaign } from "../services/api";

const AddCampaign = ({ userName, onLogout }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [daysLeft, setDaysLeft] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Use a default image URL
      const defaultImage = "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg";

      await createCampaign({
        title,
        description,
        goalAmount: Number(goalAmount),
        image: defaultImage,
        daysLeft: Number(daysLeft),
        raisedAmount: 0
      });

      navigate("/campaigns");
    } catch (err) {
      setError(err.message || "Failed to create campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl text-green-600 font-bold">Hello, {userName}</h2>
        <button 
          onClick={onLogout} 
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <h2 className="text-3xl text-green-600 font-bold mb-4">Create a New Campaign</h2>

      {/* Campaign Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded-lg">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Campaign Title</label>
          <input 
            type="text" 
            placeholder="Enter campaign title" 
            className="border p-2 w-full rounded" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            placeholder="Enter campaign description" 
            className="border p-2 w-full rounded min-h-[100px]" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Goal Amount (₹)</label>
          <input 
            type="number" 
            placeholder="Enter goal amount" 
            className="border p-2 w-full rounded" 
            value={goalAmount} 
            onChange={(e) => setGoalAmount(e.target.value)} 
            required 
            min="1"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Campaign Duration (Days)</label>
          <input 
            type="number" 
            placeholder="Enter number of days" 
            className="border p-2 w-full rounded" 
            value={daysLeft} 
            onChange={(e) => setDaysLeft(e.target.value)} 
            required 
            min="1"
          />
        </div>

        <div className="flex gap-4">
          <button 
            type="submit" 
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-blue-600 transition flex-1"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Campaign"}
          </button>
          <button 
            type="button"
            onClick={() => navigate("/campaigns")}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCampaign;

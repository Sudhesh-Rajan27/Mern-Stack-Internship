import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, login } from "../services/api";

const Login = ({ setAuth, setUser }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      if (isSignUp) {
        // Sign-Up Validation
        if (!fullName || !email || !password || !confirmPassword) {
          setError("Please fill all fields.");
          return;
        }
        if (password !== confirmPassword) {
          setError("Passwords do not match!");
          return;
        }
        
        // Register user
        await register({ fullName, email, password });
        setError("Account created successfully! Please sign in.");
        setIsSignUp(false);
      } else {
        // Sign-In
        const data = await login({ email, password });
        setAuth(true);
        setUser(data.user.fullName);
        navigate("/campaigns");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input 
              type="text" 
              placeholder="Full Name" 
              className="border p-2 mb-4 w-full rounded" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)}
              required 
            />
          )}
          <input 
            type="email" 
            placeholder="Email" 
            className="border p-2 mb-4 w-full rounded" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="border p-2 mb-4 w-full rounded" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          {isSignUp && (
            <input 
              type="password" 
              placeholder="Confirm Password" 
              className="border p-2 mb-4 w-full rounded" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          )}
          <button className="bg-green-500 text-white px-4 py-2 w-full rounded">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <p className="text-center mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-green-500 font-bold">
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

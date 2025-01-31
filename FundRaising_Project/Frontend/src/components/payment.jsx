import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCampaignAmount } from "../services/api";
import "./styles/Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const campaign = location.state?.campaign;
  
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [showTransactionInput, setShowTransactionInput] = useState(false);
  
  // UPI ID for payments
  const merchantUpiId = "sudheshrajanmn@okicici";

  if (!campaign) {
    return (
      <div className="payment-container">
        <h2>No campaign selected. Please select a campaign first.</h2>
        <button onClick={() => navigate("/campaigns")}>
          Go Back to Campaigns
        </button>
      </div>
    );
  }

  // Generate UPI payment URL
  const getUpiUrl = () => {
    if (!amount) return "";
    const params = {
      pa: merchantUpiId,
      pn: "Sudhesh Rajan",
      am: amount,
      cu: "INR",
      tn: `Donation for ${campaign.title}`
    };
    return `upi://pay?${new URLSearchParams(params).toString()}`;
  };

  const handleUpdateAmount = async () => {
    if (!amount) {
      setError("Please enter an amount");
      return;
    }

    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (!transactionId) {
      setError("Please enter the UPI transaction ID");
      return;
    }

    // Basic UPI transaction ID validation
    if (transactionId.length < 12) {
      setError("Please enter a valid UPI transaction ID");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await updateCampaignAmount(campaign._id, Number(amount), transactionId);
      // If successful, go back to campaigns
      navigate("/campaigns", { 
        state: { 
          message: `Successfully donated ₹${amount} to ${campaign.title}` 
        }
      });
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || "Failed to update amount. Please try again.");
      setShowTransactionInput(true);
      setShowUpdateButton(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Donate to {campaign.title}</h2>
      
      <div className="payment-card">
        <p>{campaign.daysLeft} Days Left</p>
        <p className="amount">₹{campaign.raisedAmount || 0} Raised</p>
        <p>Goal: ₹{campaign.goalAmount}</p>

        <input
          type="number"
          placeholder="Enter Amount (₹)"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setShowUpdateButton(false);
            setShowTransactionInput(false);
            setTransactionId("");
            setError("");
          }}
          className="amount-input"
        />

        {error && <p className="error">{error}</p>}

        {amount ? (
          <>
            <div className="tabs">
              <button className="tab active">SCAN QR CODE</button>
              <button className="tab">ENTER UPI TRANSACTION ID</button>
            </div>

            <div className="qr-section">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(getUpiUrl())}&size=200x200`}
                alt="Payment QR Code"
                className="qr-code"
              />
              <p>Scan this QR code with any UPI app to pay</p>
              <p className="upi-id">UPI ID: {merchantUpiId}</p>
              
              <a 
                href={getUpiUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="upi-button"
              >
                Pay with UPI App
              </a>

              {/* Show I have completed payment button */}
              {!showTransactionInput && !showUpdateButton && (
                <button
                  className="update-button"
                  onClick={() => {
                    setShowTransactionInput(true);
                    setShowUpdateButton(true);
                  }}
                >
                  I have completed the payment
                </button>
              )}

              {/* Show transaction ID input after payment completion */}
              {showTransactionInput && (
                <div className="transaction-section">
                  <p className="instruction">
                    Please enter your UPI transaction ID to verify the payment
                  </p>
                  <input
                    type="text"
                    placeholder="Enter UPI Transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="transaction-input"
                  />
                  <p className="help-text">
                    You can find the transaction ID in your UPI app's payment history
                  </p>
                </div>
              )}

              {/* Show confirm button only after entering transaction ID */}
              {showUpdateButton && transactionId && (
                <button
                  className="confirm-button"
                  onClick={handleUpdateAmount}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify & Update Campaign"}
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="error">Please enter an amount to generate QR code</p>
        )}

        <p className="secure-text">100% Secure Payments | All Major UPI Apps Supported</p>
      </div>
    </div>
  );
};

export default Payment;

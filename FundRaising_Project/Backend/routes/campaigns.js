const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Campaign = require('../models/Campaign');
const Donation = require('../models/Donation');
const Transaction = require('../models/Transaction');

// Get all campaigns with status update
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate('creator', 'fullName')
      .populate('donors', 'fullName')
      .sort({ createdAt: -1 });

    // Update campaign status based on end date and goal
    const updatedCampaigns = await Promise.all(campaigns.map(async campaign => {
      const now = new Date();
      const endDate = new Date(campaign.endDate);
      
      if (campaign.status !== 'Goal Reached' && now > endDate) {
        campaign.status = 'Expired';
        await campaign.save();
      }

      // Calculate days left
      const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
      campaign.daysLeft = Math.max(0, daysLeft);

      return campaign;
    }));

    res.json(updatedCampaigns);
  } catch (error) {
    console.error('Get campaigns error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create campaign
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, goalAmount, image, daysLeft } = req.body;
    
    // Calculate end date based on days left
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + parseInt(daysLeft));

    const campaign = new Campaign({
      title,
      description,
      goalAmount,
      image,
      daysLeft,
      endDate,
      creator: req.user._id,
      donors: [] // Initialize empty donors array
    });

    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get campaign by ID
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate('creator', 'fullName')
      .populate('donors', 'fullName');
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Update days left
    const now = new Date();
    const endDate = new Date(campaign.endDate);
    campaign.daysLeft = Math.max(0, Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)));
    
    // Update status if expired
    if (campaign.status !== 'Goal Reached' && now > endDate) {
      campaign.status = 'Expired';
      await campaign.save();
    }
    
    res.json(campaign);
  } catch (error) {
    console.error('Get campaign error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Make donation with transaction verification
router.post('/:id/donate', auth, async (req, res) => {
  try {
    const { amount, transactionId } = req.body;
    
    // Enhanced input validation
    if (!amount || !transactionId) {
      return res.status(400).json({ message: 'Amount and transaction ID are required' });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // Check if transaction ID is already used
    const existingTransaction = await Transaction.findOne({ transactionId });
    if (existingTransaction) {
      return res.status(409).json({ message: 'This transaction ID has already been used' });
    }

    // Validate UPI transaction ID format
    const upiIdRegex = /^[a-zA-Z0-9._-]{12,}$/;
    if (!upiIdRegex.test(transactionId)) {
      return res.status(400).json({ message: 'Invalid UPI transaction ID format' });
    }

    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    console.log("checked")
    // Check if campaign is active
    const now = new Date();
    const endDate = new Date(campaign.endDate);
    console.log(endDate)
    if (now > endDate) {
      return res.status(400).json({ message: 'Campaign has ended' });
    }

    if (campaign.status === 'Goal Reached') {
      return res.status(400).json({ message: 'Campaign has already reached its goal' });
    }

    // Create transaction record
    const transaction = new Transaction({
      transactionId,
      campaign: campaign._id,
      donor: req.user._id,
      amount: Number(amount),
      status: 'verified',
      verifiedAt: new Date()
    });

    // Create donation record
    const donation = new Donation({
      campaign: campaign._id,
      donor: req.user._id,
      amount: Number(amount),
      message: `Donation of ₹${amount} (Transaction: ${transactionId})`
    });

    // Update campaign
    campaign.raisedAmount += Number(amount);
    if (campaign.raisedAmount >= campaign.goalAmount) {
      campaign.status = 'Goal Reached';
    }
    
    // Add donor to campaign if not already added
    if (!campaign.donors.includes(req.user._id)) {
      campaign.donors.push(req.user._id);
    }

    // Save all changes in a transaction
    await Promise.all([
      transaction.save(),
      donation.save(),
      campaign.save()
    ]);

    res.status(201).json({ 
      message: 'Donation successful',
      campaign,
      transaction: {
        id: transaction._id,
        status: transaction.status
      }
    });
  } catch (error) {
    console.error('Donation error:', error);
    res.status(500).json({ 
      message: 'Failed to process donation', 
      error: error.message 
    });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  goalAmount: {
    type: Number,
    required: true,
    min: [1, 'Goal amount must be greater than 0']
  },
  raisedAmount: {
    type: Number,
    default: 0,
    min: [0, 'Raised amount cannot be negative']
  },
  image: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  daysLeft: {
    type: Number,
    min: 0,
    default: function() {
      const now = new Date();
      return Math.max(0, Math.ceil((this.endDate - now) / (1000 * 60 * 60 * 24)));
    }
  },
  status: {
    type: String,
    enum: ['Ongoing', 'Goal Reached', 'Expired'],
    default: 'Ongoing'
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  donors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  totalDonations: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for progress percentage
campaignSchema.virtual('progress').get(function() {
  return Math.min((this.raisedAmount / this.goalAmount) * 100, 100);
});

// Pre-save middleware to update status based on goal and end date
campaignSchema.pre('save', function(next) {
  const now = new Date();
  
  // Update days left
  this.daysLeft = Math.max(0, Math.ceil((this.endDate - now) / (1000 * 60 * 60 * 24)));
  
  // Update status based on conditions
  if (this.raisedAmount >= this.goalAmount) {
    this.status = 'Goal Reached';
  } else if (now > this.endDate) {
    this.status = 'Expired';
  } else {
    this.status = 'Ongoing';
  }
  
  next();
});

// Index for efficient querying
campaignSchema.index({ status: 1, endDate: 1 });
campaignSchema.index({ creator: 1 });

module.exports = mongoose.model('Campaign', campaignSchema);

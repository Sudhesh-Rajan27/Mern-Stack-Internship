const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._-]{12,}$/.test(v);
      },
      message: 'Invalid UPI transaction ID format'
    }
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: [1, 'Amount must be greater than 0']
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'failed'],
    default: 'pending'
  },
  verifiedAt: {
    type: Date,
    default: null
  },
  failureReason: {
    type: String,
    default: null
  }
}, { 
  timestamps: true 
});

// Index for efficient querying
transactionSchema.index({ transactionId: 1 });
transactionSchema.index({ campaign: 1, donor: 1 });
transactionSchema.index({ status: 1, createdAt: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);

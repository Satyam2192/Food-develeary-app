const mongoose = require('mongoose');

const deliveryAgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true }, // Add phone number
  vehicle: { type: String, required: true }, // Add vehicle information
  available: { type: Boolean, default: true },
  // Add other delivery agent details if needed
});

module.exports = mongoose.model('DeliveryAgent', deliveryAgentSchema);
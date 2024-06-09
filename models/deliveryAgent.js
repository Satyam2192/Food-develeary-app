const mongoose = require('mongoose');

const deliveryAgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true }, 
  vehicle: { type: String, required: true },
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model('DeliveryAgent', deliveryAgentSchema);
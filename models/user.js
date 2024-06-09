const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // New fields added below
  phoneNumber: { 
    type: String, 
    required: true,
    // You can add validation for phone number format here
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    zipCode: { type: String },
    // You can add more address fields as needed
  }, 
  // ... other potential user details
});

module.exports = mongoose.model('User', userSchema);
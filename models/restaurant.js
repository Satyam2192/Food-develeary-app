const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  menu: [
    { 
      name: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      availability: { type: Boolean, default: true },
    }
  ],
  online: { type: Boolean, default: false },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    zipCode: { type: String },
  },
  // New openingHours field
  openingHours: {
    // You can customize this structure based on your needs
    // Example using days of the week and time ranges
    monday: { open: String, close: String }, 
    tuesday: { open: String, close: String },
    // ... (add other days of the week)
    sunday: { open: String, close: String },
  }, 
  // ... other potential restaurant details 
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
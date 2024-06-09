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
  openingHours: {

    monday: { open: String, close: String }, 
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String },
  }, 
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
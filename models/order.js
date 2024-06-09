const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  }],
  totalAmount: { type: Number, required: true, min: 0 },
  status: { 
    type: String, 
    enum: ['placed', 'accepted', 'preparing', 'pickedUp', 'delivered', 'rejected'], 
    default: 'placed' 
  },
  deliveryAgentId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryAgent' },
  rating: { type: Number, min: 1, max: 5 },

  deliveryAddress: { 
    street: { type: String, required: true },
    city: { type: String, required: true },
  },
  orderTime: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Order', orderSchema);
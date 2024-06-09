const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const Order = require('../models/order');
const DeliveryAgent = require('../models/deliveryAgent');

exports.getDashboardData = async (req, res) => {
  try {
    const users = await User.find({});
    const restaurants = await Restaurant.find({});
    const orders = await Order.find({});
    const deliveryAgents = await DeliveryAgent.find({});

    res.status(200).json({ users, restaurants, orders, deliveryAgents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data for the dashboard.' });
  }
};

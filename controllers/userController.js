const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const Order = require('../models/order');
const DeliveryAgent = require('../models/deliveryAgent');

const calculateTotalAmount = (items, menu) => {
  let totalAmount = 0;
  items.forEach((item) => {
    const menuItem = menu.find((menuItem) => menuItem.name === item.name);
    if (menuItem) {
      totalAmount += item.quantity * menuItem.price;
    }
  });
  return totalAmount;
};

exports.getAvailableRestaurants = async (req, res) => {
  try {
    const { userId } = req.params;

    const restaurants = await Restaurant.find({ online: true });

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
};

exports.placeOrder = async (req, res) => {
    try {
      const { userId } = req.params;
      const { restaurantId, items, deliveryAddress } = req.body;
  
      const user = await User.findById(userId);
      const restaurant = await Restaurant.findById(restaurantId);
  
      if (!user || !restaurant) {
        return res.status(404).json({ error: 'User or restaurant not found!' });
      }
  
      const updatedItems = items.map(item => {
        const menuItem = restaurant.menu.find(menuItem => menuItem.name === item.name);
        if (!menuItem) {
          return res.status(400).json({ error: `Item '${item.name}' not found on the menu!` });
        }
        return {
          name: item.name,
          quantity: item.quantity,
          price: menuItem.price 
        };
      });
  
      const totalAmount = calculateTotalAmount(updatedItems, restaurant.menu);  
  
      const newOrder = new Order({
        userId,
        restaurantId,
        items: updatedItems, 
        totalAmount,
        deliveryAddress,
      });
  
      const savedOrder = await newOrder.save();
  
      res.status(201).json(savedOrder);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to place order!' });
    }
  };

  exports.rateOrder = async (req, res) => {
    try {
      const { userId, orderId } = req.params;
      const { rating } = req.body; 
  
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId, 
        { rating: rating }, 
        { new: true } 
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found!' });
      }
  
      res.status(200).json({ message: 'Order rated successfully!', order: updatedOrder });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to rate order!' });
    }
  };


exports.rateDeliveryAgent = async (req, res) => {
    try {
      const { userId, deliveryAgentId } = req.params;
      const { rating } = req.body;
  
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Invalid rating. Rating should be between 1 and 5.' });
      }
  
      const order = await Order.findOne({ userId, deliveryAgentId }); 
      if (!order) {
        return res.status(404).json({ error: 'No order found for this user and delivery agent combination.' });
      }
  
      const deliveryAgent = await DeliveryAgent.findById(deliveryAgentId);
      if (!deliveryAgent) {
        return res.status(404).json({ error: 'Delivery agent not found.' });
      }
  
      const currentRatingSum = deliveryAgent.rating * deliveryAgent.ratingsCount || 0;  
      const newRatingsCount = (deliveryAgent.ratingsCount || 0) + 1;
      deliveryAgent.rating = newRatingSum / newRatingsCount; 
      deliveryAgent.ratingsCount = newRatingsCount; 
      await deliveryAgent.save();
  
      res.status(200).json({ message: 'Delivery agent rated successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to rate delivery agent.' });
    }
  };
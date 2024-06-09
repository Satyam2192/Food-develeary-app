const Restaurant = require('../models/restaurant');
const Order = require('../models/order');
const DeliveryAgent = require('../models/deliveryAgent');

exports.updateRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const updatedData = req.body;

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updatedData,
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ error: 'Restaurant not found!' });
    }

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update restaurant!' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const orders = await Order.find({ restaurantId });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders!' });
  }
};

exports.updateOrderStatus = async (req, res) => {
    try {
      const { restaurantId, orderId } = req.params;
      const { status } = req.body;
  
      const order = await Order.findOne({ _id: orderId, restaurantId });
      if (!order) {
        return res.status(404).json({ error: 'Order not found!' });
      }
  
      // If accepting the order, try to auto-assign a delivery agent
      if (status === 'accepted') {
        const availableAgent = await DeliveryAgent.findOne({ available: true });
        if (availableAgent) {
          // Update order with delivery agent and status using findByIdAndUpdate
          const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            { status: status, deliveryAgentId: availableAgent._id }, 
            { new: true }
          );
  
          if (!updatedOrder) { // Handle case where order was not found or update failed
            return res.status(500).json({ error: 'Failed to update order status and assign agent!' });
          }
  
          availableAgent.available = false;
          await availableAgent.save(); 
        } else {
          console.log('No delivery agents available at the moment.');
          // You might want to handle this differently, maybe set a flag on the order 
        }
      } else {
        // For other statuses, just update the status
        const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          { status: status },
          { new: true }
        );
  
        if (!updatedOrder) {
          return res.status(500).json({ error: 'Failed to update order status!' });
        }
      }
  
      res.status(200).json({ message: 'Order status updated successfully!' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to update order status!' });
    }
  };
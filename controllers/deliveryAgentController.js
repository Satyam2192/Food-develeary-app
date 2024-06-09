const DeliveryAgent = require('../models/deliveryAgent');
const Order = require('../models/order');

exports.updateAvailability = async (req, res) => {
  try {
    const { deliveryAgentId } = req.params;
    const { available } = req.body; 

    const updatedAgent = await DeliveryAgent.findByIdAndUpdate(
      deliveryAgentId,
      { available }, 
      { new: true }
    );

    if (!updatedAgent) {
      return res.status(404).json({ error: 'Delivery agent not found!' });
    }

    res.status(200).json(updatedAgent);

  } catch (error) {
    res.status(500).json({ error: 'Failed to update delivery agent availability!' });
  }
};

exports.updateOrderStatus = async (req, res) => {
    try {
      const { deliveryAgentId, orderId } = req.params;
      const { status } = req.body;
  
      const order = await Order.findOne({ _id: orderId, deliveryAgentId });
      if (!order) {
        return res.status(404).json({ error: 'Order not found for this delivery agent!' });
      }
  
      let updatedOrder; 

      switch (status) {
        case 'pickedUp':
  
          updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
          break;
  
        case 'delivered':

          updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status, deliveryAgentId: null },  
            { new: true }
          );
  
          await DeliveryAgent.findByIdAndUpdate(deliveryAgentId, { available: true });
          break;
  
        default:
          return res.status(400).json({ error: 'Invalid order status update.' });
      }
  
      if (!updatedOrder) {
        return res.status(500).json({ error: 'Failed to update order status!' });
      }
  
      res.status(200).json({ message: 'Order status updated successfully!' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update order status.' });
    }  

  };
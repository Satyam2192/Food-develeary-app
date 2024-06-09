const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get available restaurants for a user (at a given hour - you can implement logic for this)
router.get('/:userId/restaurants', userController.getAvailableRestaurants);

// Place an order
router.post('/:userId/orders', userController.placeOrder);

// Leave a rating for an order
router.put('/:userId/orders/:orderId/rating', userController.rateOrder);

// Leave a rating for a delivery agent
router.put('/:userId/deliveryAgents/:deliveryAgentId/rating', userController.rateDeliveryAgent);

module.exports = router;
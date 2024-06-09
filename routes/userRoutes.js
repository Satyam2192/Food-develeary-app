const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:userId/restaurants', userController.getAvailableRestaurants);

router.post('/:userId/orders', userController.placeOrder);

router.put('/:userId/orders/:orderId/rating', userController.rateOrder);

router.put('/:userId/deliveryAgents/:deliveryAgentId/rating', userController.rateDeliveryAgent);

module.exports = router;
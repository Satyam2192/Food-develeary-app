const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// Update restaurant details (menu, pricing, availability)
router.put('/:restaurantId', restaurantController.updateRestaurant);

// Get all orders for a restaurant
router.get('/:restaurantId/orders', restaurantController.getOrders);

// Accept or reject an order
router.patch('/:restaurantId/orders/:orderId/status', restaurantController.updateOrderStatus);

module.exports = router;
const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.put('/:restaurantId', restaurantController.updateRestaurant);

router.get('/:restaurantId/orders', restaurantController.getOrders);

router.patch('/:restaurantId/orders/:orderId/status', restaurantController.updateOrderStatus);

module.exports = router;
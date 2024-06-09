const express = require('express');
const router = express.Router();
const deliveryAgentController = require('../controllers/deliveryAgentController');

// Update delivery agent availability
router.put('/:deliveryAgentId/availability', deliveryAgentController.updateAvailability);

// Update order delivery status
router.patch('/:deliveryAgentId/orders/:orderId/status', deliveryAgentController.updateOrderStatus);

module.exports = router;
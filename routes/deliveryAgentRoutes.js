const express = require('express');
const router = express.Router();
const deliveryAgentController = require('../controllers/deliveryAgentController');

router.put('/:deliveryAgentId/availability', deliveryAgentController.updateAvailability);

router.patch('/:deliveryAgentId/orders/:orderId/status', deliveryAgentController.updateOrderStatus);

module.exports = router;
var express = require('express');
const router = express.Router();
var paypalCtrl = require('../controller/paypal.controller');

router.get("/buy" , paypalCtrl.createPayment);

module.exports = router
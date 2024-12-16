const express = require("express");
const router = express.Router();
const {processPayment, sendStripeApiKey} = require('../controllers/paymentController');
const {isAuthenticatedUser} = require('../middlerware/authcookie');



router.route('/process/payment').post(isAuthenticatedUser, processPayment);


router.route('/stripeapikey').get(sendStripeApiKey);


module.exports = router;

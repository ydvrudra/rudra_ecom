const catchAsyncError = require('../middlerware/catchAsyncError');

const stripe = require("stripe")('sk_test_51NmdTOSI0xx9ZVoBL7WCFx7EmTSJ2XCGiQe5M4RZlodXMR9Ro7Q03cL5twx7wEeBe17yXyATbRrtkkXWeA2VZwQJ006tC1IQH9');


const processPayment = catchAsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "INR",
    description: 'Order for exported goods or services',
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

const sendStripeApiKey = (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  };
  
module.exports = {processPayment ,sendStripeApiKey};
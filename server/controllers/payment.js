const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Stripe = require("stripe");
const stripe = Stripe(`${process.env.STRIPE_SECRET_KEY}`)

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const payment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "cad",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: payment.client_secret });
});

exports.stripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

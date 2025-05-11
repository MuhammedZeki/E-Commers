const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
router.post("/payment", async (req, res) => {
  const { products, cargoFree } = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));
  if (cargoFree !== 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Hızlı Kargo",
        },
        unit_amount: cargoFree * 100,
      },
      quantity: 1,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_DOMAIN}/success`,
    });
    return res.status(200).json({ id: session.id });
  } catch (error) {
    return res.status(500).json({ message: "[POST_PAYMENT]" });
  }
});
router.get("/v1/payment_intents", async (req, res) => {
  try {
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 10,
    });
    console.log(paymentIntents);
    return res.status(200).json({ data: paymentIntents.data });
  } catch (error) {
    return res.status(500).json({ message: "[PAYMENT_INTENTS]" });
  }
});
module.exports = router;

const express = require("express");
const Coupon = require("../models/Coupon");
const router = express.Router();

// COUPONS Get,Post
router.get("/coupon", async (req, res) => {
  try {
    const coupons = await Coupon.find();
    if (!coupons) {
      return res.status(404).json({ message: "No coupons found!" });
    }
    return res.status(200).json(coupons);
  } catch (error) {
    return res.status(500).json({ message: "[COUPON_GET]" });
  }
});
router.post("/coupon", async (req, res) => {
  try {
    const { code, discountPercent } = req.body;
    if (!code || !discountPercent) {
      return res
        .status(400)
        .json({ message: "Code and discount percent are required." });
    }
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon already exists." });
    }
    const newCoupon = await new Coupon({ code, discountPercent });
    await newCoupon.save();
    return res.status(201).json(newCoupon);
  } catch (error) {
    return res.status(500).json({ message: "[COUPON_POST]" });
  }
});

//COUPON ID
router.get("/coupon/:couponId", async (req, res) => {
  try {
    const { couponId } = req.params;
    if (!couponId) {
      return res.status(400).json({ error: "Coupon ID is required." });
    }
    const coupon = await Coupon.findById(couponId);
    return res.status(201).json(coupon);
  } catch (error) {
    return res.status(500).json({ message: "[COUPON_GET_ID]" });
  }
});
router.put("/coupon/:couponId", async (req, res) => {
  try {
    const { couponId } = req.params;
    const updates = req.body;
    if (!couponId) {
      return res.status(400).json({ error: "Coupon ID is required." });
    }
    const existingCoupon = await Coupon.findById(couponId);
    if (!existingCoupon) {
      return res.status(404).json({ error: "Coupon not found." });
    }
    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updates, {
      new: true,
    });
    return res.status(200).json(updatedCoupon);
  } catch (error) {
    return res.status(500).json({ message: "[COUPON_PUT]" });
  }
});
router.delete("/coupon/:couponId", async (req, res) => {
  try {
    const { couponId } = req.params;
    if (!couponId) {
      return res.status(400).json({ error: "Coupon ID is required." });
    }
    const existingCoupon = await Coupon.findById(couponId);
    if (!existingCoupon) {
      return res.status(404).json({ error: "Coupon not found." });
    }
    const deletedCoupon = await Coupon.findByIdAndDelete(couponId);
    return res
      .status(200)
      .json(deletedCoupon, { message: "Coupon deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "[COUPON_DELETE]" });
  }
});

//Coupon Code-Money
router.get("/coupon/code/:couponCode", async (req, res) => {
  try {
    const { couponCode } = req.params;

    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found!" });
    }
    const { discountPercent } = coupon;
    return res.status(200).json({ discountPercent });
  } catch (error) {
    return res.status(500).json({ message: "[COUPON_GET_CODE]" });
  }
});
module.exports = router;

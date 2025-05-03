import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { applyDiscount } from "../../features/CartSlicer";
import { message } from "antd";

const CartCoupon = () => {
  const [couponCode, setCouponCode] = useState("");
  const dispatch = useDispatch();
  const handlerCouponCode = async () => {
    if (couponCode.trim().length === 0) {
      return message.warning("Lütfen Kodu Giriniz!");
    }
    try {
      const res = await axios.get(
        `http://localhost:3000/coupon/code/${couponCode}`
      );
      if (res.status === 200) {
        const { discountPercent } = res.data;
        dispatch(applyDiscount({ discountPercent }));
        message.success("Kod Başarıyla Yapıldı!");
      }
    } catch (error) {
      console.log(error.message || error.response.data.message);
    }
  };
  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input
          type="text"
          className="input-text"
          placeholder="Coupon code"
          onChange={(e) => setCouponCode(e.target.value)}
          value={couponCode}
        />
        <button className="btn" type="button" onClick={handlerCouponCode}>
          Apply Coupon
        </button>
      </div>
      <div className="update-cart">
        <button className="btn">Update Cart</button>
      </div>
    </div>
  );
};

export default CartCoupon;

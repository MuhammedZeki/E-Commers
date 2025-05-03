import React from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const CartTable = () => {
  const { cartItems } = useSelector((store) => store.cart);

  return (
    <table className="shop-table">
      <thead>
        <tr>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-name">Product</th>
          <th className="product-price">Price</th>
          <th className="product-quantity">Quantity</th>
          <th className="product-subtotal">Subtotal</th>
        </tr>
      </thead>
      <tbody className="cart-wrapper">
        {cartItems.length > 0 &&
          cartItems
            .filter((item) => item !== null && item !== undefined)
            .map((cartItem) => (
              <CartItem key={cartItem._id} cartItem={cartItem} />
            ))}
      </tbody>
    </table>
  );
};

export default CartTable;

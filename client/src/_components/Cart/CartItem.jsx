import React from "react";
import { useDispatch } from "react-redux";
import { removeToCart } from "../../features/CartSlicer";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const handleRemoveToCart = (e, id) => {
    e.preventDefault();
    dispatch(removeToCart(id));
  };
  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img src={cartItem.img[0]} alt="img1" />
        <i
          className="bi bi-x delete-cart"
          data-id="1"
          onClick={(e) => handleRemoveToCart(e, cartItem._id)}
        ></i>
      </td>
      <td>{cartItem.name}</td>
      <td>${cartItem.price}</td>
      <td className="product-quantity">{cartItem.quantity}</td>
      <td className="product-subtotal">
        ${(cartItem.price * cartItem.quantity).toFixed(2)}
      </td>
    </tr>
  );
};

export default CartItem;

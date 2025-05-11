import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Spin } from "antd";

const CartTotals = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [checked, setChecked] = useState(false);

  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const subTotal = cartItems.map((cart) => {
    return cart.price * cart.quantity;
  });
  const total = subTotal.reduce((prevPrice, currentPrice) => {
    return prevPrice + currentPrice;
  });
  const price = checked ? total + 15 : total;
  const handlePayment = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!user) {
      return alert("Lütfen giriş yapınız!");
    }
    const body = {
      products: cartItems,
      user: user,
      cargoFree: checked === true ? 15 : 0,
    };
    try {
      const stripe = await loadStripe(
        "pk_test_51RKO9OB7FpevnUPYIQrHOMuIukEJ2TrWs07kZLJTeJqdlmWgLagWfgfLazDmo79RzwqFpE1sX03EYYhVvt6sdRwz00OrQcjH2M"
      );
      const res = await axios.post("http://localhost:3000/payment", body);
      if (res.status === 200) {
        const session = res.data;
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (result.error) {
          throw new Error("RESULT_ERROR", result.error.message);
        }
      } else {
        console.log("Something went wrong!");
      }
    } catch (error) {
      console.log(error.message || error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Spin spinning={loading}>
      <div className="cart-totals">
        <h2>Cart totals</h2>
        <table>
          <tbody>
            <tr className="cart-subtotal">
              <th>Subtotal</th>
              <td>
                <span id="subtotal">${price.toFixed(2)}</span>
              </td>
            </tr>
            <tr>
              <th>Shipping</th>
              <td>
                <ul>
                  <li>
                    <label>
                      Fast Cargo: $15.00
                      <input
                        type="checkbox"
                        id="fast-cargo"
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                      />
                    </label>
                  </li>
                  <li>
                    <a href="#">Change Address</a>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th>Total</th>
              <td>
                <strong id="cart-total">${price.toFixed(2)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="checkout">
          <button className="btn btn-lg" onClick={handlePayment}>
            Proceed to checkout
          </button>
        </div>
      </div>
    </Spin>
  );
};

export default CartTotals;

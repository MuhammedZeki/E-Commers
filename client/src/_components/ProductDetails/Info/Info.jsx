import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Info.css";
import { addToCart } from "../../../features/CartSlicer";
const Info = ({ singleProduct }) => {
  const [count, setCount] = useState(1);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);

  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const originalPrice = singleProduct.price.current;
  const discountPercentage = singleProduct.price.discount;
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  const filteredCartItems = cartItems.find(
    (cartItem) => cartItem._id === singleProduct._id
  );
  const addCart = (getProduct) => {
    dispatch(
      addToCart({
        product: {
          ...getProduct,
          price: discountedPrice,
        },
        quantity: count,
      })
    );
  };
  return (
    <div className="product-info">
      <h1 className="product-title">{singleProduct.name}</h1>
      <div className="product-review">
        <ul className="product-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-half"></i>
          </li>
        </ul>
        <span>2 reviews</span>
      </div>
      <div className="product-price">
        <s className="old-price">${originalPrice.toFixed(2)}</s>
        <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
      </div>
      <p
        className="product-description"
        dangerouslySetInnerHTML={{ __html: singleProduct.description }}
      ></p>
      <form className="variations-form">
        <div className="variations">
          <div className="colors">
            <div className="colors-label">
              <span>Color</span>
            </div>
            <div className="colors-wrapper">
              {singleProduct.colors.map((color, i) => (
                <div key={i} className="color-wrapper">
                  <label style={{ backgroundColor: `#${color}` }}>
                    <input type="radio" name="product-color" />
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="values">
            <div className="values-label">
              <span>Size</span>
            </div>
            <div className="values-list">
              {singleProduct.sizes.map((size, i) => (
                <span
                  key={i}
                  className={selectedSizeIndex === i ? "active" : ""}
                  onClick={() => setSelectedSizeIndex(i)}
                >
                  {size.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
          <div className="cart-button">
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              min="1"
              max="10"
              id="quantity"
            />
            <button
              className="btn btn-lg btn-primary"
              id="add-to-cart"
              type="button"
              disabled={filteredCartItems}
              onClick={() => addCart(singleProduct)}
            >
              Add to cart
            </button>
          </div>
          <div className="product-extra-buttons">
            <a href="#">
              <i className="bi bi-globe"></i>
              <span className="span">Size Guide</span>
            </a>
            <a href="#">
              <i className="bi bi-heart"></i>
              <span className="span">Add to Wislist</span>
            </a>
            <a href="#">
              <i className="bi bi-share"></i>
              <span className="span">Share this Product</span>
            </a>
          </div>
        </div>
      </form>
      <div className="divider"></div>
      <div className="product-meta">
        <div className="product-sku">
          <span>SKU:</span>
          <strong>BE45VGRT</strong>
        </div>
        <div className="product-categories">
          <span>Categories:</span>
          <strong>Pants , Women</strong>
        </div>
        <div className="product-tags">
          <span>Tags:</span>
          <a href="#">black</a>,<a href="#">white</a>
        </div>
      </div>
    </div>
  );
};

export default Info;

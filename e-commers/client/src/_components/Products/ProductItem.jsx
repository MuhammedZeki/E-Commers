import React from "react";
import "./ProductItem.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/CartSlicer";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const originalPrice = product.price.current;
  const discountPercentage = product.price.discount;
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;
  const addCart = (getProduct) => {
    dispatch(
      addToCart({
        product: {
          ...getProduct,
          price: discountedPrice,
        },
        quantity: 1,
      })
    );
  };
  const filteredCart = cartItems.find((cart) => cart._id === product._id);
  return (
    <div className="product-item glide__slide glide__slide--active ">
      <div className="product-image">
        <Link to={`/product/${product._id}`} className="product-link">
          <img src={product.img[0]} alt="" className="img1" />
          <img src={product.img[1]} alt="" className="img2" />
        </Link>
      </div>
      <div className="product-info">
        <a href="$" className="product-title">
          {product.name}
        </a>
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
        <div className="product-prices">
          <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
          <span className="old-price">${originalPrice.toFixed(2)}</span>
        </div>
        <span className="product-discount">-{product.price.discount}%</span>
        <div className="product-links">
          <button
            className="add-to-cart"
            disabled={filteredCart}
            onClick={() => addCart(product)}
          >
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <Link to={`/product/${product._id}`} className="product-link">
            <i className="bi bi-eye-fill"></i>
          </Link>
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

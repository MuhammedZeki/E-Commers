import React, { useEffect, useState } from "react";
import "./Products.css";
import Slider from "react-slick";

import ProductItem from "./ProductItem";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const NextBtn = ({ onClick }) => {
    return (
      <button className="glide__arrow glide__arrow--right " onClick={onClick}>
        <i className="bi bi-chevron-right"></i>
      </button>
    );
  };
  const PrevBtn = ({ onClick }) => {
    return (
      <button className="glide__arrow glide__arrow--left" onClick={onClick}>
        <i className="bi bi-chevron-left"></i>
      </button>
    );
  };
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    autoplaySpeed: 3000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/product");
      if (res.status === 200) {
        setProducts(res.data);
        setLoading(false);
      } else {
        console.log(res.data.message || res.response.data.message);
      }
    } catch (error) {
      console.log(error.message || error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className="products">
      <div className="container">
        <div className="section-title text-center ">
          <h2>Featured Products</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <div className="product-wrapper product-carousel">
          {loading ? (
            <p className="grid place-content-center text-teal-700 text-2xl">
              Loading...
            </p>
          ) : (
            <Slider {...settings}>
              {products.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;

import React, { useState } from "react";
import "./Gallery.css";

import Slider from "react-slick";
const Gallery = ({ singleProduct }) => {
  const [activeImg, setActiveImg] = useState({
    img: singleProduct.img[0],
    imgIndex: 0,
  });

  if (!singleProduct) {
    return <div>Yükleniyor...</div>;
  }
  function PrevBtn({ onClick }) {
    return (
      <button
        className="glide__arrow glide__arrow--left"
        data-glide-dir="<"
        onClick={onClick}
        style={{
          zIndex: "2",
        }}
      >
        <i className="bi bi-chevron-left"></i>
      </button>
    );
  }

  function NextBtn({ onClick }) {
    return (
      <button
        className="glide__arrow glide__arrow--right"
        data-glide-dir=">"
        onClick={onClick}
        style={{
          zIndex: "2",
        }}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };
  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={`${activeImg.img}`} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            <Slider {...settings}>
              {singleProduct.img.map((img, i) => (
                <li
                  key={i}
                  className="glide__slide glide__slide--active"
                  onClick={() =>
                    setActiveImg({
                      img: img,
                      imgIndex: i,
                    })
                  }
                >
                  <img
                    src={img}
                    alt=""
                    className={`img-fluid ${
                      activeImg.imgIndex === i ? "active" : ""
                    }`}
                  />
                </li>
              ))}
            </Slider>
          </ol>
        </div>
        <div className="glide__arrows" data-glide-el="controls"></div>
      </div>
    </div>
  );
};

export default Gallery;

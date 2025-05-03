import React, { useState } from "react";
import "./Search.css";
import axios from "axios";
import { message } from "antd";
import { Link } from "react-router-dom";

const Search = ({ isSearchShow, setIsSearchShow }) => {
  const [searchResults, setSearchResults] = useState(null);
  const handleCloseModal = () => {
    setIsSearchShow(false);
    setSearchResults(null);
  };
  console.log(searchResults);
  const handleSearch = async (e) => {
    e.preventDefault();
    const productName = e.target[0].value;
    if (productName.trim().length === 0) {
      message.warning("Boş Karakter arayamassınız!");
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:3000/product/search/${productName.trim()}`
      );
      if (res.status === 200) {
        setSearchResults(res.data);
      } else {
        console.log("Something went Wrong!");
      }
    } catch (error) {
      console.log(error.message || error.response.data.message);
    }
  };
  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""} `}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">
          Start typing to see products you are looking for.
        </p>
        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" placeholder="Search a product" />
          <button type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>RESULTS FROM PRODUCT</h3>
          </div>
          <div
            className="results"
            style={{
              display: `${
                searchResults?.length === 0 || !searchResults ? "flex" : "grid"
              }`,
            }}
          >
            {!searchResults && (
              <b
                className="result-item"
                style={{
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                Ürün Ara...
              </b>
            )}
            {searchResults?.length === 0 && (
              <a
                href="#"
                className="result-item"
                style={{
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                😔Aradığınız Ürün Bulunamadı😔
              </a>
            )}
            {searchResults?.length > 0 &&
              searchResults?.map((resultItem) => (
                <Link
                  to={`/product/${resultItem._id}`}
                  className="result-item"
                  key={resultItem._id}
                >
                  <img
                    src={resultItem.img[0]}
                    className="search-thumb"
                    alt=""
                  />
                  <div className="search-info">
                    <h4>{resultItem.name}</h4>
                    <span className="search-sku">SKU: PD0016</span>
                    <span className="search-price">
                      ${resultItem.price.current.toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <i
          className="bi bi-x-circle"
          id="close-search"
          onClick={handleCloseModal}
        ></i>
      </div>
      <div className="modal-overlay" onClick={handleCloseModal}></div>
    </div>
  );
};

export default Search;

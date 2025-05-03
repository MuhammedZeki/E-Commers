import React, { useState, useEffect } from "react";
import CategoryItem from "./CategoryItem";
import "./Categories.css";
import axios from "axios";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/categories");
      if (res.status === 200) {
        setCategories(res.data);
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
    <section className="categories">
      <div className="container">
        <div className="section-title text-center">
          <h2>All Categories</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="category-list">
            {categories.map((category) => (
              <CategoryItem key={category._id} category={category} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Categories;

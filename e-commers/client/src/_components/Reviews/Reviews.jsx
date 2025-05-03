import React, { useEffect, useState } from "react";
import "./Reviews.css";
import ReviewsItem from "./ReviewsItem";
import ReviewsForm from "./ReviewsForm";
import axios from "axios";
const Reviews = ({ active, singleProduct, setSingleProduct }) => {
  const [users, setUsers] = useState([]);
  const thisReviews = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/users");
        if (res.status === 200) {
          setUsers(res.data);
        }
      } catch (error) {
        console.log(error.message || error.response.data.message);
      }
    };
    fetchData();
  }, []);
  singleProduct.reviews.forEach((review) => {
    const matchingUsers = users?.filter((user) => user._id === review.user);
    console.log(matchingUsers, "matchUser");
    matchingUsers.forEach((matchingUser) => {
      thisReviews.push({
        review: review,
        user: matchingUser,
      });
    });
  });
  return (
    <div className={`tab-panel-reviews ${active}`}>
      {singleProduct.reviews.length > 0 ? (
        <>
          <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
          <div className="comments">
            <ol className="comment-list">
              {thisReviews.map((item, index) => (
                <ReviewsItem key={index} reviewItem={item} />
              ))}
            </ol>
          </div>
        </>
      ) : (
        <h3>Hiç yorum yok...</h3>
      )}
      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewsForm
          singleProduct={singleProduct}
          setSingleProduct={setSingleProduct}
        />
      </div>
    </div>
  );
};

export default Reviews;

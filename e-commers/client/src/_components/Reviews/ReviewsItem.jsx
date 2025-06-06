import React from "react";

const ReviewsItem = ({ reviewItem }) => {
  const { review, user } = reviewItem;
  const formattedDate = new Date(review.createdAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <li className="comment-item">
      <div className="comment-avatar">
        <img src={user.avatar} width={60} alt="" />
      </div>
      <div className="comment-text">
        <ul className="comment-star">
          {Array.from({ length: review.rating }, (_, i) => {
            return (
              <li key={i}>
                <i className="bi bi-star-fill"></i>
              </li>
            );
          })}
        </ul>
        <div className="comment-meta">
          <strong>{user.username}</strong>
          <span> - </span>
          <time>{formattedDate}</time>
        </div>
        <div className="comment-description">
          <p>{review.text}</p>
        </div>
      </div>
    </li>
  );
};

export default ReviewsItem;

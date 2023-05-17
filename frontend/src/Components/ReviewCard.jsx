import React from "react";
import styles from "../Styles/ReviewCard.module.css";
import Rating from "@mui/material/Rating";
import User from "../Assets/User.png";
export const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className={styles.reviewCardWrapper}>
      <div className={styles.iconHolder}>
        <img src={User} alt="pfp" />
        <h3>{review.name}</h3>
      </div>
      <div className={styles.commentHolder}>
        <span>Comment</span>
        <span>{review.comment}</span>
      </div>
      <div className={styles.ratingHolder}>
        <span>
          <Rating
            {...options}
            sx={{
              fontSize: {
                xs: 10,
                sm: 15,
                md: 20,
              },
            }}
          />
        </span>
      </div>
    </div>
  );
};

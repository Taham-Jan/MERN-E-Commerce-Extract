import React from "react";

import { Link } from "react-router-dom";
import { Button as MuiButton } from "@mui/material";

import { Rating } from "@mui/material";
import styles from "../Styles/ProductCard.module.css";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@material-ui/core";
const AllReviewCard = ({ review }) => {
  const options = {
    size: "medium",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  const useStyles = makeStyles({
    navButtonsWrapper: {
      opacity: 0, // Hide navigation buttons by default
      transition: "opacity 0.2s ease-in-out", // Add a transition effect
    },
    carouselWrapper: {
      "&:hover": {
        "& $navButtonsWrapper": {
          opacity: 1, // Show navigation buttons on hover
        },
      },
    },
    customButton: {
      fontSize: "1vmax !important",
      backgroundColor: "var(--ThemeColor) !important",
      color: "#242424 !important",
      fontFamily: "Montserrat !important",
      padding: "0.8rem !important",
      marginTop: "0.4rem !important",
      "&:hover": {
        backgroundColor: "#f3cb6c !important",
      },
      "@media (max-width: 600px)": {
        fontSize: "1.4vmax !important",
        padding: "0.5rem !important",
      },
    },
  });
  const classes = useStyles();
  return (
    <>
      <div className={styles.card}>
        <div className={styles.wrapperOfCard}>
          <div className={styles.childCardreview}>
            {Array.isArray(review.media) && review.media.length > 0 ? (
              <Carousel
                navButtonsAlwaysVisible={true}
                className={`${styles.ReviewCarousalMain} ${classes.carouselWrapper}`}
                navButtonsWrapperProps={{
                  className: classes.navButtonsWrapper,
                }}
                stopAutoPlayOnHover={true}
                swipe={true}
                navButtonsProps={{
                  style: {
                    backgroundColor: "var(--ThemeColor)", // Set background color
                    borderRadius: "50%", // Make button round
                    height: "2vmax", // Set height
                    width: "2vmax", // Set width
                  },
                }}
              >
                {review.media.map((item, i) => (
                  <img
                    className={styles.CarouselImage}
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
              </Carousel>
            ) : (
              <>
                {review.productImages &&
                review.productImages[0] &&
                review.productImages[0].url.endsWith(".mp4") ? (
                  review.productImages.find(
                    (item) =>
                      item.url.endsWith(".jpg") ||
                      item.url.endsWith(".jpeg") ||
                      item.url.endsWith(".png")
                  ) ? (
                    review.productImages &&
                    review.productImages[0] && (
                      <img
                        className={styles.CarouselImage}
                        src={
                          review.productImages.find(
                            (item) =>
                              item.url.endsWith(".jpg") ||
                              item.url.endsWith(".jpeg") ||
                              item.url.endsWith(".png")
                          ).url
                        }
                        alt={"404"}
                      />
                    )
                  ) : (
                    <p>No preview available</p>
                  )
                ) : (
                  review.productImages &&
                  review.productImages[0] && (
                    <img
                      className={styles.CarouselImage}
                      src={review.productImages[0].url}
                      alt={"404"}
                    />
                  )
                )}
              </>
            )}
          </div>

          <div className={styles.ReviewCardDetails}>
            <h2>{review.name}</h2>
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
            <div className={styles.ReviewComment}>
              <span>{`${review.comment}`}</span>
            </div>
            <Link to={`/product/${review.productId}`}>
              <MuiButton className={classes.customButton}>
                Check this product
              </MuiButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllReviewCard;

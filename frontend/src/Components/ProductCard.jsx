import React from "react";
import styles from "../Styles/ProductCard.module.css";
import { Link } from "react-router-dom";

import Rating from "@mui/material/Rating";

const ProductCard = ({ product }) => {
  const options = {
    size: "medium",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.wrapperOfCard}>
          {product.isSaleActive && product.isSaleActive ? (
            <>
              <span>SALE {product.salePercentage}% OFF</span>
            </>
          ) : (
            <></>
          )}
          <Link to={`/product/${product._id}`}>
            <div className={styles.childCard}>
              {product.image &&
              product.image[0] &&
              product.image[0].url.endsWith(".mp4") ? (
                product.image.find(
                  (item) =>
                    item.url.endsWith(".jpg") ||
                    item.url.endsWith(".jpeg") ||
                    item.url.endsWith(".png")
                ) ? (
                  product.image &&
                  product.image[0] && (
                    <img
                      src={
                        product.image.find(
                          (item) =>
                            item.url.endsWith(".jpg") ||
                            item.url.endsWith(".jpeg") ||
                            item.url.endsWith(".png")
                        ).url
                      }
                      alt={product.name}
                    />
                  )
                ) : (
                  <p>No preview available</p>
                )
              ) : (
                product.image &&
                product.image[0] && (
                  <img src={product.image[0].url} alt={product.name} />
                )
              )}
            </div>
          </Link>
          <div className={styles.cardDetails}>
            <h2>{product.name}</h2>
            <div className={styles.ratingDetails}>
              <div className={styles.rating}>
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
                {product.numberOfReviews <= 0 ? (
                  <span>No reviews yet</span>
                ) : (
                  <span>
                    ({product.numberOfReviews}
                    {product.numberOfReviews > 1 ? " Reviews" : " Review"})
                  </span>
                )}
              </div>
              {product.isSaleActive && product.isSaleActive ? (
                <>
                  <span
                    className={styles.inactivePrice}
                  >{`PKR-${product.originalPrice}/=`}</span>
                  <span>{`PKR-${product.salePrice}/=`}</span>
                </>
              ) : (
                <span>{`PKR-${product.price}/=`}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsReviews } from "../Actions/product";
import { useAlert } from "react-alert";
import AllReviewCard from "./AllReviewCard";
import styles from "../Styles/AllProductsPage.module.css";
import Spinner from "./Spinner";

const AllProductReviewPage = () => {
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.AllProductsReviews);
  const { loading, error, reviews } = allReviews;
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getAllProductsReviews());
  }, [dispatch, alert, error]);

  return (
    <>
      <h2 className={styles.productsHeading}>ALL REVIEWS</h2>
      <div className={styles.products}>

            {loading ? (
              <Spinner />
            ) : error ? (
              <p>{error}</p>
            ) : (
              reviews &&
              reviews.map((review) => (


                <AllReviewCard key={review._id} review={review} />


              ))
            )}
 
      </div>
    </>
  );
};

export default AllProductReviewPage;

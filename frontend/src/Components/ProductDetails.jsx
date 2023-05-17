import React, { useEffect, useRef, useState } from "react";
import styles from "../Styles/ProductCard.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../Actions/product";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { ReviewCard } from "./ReviewCard";
import Spinner from "./Spinner";
import * as cartActions from "../Actions/cart";
import { NEW_REVIEW_RESET } from "../Constants/product";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ReactImageMagnify from "react-image-magnify";
import {
  Button,
  ButtonGroup,
  Button as MuiButton,
  Typography,
} from "@mui/material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";

const ProductDetails = () => {
  const [carouselIndex, setCarouselIndex] = useState(1);

  const [width, setWidth] = useState(0);
  const [start, setStart] = useState(0);
  const [change, setChange] = useState(9);
  const slideRef = useRef();

  function plusSlides(n) {
    slideShow(n);
  }

  function slideShow(n) {
    let newIndex = carouselIndex + n;
    if (newIndex > product.image.length) {
      newIndex = 1;
    }
    if (newIndex < 1) {
      newIndex = product.image.length;
    }
    setCarouselIndex(newIndex);
  }

  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  // const descriptionFields = Object.entries(product.description);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [comment, setComment] = useState("");

  const AddQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
    console.log("+ Stock", product.stock);
  };

  const DecreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
    console.log("- Stock", product.stock);
  };
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const addToCartHandler = () => {
    dispatch(cartActions.addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    images.forEach((img) => {
      myForm.append("media", img);
    });

    dispatch(productActions.newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (!slideRef.current) return;
    const scrollWidth = slideRef.current.scrollWidth;
    const childElementCount = slideRef.current.childElementCount;
    const width = scrollWidth / childElementCount;
    setWidth(width);
  }, []);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(productActions.clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(productActions.clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(productActions.getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);
  function dragStart(e) {
    // console.log({start:e})
    setStart(e.clientX);
  }
  function dragOver(e) {
    let touch = e.clientX;
    // console.log(start - touch);
    setChange(start - touch);
  }
  function dragEnd(e) {
    if (change > 0) {
      slideRef.current.scrollLeft += width;
    } else {
      slideRef.current.scrollLeft -= width;
    }
  }
  useEffect(() => {
    if (!slideRef.current || !width) return;
    let numbOfThumb = Math.round(slideRef.current.offsetwidth / width);
    slideRef.current.scrollLeft =
      carouselIndex > numbOfThumb ? (carouselIndex - 1) * width : 0;
  }, [width, carouselIndex]);

  const useStyles = makeStyles({
    customButton: {
      borderColor: "var(--ThemeColor)  !important",
      color: "#242424  !important",
      marginLeft: "auto  !important",
      "&:hover": {
        backgroundColor: "#f3cb6c !important",
      },
      "@media screen and (min-width: 1000px)and (max-width: 1200px)": {
        marginLeft: "0  !important",
        marginTop: "1rem !important",
      },
    },
    customButtonCart: {
      transition: "all 0.5s !important",
      fontFamily: "'Montserrat',sans-serif !important",
      padding: "0.8em 1.3em !important",
      fontWeight: "700 !important",
      width: "max-content !important",
      backgroundColor: "var(--ThemeColor)  !important",
      maxWidth: "max-content !important",
      color: "#242424  !important",
      "&:hover": {
        backgroundColor: "#f3cb6c !important",
      },
    },
    descriptionButtonActive: {
      transition: "all 0.5s !important",
      border: "none  !important",
      padding: "0.8em 1.3em !important",
      fontWeight: "700 !important",
      borderBottom: "1px solid rgba(0, 0, 0, 0.205)  !important",
      fontFamily: "'Montserrat',sans-serif !important",
      color: "#242424  !important",
      backgroundColor: "var(--ThemeColor)  !important",
      width: "max-content !important",
      fontSize: "0.8vmax !important",
      marginTop: "1rem !important",
      "&:hover": {
        backgroundColor: "#f3cb6c !important",
      },
      "@media screen and (max-width: 1000px)": {
        width: "100% !important",
      },
    },
    descriptionButton: {

      transition: "all 0.5s !important",
      width: "max-content !important",
      padding: "0.8em 1.3em !important",
      fontWeight: "700 !important",
      fontFamily: "'Montserrat',sans-serif !important",
      fontSize: "0.8vmax !important",
      backgroundColor: "tranparent !important",
      border: "1px solid rgba(0, 0, 0, 0.205)  !important",
      borderBottom: "5px solid rgba(242, 243, 245, 0.4)  !important",
      color: "#242424  !important",
      "&:hover": {
        backgroundColor: "#f3cb6c !important",
      },
      "@media screen and (max-width: 1000px)": {
        width: "100% !important",
      },
    },
  });
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const descriptions = [
    {
      label: `${product.name && product.name}`,
      text: product.description?.basicDescription,
    },
    {
      label: "Key Benefits",
      text: product.description?.KeyBenefits,
    },
    {
      label: "How to Use",
      text: product.description?.howToUse,
    },
    {
      label: "Cautions",
      text: product.description?.cautions,
    },
    {
      label: "Ingredients",
      text: product.description?.ingredients,
    },
    {
      label: "FAQ",
      text: product.description?.faq,
    },
  ];
  // const descriptions = productDescriptions.filter((desc) => desc.text);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className={styles.ProductDetails}>
            <div className={styles.saleHeading}>
              {product.isSaleActive && product.isSaleActive ? (
                <>
                  <span>SALE {product.salePercentage}% OFF</span>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className={styles.productPageimg}>
              {product.image &&
                product.image.map((item, i) => (
                  <>
                    <div
                      key={i}
                      className={styles.mySlides}
                      style={{
                        display: i + 1 === carouselIndex ? "block" : "none",
                      }}
                    >
                      <div className={styles.numberText}>
                        {i + 1} / {product.image.length}
                      </div>

                      {/* <img src={item.url} alt={`${i} Slide`} /> */}
                      {item.url.includes(".mp4") ||
                      item.url.includes(".avi") ? (
                        <video controls autoPlay loop muted>
                          <source src={item.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        // <img src={item.url} alt={`${i} Slide`} />

                        <Box>
                          <ReactImageMagnify
                            key={carouselIndex}
                            className={styles.reactMagnify}
                            {...{
                              smallImage: {
                                alt: `${product.name}`,
                                isFluidWidth: true,
                                src: `${item.url}`,
                              },
                              largeImage: {
                                src: `${item.url}`,
                                width: 1200,
                                height: 1800,
                              },
                              enlargedImageContainerClassName:
                                styles.enlargedImageContainer,
                            }}
                          />
                        </Box>
                      )}
                    </div>
                  </>
                ))}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className={styles.prev} onClick={() => plusSlides(-1)}>
                &#10094;
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className={styles.next} onClick={() => plusSlides(1)}>
                &#10095;
              </a>
              <div
                className={styles.sliderImg}
                ref={slideRef}
                draggable={true}
                onDragStart={dragStart}
                onDragOver={dragOver}
                onDragEnd={dragEnd}
              >
                {product.image &&
                  product.image.map((item, i) => (
                    <div
                      key={i}
                      className={`${styles.sliderBox} ${
                        i + 1 === carouselIndex ? styles.active : ""
                      }`}
                      onClick={() => setCarouselIndex(i + 1)}
                    >
                      {/* <img src={item.url} alt={`${i} Slide`} /> */}
                      {(item.url && item.url.includes(".mp4")) ||
                      item.url.includes(".avi") ? (
                        <SlowMotionVideoIcon />
                      ) : (
                        <img src={item.url} alt={`${i} Slide`} />
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className={styles.detailsRightSide}>
              <div className={styles.detailsBlock1}>
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className={styles.detailsBlock2}>
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
                {product.numberOfReviews <= 0 ? (
                  <p className={styles.detailsBlock2span}>No reviews yet</p>
                ) : (
                  <p className={styles.detailsBlock2span}>
                    ({product.numberOfReviews}
                    {product.numberOfReviews > 1 ? " Reviews" : " Review"})
                  </p>
                )}
                <MuiButton
                  sx={{
                    fontSize: {
                      xs: 7,
                      sm: 8,
                      md: 9,
                    },
                  }}
                  variant="outlined"
                  onClick={submitReviewToggle}
                  className={classes.customButton}
                >
                  ADD A REVIEW
                </MuiButton>
              </div>

              <div className={styles.detailsBlock3}>
                {product.isSaleActive && product.isSaleActive ? (
                  <>
                    <h1
                      className={styles.detailsInactivePrice}
                    >{`PKR-${product.originalPrice}/=`}</h1>
                    <h1>{`PKR-${product.salePrice}/=`}</h1>
                  </>
                ) : (
                  <h1>{`PKR-${product.price}/=`}</h1>
                )}
                <p>
                  Status:{" "}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
                <div className={styles.detailsBlock31}>
                  <div className={styles.detailsBlock311}>
                    <button
                      disabled={product.stock < 1}
                      onClick={DecreaseQuantity}
                    >
                      -
                    </button>
                    <input
                      readOnly
                      type="number"
                      value={quantity}
                      style={{ cursor: "default" }}
                    />
                    <button disabled={product.stock < 1} onClick={AddQuantity}>
                      +
                    </button>
                  </div>
                  <Button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                    className={classes.customButtonCart}
                    startIcon={<AddShoppingCartIcon />}
                  >
                    ADD TO CART
                  </Button>
                </div>
              </div>
              <div className={styles.detailsBlock41} >
                <ButtonGroup
                  aria-label="product description tabs"
                >
                  {descriptions
                    .filter((desc) => desc.text)
                    .map((desc, index) => (
                      <Button 
                        className={
                          selectedTab === index
                            ? classes.descriptionButton
                            : classes.descriptionButtonActive
                        }
                        key={index}
                        onClick={() => handleTabClick(index)}
                      >
                        {desc.label}
                      </Button>
                    ))}
                </ButtonGroup>
                <div className={styles.detailsBlock4}>
                  {descriptions[selectedTab].text ? (
                    <Typography>{descriptions[selectedTab].text}</Typography>
                  ) : (
                    <Typography>No description available.</Typography>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className={styles.submitDialog}>
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className={styles.submitDialogTextArea}
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <div id={styles.createProductFormFile}>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                />
              </div>
              <div id={styles.createProductFormImage}>
                {imagePreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>
            </DialogContent>
            <DialogActions>
              <MuiButton onClick={submitReviewToggle} color="secondary">
                Cancel
              </MuiButton>
              <MuiButton onClick={reviewSubmitHandler} color="primary">
                Submit
              </MuiButton>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className={styles.reviews}>
              <h3 className={styles.reviewsHeading}>REVIEWS</h3>
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className={styles.noReviews}>No Reviews Yet</p>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetails;

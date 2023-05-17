import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../Actions/product";
import Rating from "@mui/material/Rating";
import { useTheme } from "@mui/material/styles";
import { DELETE_PRODUCT_RESET } from "../../Constants/product";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@mui/material";
import styles from "../../Styles/ProductCard.module.css";
import containerStyles from "../../Styles/AllProductsPage.module.css";
import { useMediaQuery } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import Spinner from "../Spinner";
const AdminProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  const [deleteLoading, setDeleteLoading] = useState(false);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
      setDeleteLoading(false);
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
    setDeleteLoading(true);
  };
  const updateProductHandler = (id) => {
    navigate(`/admin/product/${id}`);
  };

  const options = {
    size: "medium",
    value: products.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={styles.productHeadingsAdmin}>
        <h2>ALL PRODUCTS</h2>
        
        <h4> Total Products: {products.length}</h4>
      </div>
      <Link to="/admin/product">
         <center> <Button sx={{margin:"auto",color:"var(--headerColor)",backgroundColor:"var(--PrimaryFontColor)"}}>CREATE NEW</Button></center>
        </Link>
      <div className={containerStyles.products}>
        {deleteLoading ? (
          <Spinner />
        ) : (
          <>
            {products &&
              products.map((product, index) => (
                <div className={styles.card}>
                  <div className={styles.wrapperOfCardAdmin}>
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
                            <img
                              src={product.image[0].url}
                              alt={product.name}
                            />
                          )
                        )}
                      </div>
                    </Link>
                    <div className={styles.cardDetails}>
                      <h2>{product.name}</h2>
                      <span>Stock: {product.stock}</span>
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
                              {product.numberOfReviews > 1
                                ? " Reviews"
                                : " Review"}
                              )
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
                    <p style={{ fontSize: "1vmax", textAlign: "center" }}>
                      {product._id}
                    </p>
                    <div className={styles.adminActions}>
                      <Button onClick={() => updateProductHandler(product._id)}>
                        <EditIcon />
                      </Button>
                      <Button onClick={handleClickOpen}>
                        <DeleteIcon />
                      </Button>
                      {/* <Button onClick={() => deleteProductHandler(product._id)}>
                    <DeleteIcon />
                  </Button> */}
                      <Dialog
                        key={index}
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle id="responsive-dialog-title">
                          {"Delete Confirmation"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Delete this product?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button autoFocus onClick={handleClose}>
                            NO
                          </Button>
                          <Button
                            onClick={() => {
                              deleteProductHandler(product._id);
                              handleClose();
                            }}
                            autoFocus
                          >
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default AdminProductList;

import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../Actions/order";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Styles/Cart.module.css";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@material-ui/core";
import { Button as MuiButton } from "@mui/material";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

const OrderConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const orderData = {
    shippingInfo,
    orderItems: cartItems,
    totalPrice: orderInfo.subTotal,
    taxPrice: orderInfo.taxPrice,
    shippingPrice: orderInfo.deliveryCharges,
    grandTotalPrice: orderInfo.grandTotal,
  };
  orderData.paymentInfo = { status: "unpaid" };

  const useStyles = makeStyles({
    customButtonConfirm: {
      backgroundColor: "var(--ThemeColor)  !important",
      color: "#242424  !important",

      "&:hover": {
        backgroundColor: "#f3cb6c !important",
      },
    },
    customButton: {
      borderColor: "var(--ThemeColor)  !important",
      color: "#242424  !important",
      fontSize: "0.9vmax !important",
      "&:hover": {
        backgroundColor: "#f3cb6c !important",
      },
    },
  });
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = (event) => {
    event.preventDefault();
    // Do nothing, dialog should not be closed yet
  };
  const orderSuccessHandler = () => {
    setOpen(true);
    dispatch(createOrder(orderData));
  };
  const orderSuccessHandlerVisitAllOrder = () => {
    localStorage.removeItem("cartItems");
    sessionStorage.removeItem("orderInfo");
    setOpen(false);
    navigate("/orders");
    window.location.reload();
  };
  const orderSuccessHandlerVisitShopMore = () => {
    localStorage.removeItem("cartItems");
    sessionStorage.removeItem("orderInfo");
    setOpen(false);
    navigate("/products");
    window.location.reload();
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ root: classes.dialog }}
      >
        <Box sx={{ width: "100%", padding: "3rem" }}>
          <DialogTitle>
            <OfflinePinIcon
              style={{ fill: "green", fontSize: "5rem", width: "100%" }}
            />
          </DialogTitle>
          <DialogContent
            style={{ textTransform: "uppercase", fontWeight: "bold" }}
          >
            <p>Your order has been confirmed!</p>
          </DialogContent>
          <hr/>
          <DialogActions>
            <MuiButton
              className={classes.customButtonConfirm}
              onClick={orderSuccessHandlerVisitAllOrder}
            >
              View Orders
            </MuiButton>
            <MuiButton
              className={classes.customButtonConfirm}
              onClick={orderSuccessHandlerVisitShopMore}
            >
              Shop More
            </MuiButton>
          </DialogActions>
        </Box>
      </Dialog>
      <div className={styles.cartCardMain}>
        <div className={styles.cartLeftSide}>
          <div className={styles.orderConfirmHeading}>
            <h1>Confirm Order</h1>
            <span>
              *Please ensure that all of your details are accurate and
              up-to-date to ensure a smooth delivery of your product. If any
              changes are required, kindly update them to avoid any potential
              delays.
            </span>
            <hr style={{ width: "100%" }} />
            <div className={styles.orderConfirmHeadingContact}>
              <p>Contact : </p>{" "}
              <p> {shippingInfo.contactNumber}</p>
              <Link to="/shipping">
                <MuiButton
                  variant="outlined"
                  endIcon={<EditIcon />}
                  className={classes.customButton}
                >
                  Edit
                </MuiButton>
              </Link>
            </div>
            <hr style={{ width: "100%" }} />
            <div className={styles.orderConfirmHeadingAddress}>
              <p>Address :</p>
              <p>{orderInfo.address}</p>
              <Link to="/shipping">
                <MuiButton
                  variant="outlined"
                  endIcon={<EditIcon />}
                  className={classes.customButton}
                >
                  Edit
                </MuiButton>
              </Link>
            </div>
          </div>
          <hr style={{ width: "100%" }} />
          {cartItems &&
            cartItems.map((cart) => (
              <>
                <div className={styles.productPartConfirm}>
                  <div>
                    <img src={cart.image} alt="404" />
                    <span className={styles.cartBadgeConfirm}>{cart.quantity}</span>
                  </div>
                  <p>
                    <span>{cart.name}</span>
                    <span>PKR-{cart.price} X {cart.quantity}</span>
                    <span>PKR-{cart.price * cart.quantity}</span>
                  </p>
                </div>
                <hr />
              </>
            ))}
          <div className={styles.confirmButtonGroup}>
            <MuiButton
              className={classes.customButtonConfirm}
              onClick={orderSuccessHandler}
            >
              CONFIRM ORDER
            </MuiButton>
            {/* <MuiButton className={classes.customButtonConfirm}>
              <Link to="/orders">View Orders</Link>
            </MuiButton> */}
          </div>
          {/* <MuiButton className={classes.customButton} endIcon={<ShoppingCartCheckoutIcon />} onClick={checkoutHandler}>
            CHECKOUT
          </MuiButton>  */}
        </div>

        <div className={styles.cartRightSide}>
          <div className={styles.cartRightSideContent}>
            <div className={styles.billHeading}>
              <h1>Summary</h1>
            </div>
            <hr />
            {/* <AddressCard address={address} shippingInfo={shippingInfo} /> */}
            <div className={styles.cartTotalPrice}>
              <p>{cartItems.length} Item Sub-Total</p>
              <p>{`PKR-${orderData.totalPrice}`}</p>
            </div>
            <div className={styles.cartTotalPrice}>
              <p>Shipping Price:</p>
              <p>{`PKR-${orderData.shippingPrice}`}</p>
            </div>
            <div className={styles.cartTotalPrice}>
              <p>Tax Price:</p>
              <p> {`PKR-${orderData.taxPrice}`} </p>
            </div>
            <hr />
            <div className={styles.cartGrandTotal}>
              <p>TOTAL PRICE</p>
              <p>{`PKR-${orderData.grandTotalPrice}`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirm;

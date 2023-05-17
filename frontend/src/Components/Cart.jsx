import React, { useState } from "react";
import styles from "../Styles/Cart.module.css";
import EmptyBag from "../Assets/shopping-bag.png";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import * as cartActions from "../Actions/cart";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { AddressCard } from "./AddressCard";
import { Button as MuiButton } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const [deliveryCharges, setDeliveryCharges] = useState(200);
  const handleDeliveryChargesChange = (event) => {
    setDeliveryCharges(parseInt(event.target.value));
  };

  const deleteCartItems = (id) => {
    dispatch(cartActions.removeItemsFromCart(id));
  };

 
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const taxPrice =Math.round( (subTotal + deliveryCharges) * 0.17);
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.zipCode}, ${shippingInfo.country}`;
  const grandTotal = Math.round((subTotal + deliveryCharges) + taxPrice);
  const checkoutHandler = () => {
    Object.keys(shippingInfo).length === 0
    ? alert.error("Please enter address")
    : navigate("/login?redirect=orderConfirm");
    const data = {
      subTotal,
      address,
      grandTotal,
      deliveryCharges,
      taxPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
  };

  
const useStyles = makeStyles({
  customButton: {
    backgroundColor: "var(--ThemeColor) !important",
    color: "#242424 !important",
    fontWeight:"550 !important",
    padding:"1rem !important",
     "&:hover": {
      backgroundColor: "#f3cb6c !important",
    },
  },
});
  const classes = useStyles();

  return (
    <div className={styles.cartCardMain}>
      <div className={styles.cartLeftSide}>
        <div className={styles.cartHeading}>
          <h1>Shopping Cart</h1>
          <p>Items : {cartItems.length}</p>
        </div>
        <hr style={{width:"100%"}}/>
        {cartItems.length === 0 ? (
          <div className={styles.noProductPart}>
            <img src={EmptyBag} alt="404" />
            <h1>Oops...</h1>
            <p>Your shopping cart is empty!</p>
          </div>
        ) : (
          <>
            {cartItems &&
              cartItems.map((item) => (
                <div className={styles.cartCard} key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                </div>
              ))}
          </>
        )}

        <div className={styles.goBackLink}>
          <Link to="/products">
            <KeyboardBackspaceIcon />
            Continue Shopping
          </Link>
        </div>
      </div>
      {cartItems.length === 0 ? (
        ""
      ) : (
        <div className={styles.cartRightSide}>
          <div className={styles.cartRightSideContent}>
            <div className={styles.billHeading}>
              <h1>Summary</h1>
            </div>
            <hr />
            <div className={styles.cartTotalPrice}>
              <p>{cartItems.length} ITEMS</p>
          
              <p>{`PKR-${subTotal}/=`}</p>
            </div>
            <hr />
            <p>SHIPPING DETAILS</p>
            <AddressCard address={address} shippingInfo={shippingInfo}/>
            
            <div className={styles.cartShippingPrice}>
              
              <select
                value={deliveryCharges}
                onChange={handleDeliveryChargesChange}
              >
                <option value={200}>Standard-Delivery- PKR - 200</option>
                <option value={500}>Standard-Delivery- PKR - 500</option>
                <option value={1000}>Standard-Delivery- PKR - 1000</option>
              </select>
            </div>
            <hr />
            <div className={styles.cartTotalPrice}>
              <p>Tax (17%): </p>
              <p>{`Pkr-${taxPrice}/=`}</p>
            </div>
            <div className={styles.cartGrandTotal}>
              <p>TOTAL PRICE</p>
              <p>{`Pkr-${grandTotal}/=`}</p>
            </div>
            <MuiButton className={classes.customButton} endIcon={<ShoppingCartCheckoutIcon/>} onClick={checkoutHandler}>
              CHECKOUT
            </MuiButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

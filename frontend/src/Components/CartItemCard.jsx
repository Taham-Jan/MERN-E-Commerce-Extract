import React from "react";
import styles from "../Styles/Cart.module.css";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import * as cartActions from "../Actions/cart";
const CartItemCard = ({ item, deleteCartItems }) => {
  const dispatch = useDispatch();
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(cartActions.addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(cartActions.addItemsToCart(id, newQty));
  };
  return (
    <>
      <div className={styles.productPart}>
        <img src={item.image} alt="" />
        <p>
          <span>{item.category}</span>
          <span>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
          </span>

          <span>Pkr-{item.price}/=</span>
        </p>

        <div className={styles.cartInput}>
          <button onClick={() => decreaseQuantity(item.product, item.quantity)}>
            -
          </button>
          <input type="number" value={item.quantity} readOnly />
          <button
            onClick={() =>
              increaseQuantity(item.product, item.quantity, item.stock)
            }
          >
            +
          </button>
        </div>
        <span className={styles.cartSubtotal}>
          Pkr-{item.price * item.quantity}/=
        </span>
        <CloseIcon onClick={() => deleteCartItems(item.product)} />
      </div>
      <hr />
    </>
  );
};

export default CartItemCard;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../Actions/order";
import Spinner from "../Spinner";
import styles from "../../Styles/Cart.module.css";
import { useAlert } from "react-alert";
import "./OrderDetails.css";
import moment from "moment";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.cartCardMain}>
            <div className={styles.cartLeftSide}>
              <div className={styles.orderDetailsHeading}>
                <div>
                  <h1>Order Details</h1>
                  <p>Order #{order && order._id}</p>
                </div>
                <div>
                  <div>
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "Payment Pending"}
                    </p>
                  </div>
                  <div>
                    <p
                      className={
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.orderStatus && order.orderStatus}{" "}
                      {moment(order.updatedAt).isAfter(
                        moment(order.createdAt)
                      ) &&
                        `on ${moment(order.updatedAt).format(
                          "DD/MM/YYYY hh:mm a"
                        )}`}
                    </p>
                  </div>
                </div>
              </div>
              <hr style={{ width: "100%" }} />
              <div className={styles.orderConfirmHeadingContact}>
                <p>Ordered By : </p>
                <p>{order.user && order.user.name} on {order && moment(order.createdAt).format("DD/MM/YYYY hh:mm a")}</p>
              </div>
              <div className={styles.orderConfirmHeadingContact}>
                <p>Shipping Contact Number : </p>
                <p>{order.shippingInfo && order.shippingInfo.contactNumber}</p>
              </div>
              <hr style={{ width: "100%" }} />
              <div className={styles.orderConfirmHeadingAddress}>
                <p>Shipping Address : </p>
                <p>
                  {order.shippingInfo &&
                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.zipCode}, ${order.shippingInfo.country}`}
                </p>
                <Link to="/shipping"></Link>
              </div>

              <hr style={{ width: "100%" }} />
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <>
                    <div className={styles.productPartConfirm}>
                      <div>
                        <img src={item.image} alt="404" />
                        <span className={styles.cartBadgeConfirm}>
                          {item.quantity}
                        </span>
                      </div>
                      <p>
                        <span>{item.name}</span>
                        <span>
                          PKR-{item.price} (x{item.quantity})
                        </span>

                        <span>PKR-{item.price * item.quantity}</span>
                      </p>
                    </div>
                    <hr />
                  </>
                ))}
            </div>

            <div className={styles.cartRightSide}>
              <div className={styles.cartRightSideContent}>
                <div className={styles.billHeading}>
                  <h1>Summary</h1>
                </div>
                <hr />
                <div className={styles.cartTotalPrice}>
                  <p>
                    {order.orderItems && order.orderItems.length} Item Sub-Total
                  </p>
                  <p>{`PKR-${order && order.totalPrice}`}</p>
                </div>
                <div className={styles.cartTotalPrice}>
                  <p>Shipping Price:</p>
                  <p>{`PKR-${order && order.shippingPrice}`}</p>
                </div>
                <div className={styles.cartTotalPrice}>
                  <p>Tax Price:</p>
                  <p> {`PKR-${order && order.taxPrice}`} </p>
                </div>
                <hr />
                <div className={styles.cartGrandTotal}>
                  <p>TOTAL PRICE</p>
                  <p>{`PKR-${order && order.grandTotalPrice}`}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;

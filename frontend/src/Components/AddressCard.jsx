import React from "react";
import styles from "../Styles/AddressCard.module.css";
import { useSelector } from "react-redux";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import { useNavigate } from "react-router-dom";
export const AddressCard = ({address, shippingInfo}) => {
  const navigate = useNavigate();
  const onClickShippingDetails = () => {
    navigate("/login?redirect=shipping");
  };
  return (

    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.cardfront}>
          <div className={styles.layer}>
            {Object.keys(shippingInfo).length === 0 ? (
              <span onClick={onClickShippingDetails}>
                <AddHomeWorkIcon /> Please Enter Shipping Details
              </span>
            ) : (
              <>
                <span onClick={onClickShippingDetails}>
                  <p>Phone: {shippingInfo.contactNumber}</p>
                  <p>Address: {address}</p>
                </span>
              </>
            )}

            <div className={styles.corner}></div>
            <div className={styles.corner}></div>
            <div className={styles.corner}></div>
            <div className={styles.corner}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

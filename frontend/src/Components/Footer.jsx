import React, { useEffect } from "react";
import "./Extracss/Footer.css";
import webLogo from "../Assets/LOGO.png";
import IconButton from "@mui/material/IconButton";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { Tooltip } from "@mui/material";

import { Link } from "react-router-dom";

const Footer = () => {
  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <>
      <footer className="footer">
        <div className="footer__addr">
          <h1 className="footer__logo">
            <Link to="/">
              <img src={webLogo} alt="404" />
            </Link>
          </h1>

          <h2>
            Contact Number:{" "}
            <a href="tel:+923323919446">Call us at (+92) 3323919446</a>
          </h2>

          <h2> Email Address:{" "}
            <a
            className="footer__btn"
              href="mailto:extractbeautycare@gmail.com"
            >
             extractbeautycare@gmail.com<br></br>
            </a>
          </h2>
        </div>

        <ul className="footer__nav">
          <li className="nav__item">
            <h2 className="nav__title">Quick Links</h2>

            <ul className="nav__ul">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products?category=Skin Care">Skin Care</Link>
              </li>
              <li>
                <Link to="/products?category=Hair Care">Hair Care</Link>
              </li>
              <li>
                <Link to="/reviews">Reviews</Link>
              </li>

              <li>
                <Link to="/products">Products</Link>
              </li>
            </ul>
          </li>

          <li className="nav__item nav__item--extra">
            <h2 className="nav__title">Account</h2>

            <ul className="nav__ul nav__ul--extra">
              <li>
                <Link to="/account">Profile</Link>
              </li>

              <li>
                <Link to="/login">Login / Register</Link>
              </li>

              <li>
                <Link to="/orders">Orders</Link>
              </li>

              <li>
                <Link to="/cart">Cart</Link>
              </li>

              <li>
                <Link to="/">About Us</Link>
              </li>

              <li>
                <Link to="/">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
            </ul>
          </li>

          {/* <li className="nav__item_center">
            <h2 className="nav__title">Follow Us</h2>

            <ul className="nav_ul_followUs">
              <li>
                <Link to="/">
                  <Button variant="outlined" startIcon={<YouTubeIcon />} style={{ color: "#cd201f", borderColor: "#cd201f" }}>
                    YouTube
                  </Button>
                </Link>
              </li>

              <li>
              <Link to="/">
                  <Button variant="outlined" startIcon={<FacebookIcon />} style={{ color: "#3b5998", borderColor: "#3b5998" }}>
                    Facebook
                  </Button>
                </Link>
              </li>
            </ul>
  </li>*/}
        </ul>

        <div className="legal">
          <p>&copy; 2023 Extract. All rights reserved.</p>
          <Tooltip title="Scroll to top">
            <IconButton
              className="scroll-to-top"
              aria-label="scroll to top"
              onClick={handleClick}
            >
              <ArrowCircleUpIcon />
            </IconButton>
          </Tooltip>
        </div>
      </footer>
    </>
  );
};

export default Footer;

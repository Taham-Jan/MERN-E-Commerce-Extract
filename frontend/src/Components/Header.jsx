import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
// import styles from "../Styles/Header.module.css";
import "./Extracss/Header.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import shoppingCart from "../Assets/shoppingCart.png";
import AccountMenu from "./AccountMenu.jsx";
import webLogo from "../Assets/LOGO.png";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import UserDummy from "../Assets/User.png";
import { Button as MuiButton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const useStyles = makeStyles(
  {
    socialMediaButton: {
      fontSize: "0.8vmax !important",
      padding: "0.1vmax 1vmax !important",
      transition: ".5 all !important",
    },
  },
  {
    name: "Header",
  }
);
const Header = () => {
  const headerClasses = useStyles();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [numOfItemsInCart, setNumOfItemsInCart] = useState(0);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setClick(!click);
    if (!click && window.innerWidth <= 800) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  };
  const handleLinkClick = () => {
    setClick(false);
    document.body.style.overflowY = "scroll";
  };

  useEffect(() => {
    setNumOfItemsInCart(cartItems.length);
  }, [cartItems]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setClick(false);
        document.body.style.overflowY = "scroll";
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (location.pathname === "/" && window.scrollY >= 100) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);
  const linkToHome = () => {
    navigate("/");
  };
  const location = useLocation();

  return (
    <div id="bg">
      <div
        className={
          location.pathname === "/"
            ? color
              ? "header header-bg"
              : "header"
            : "header header-bg"
        }
      >
        <div className="navicon" onClick={handleClick}>
          {click ? (
            <FaTimes size={20} style={{ color: "black" }} />
          ) : (
            <FaBars size={20} style={{ color: "black" }} />
          )}
        </div>
        <img
          onClick={linkToHome}
          className="logoHeading"
          src={webLogo}
          alt="404"
        />
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li>
            <Link to="/products?category=Skin Care" onClick={handleLinkClick}>
              Skin care
            </Link>
          </li>
          <li>
            <Link to="/products?category=Hair Care" onClick={handleLinkClick}>
              Hair care
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={handleLinkClick}>
              all products
            </Link>
          </li>
          <li>
            <Link to="/reviews" onClick={handleLinkClick}>
              Reviews
            </Link>
          </li>
          <li>
            <Link to="/aboutus" onClick={handleLinkClick}>
              about us
            </Link>
          </li>
        </ul>
        <div className="cart-account">
          {user && user.avatar ? (
            <li className="account-menu">
              {isAuthenticated && (
                <AccountMenu user={user} handleLinkClick={setClick} />
              )}
            </li>
          ) : (
            <>
              <li className="account-menu">
                <Link to="/login" onClick={handleLinkClick}>
                  <Box>
                    <Tooltip title="Login / Register">
                      <IconButton size="small" sx={{ ml: 2 }}>
                        <Avatar
                          sx={{
                            width: "2.5vmax !important",
                            height: "2.5vmax !important",
                            "@media screen and (min-width: 900px)and (max-width: 1200px)":
                              {
                                width: "4vmax !important",
                                height: "4vmax !important",
                              },
                            "@media screen and (max-width: 900px)": {
                              // width: 35,
                              // height: 35,
                              width: "6vmax !important",
                              height: "6vmax !important",
                            },
                          }}
                        >
                          <img
                            src={UserDummy}
                            width="25"
                            height="25"
                            alt="404"
                          />
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Link>
              </li>
            </>
          )}
          <li className="cart-menu">
            <Link to="/cart">
              <span className="cartImage">
                <img src={shoppingCart} alt="404" />
              </span>
              <span className="cartBadge">{numOfItemsInCart}</span>
            </Link>
          </li>
        </div>
      </div>
      <div className="followUsDiv">
        <h2>
          FOLLOW US <ArrowRightIcon />
        </h2>
        <ul className="followUsChild">
          <Link
            to="https://www.youtube.com/@ExtractBeautyCare/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MuiButton
              className={headerClasses.socialMediaButton}
              variant="outlined"
              startIcon={<YouTubeIcon />}
              style={{ color: "#cd201f", borderColor: "#cd201f" }}
            >
              YouTube
            </MuiButton>
          </Link>

          <Link to="/" target="_blank" rel="noopener noreferrer">
            <MuiButton
              className={headerClasses.socialMediaButton}
              variant="outlined"
              startIcon={<FacebookIcon />}
              style={{ color: "#3b5998", borderColor: "#3b5998" }}
            >
              Facebook
            </MuiButton>
          </Link>
          <Link
            to="https://www.instagram.com/extractbeautycare/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MuiButton
              className={headerClasses.socialMediaButton}
              variant="outlined"
              startIcon={<InstagramIcon />}
              style={{ color: "#833AB4", borderColor: "#833AB4" }}
            >
              Instagram
            </MuiButton>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;

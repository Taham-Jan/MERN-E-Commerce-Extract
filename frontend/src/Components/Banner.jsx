import React from "react";
import styles from "../Styles/Header.module.css";
import animationStyles from "./Extracss/BannerHeadingCss.module.css";
import SearchFunction from "./SearchFunction";
import BannerPng from "../Assets/BannerPng.png";
const Banner = () => {
  return (
    <aside className={styles.MainBanner}>
      <div className={styles.ChildBanner}>
        <svg className={styles.cirlea} height="160" width="160">
          <circle cx="80" cy="80" r="80" />
        </svg>
        <svg className={styles.cirleb} height="60" width="60">
          <circle cx="30" cy="30" r="30" />
        </svg>
        <svg className={styles.cirlec} height="600" width="600">
          <circle cx="300" cy="300" r="300" />
        </svg>
        <svg className={styles.cirled} height="60" width="60">
          <circle cx="30" cy="30" r="30" />
        </svg>
            <div className={styles.childWrapper}>
          <div className={animationStyles.animatedText}>
            <h1>
              <span>Discover</span>
              <span>the</span>
              <span>Beauty</span>
              <span>Within</span>
              <span>You</span>
              <hr />
              <span>Shop</span>
              <span>Our</span>
              <span>Cosmetics</span>
              <span>Collection,</span>
              <span>Today!</span>
              {/* <span>the</span>
            <span>limits</span>
            <span>you</span>
            <span>place</span>
            <span>on</span>
            <span>your</span>
            <span>own</span>
            <span>thinking.</span> */}
            </h1>
          </div>
          {/* <a href="#productContainer"></a> */}
          {/* <SearchFunction/> */}
        </div>
        <div className={styles.BannerWrapper}>
          <div className={styles.ball}>
            <img alt="404" src={BannerPng} />
          </div>
        </div>

      </div>
      {/* </div> */}
    </aside>
  );
};

export default Banner;

import React from "react";
import styles from "../Styles/AboutUs.module.css";
import banner from "../Assets/BannerPng.png";
import { GiArrowDunk } from "react-icons/gi";
const AboutUs = () => {
  return (
    <>
      <svg className={styles.cirlea} height="600" width="600">
        <circle cx="300" cy="300" r="300" />
      </svg>
      <svg className={styles.cirleb} height="600" width="600">
        <circle cx="200" cy="200" r="200" />
      </svg>

      <div className={styles.AboutUsHeading}>
        <h2>About EXTRACT BEAUTY CARE (PRIVATE) LIMITED</h2>
      </div>
      <div className={styles.AboutUsContainer}>
        <div className={styles.AboutUsContent}>
          <h4>
            <GiArrowDunk />
            Who We Are
          </h4>
          <p>
            Welcome to Extract Beauty Care (Private) Limited! At Extract Beauty
            Care, we believe that every individual deserves to look and feel
            their best. We are a leading brand in the field of skin care
            products, dedicated to providing high-quality and effective
            solutions that enhance natural beauty and promote healthy skin.
            Extract Beauty Care was founded with a passion for skincare and a
            commitment to delivering products that make a real difference. We
            understand that each person's skin is unique, and that's why we
            offer a diverse range of products tailored to various skin types and
            concerns.
          </p>
          <h4>
            <GiArrowDunk />
            MISSION
          </h4>
          <p>
            Our mission at Extract Beauty Care is to empower individuals to
            embrace their unique beauty and nurture their skin with the highest
            quality skin care products. We are committed to delivering
            innovative solutions that enhance skin health and promote
            confidence. We strive to make a positive impact on our customers'
            lives by providing them with effective, safe, and sustainable beauty
            care options.
          </p>
          <h4>
            <GiArrowDunk />
            VISION
          </h4>
          <p>
            Our vision is to become a globally recognized brand that sets the
            standard for excellence in skin care. We aim to continuously
            innovate and develop breakthrough formulations that address the
            evolving needs of our customers. We aspire to inspire a culture of
            self-care and self-love, where individuals feel empowered to
            prioritize their skin health and embrace their natural beauty.
            Through our commitment to quality, sustainability, and customer
            satisfaction, we envision becoming a trusted companion on every
            individual's journey to healthier, more radiant skin.
          </p>
          <h4>
            <GiArrowDunk />
            COMITMENTS
          </h4>

          <ul>
            <p>At Extract Beauty Care, we are committed to :</p>
            <li>
              <span>Quality : </span>We are dedicated to producing skin care
              products of the highest quality, formulated with carefully
              selected ingredients and backed by scientific research. We ensure
              that our products meet rigorous standards and deliver the results
              they promise.
            </li>
            <li>
              <span>Innovation : </span> We constantly strive to stay at the
              forefront of skincare innovation. Our team of experts continuously
              explores new ingredients, technologies, and formulations to
              develop cutting-edge products that address the evolving needs of
              our customers.
            </li>
            <li>
              <span>No Harmful Substances : </span>
              Our formulations are free from harmful substances. We believe in
              creating products that are gentle on the skin and minimize the
              risk of adverse reactions.
            </li>
            <li>
              <span>Sustainability : </span> We are passionate about minimizing
              our impact on the environment. We are committed to implementing
              sustainable practices throughout our operations, from ingredient
              sourcing to packaging. We strive to reduce waste, promote
              eco-friendly alternatives, and support initiatives that protect
              and preserve our planet.
            </li>
            <li>
              <span>Customer Satisfaction : </span> Our customers are at the
              heart of everything we do. We are dedicated to providing
              exceptional customer service and ensuring that our customers have
              a positive experience with our products. We value their feedback
              and continually strive to exceed their expectations.
            </li>
            <li>
              <span>Ethical Standards : </span>
              We uphold the highest ethical standards in all aspects of our
              business. We are committed to conducting our operations with
              integrity, transparency, and respect for all stakeholders,
              including our employees, customers, suppliers, and the communities
              we serve.
            </li>
            <div className={styles.quote}>
              <p>
        
                “Our commitment to providing safe and beneficial skincare
                products is unwavering. We believe that everyone deserves access
                to high-quality skincare solutions that promote healthy and
                radiant skin, and we are dedicated to delivering on that
                promise.”
              </p>
            </div>
          </ul>
        </div>
        <div className={styles.imageMask}>
          <img src={banner} alt="404" />
          <img src={banner} alt="404" />
          <img src={banner} alt="404" />
        </div>
      </div>
    </>
  );
};

export default AboutUs;

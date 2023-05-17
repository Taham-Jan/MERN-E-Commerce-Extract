import React, { useState } from "react";
import MetaData from "./MetaData";
import styles from "../Styles/SearchFunction.module.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const SearchFunction = () => {
  let navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
        navigate("/products");
    }
  };

  return (
    <>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className={styles.flexrow} onSubmit={searchSubmitHandler}>
        <input
          type="text"
          className={styles.input}
          placeholder="Search your desired Product... "
          onChange={(e) => setKeyword(e.target.value)}
          autoComplete="off"
        />
        {console.log(keyword)}
        {/* <button type="submit">click</button> */}
        <label className={styles.label}  htmlFor="search" type="submit">
          <span>
            <FaSearch alt="" width="25" height="25" />
          </span>
          <label className={styles.placeholder}>Search</label>
        </label>
        <button id="search" type="submit" hidden />
      </form>
    </>
  );
};

export default SearchFunction;

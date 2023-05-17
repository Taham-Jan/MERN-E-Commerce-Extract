import React, { useEffect } from "react";
import Banner from "../Components/Banner";
import styles from "../Styles/HomeScreen.module.css";
import ProductCard from "../Components/ProductCard";
import stylesProduct from "../Styles/ProductCard.module.css";
import MetaData from "../Components/MetaData";
import * as productActions from "../Actions/product";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Components/Spinner";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import MyButton from '../Components/Customs/muiButton'

const HomeScreen = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(productActions.clearErrors());
    }

    dispatch(productActions.getProduct());
  }, [dispatch, error, alert]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <MetaData title="Extract" />
          <div className={styles.BannerBackground}>
            <Banner />
          </div>
          <div className={stylesProduct.productHeadings}>
            <h2><span>TOP RATED PRODUCTS</span></h2>
            </div>
            <div className={stylesProduct.WrapperProduct}>

            {error ? (
              <p>error:{error}</p>
            ) : (
              <div className={stylesProduct.main} id="productContainer">
                {products
                  .sort((a, b) => b.ratings - a.ratings)
                  .slice(0, 4)
                  .map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            )}
            
            <Link to="/products" >
              <MyButton text='Explore more products'  endIcon={<SendIcon />}/>

            </Link>
            </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;

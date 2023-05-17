import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../Actions/product";
import ProductCard from "./ProductCard";
import styles from "../Styles/AllProductsPage.module.css";
import { useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useAlert } from "react-alert";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Button, makeStyles } from "@material-ui/core";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
const categories = ["Skin Care", "Hair Care"];

const AllProducts = () => {
  const useStyles = makeStyles((theme) => ({
    radioLabel: {
      "& .MuiTypography-body1": {
        fontSize: "14px !important",
        [theme.breakpoints.down("sm")]: {
          fontSize: "2vmax !important",
        },
        [theme.breakpoints.between("sm", "md")]: {
          fontSize: "1.3vmax !important",
        },
      },
      "& .MuiSvgIcon-root": {
        width: "16px !important",
        height: "16px !important",
        padding: "0 !important",
        color: "var(--hovercolor) !important",
        [theme.breakpoints.down("sm")]: {
          width: "12px !important",
          height: "12px !important",
        },
      },
    },
    mainRadioGroup: {
      width: "100% !important",
    },
    categorySelect: {
      width: "10rem !important",
    },
  }));
  const classes = useStyles();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = React.useState([0, 10000]);
  const [category, setCategory] = useState("");
  const location = useLocation();

  const setCurrentPageNo = (event, value) => {
    setCurrentPage(value);
  };
  const {
    products,
    loading,
    error,
    productCount,
    resultPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get("category");
    setCategory(categoryParam || "");
  }, [location]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, keyword, currentPage, price, category, alert, error]);

  let count = filteredProductCount;

  const pageCount = isNaN(productCount / resultPerPage)
    ? 0
    : Math.ceil(productCount / resultPerPage);

  const handlePriceRangeChange = (event) => {
    const priceRange = event.target.value;
    switch (priceRange) {
      case "100 - 3000":
        setPrice([100, 3000]);
        break;
      case "3001 - 6000":
        setPrice([3001, 6000]);
        break;
      case "6001 - 9000":
        setPrice([6001, 9000]);
        break;
      case "9001 - 10000":
        setPrice([9001, 10000]);
        break;
      default:
        setPrice([0, 10000]);
        break;
    }
  };
  const resetFilter = (e) => {
    setPrice([0, 10000]);
    setCategory("");
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2 className={styles.productsHeading}>ALL PRODUCT'S</h2>
          <div className={styles.allProducts}>
            <div className={styles.filterBox}>
              <h2>FILTER</h2>
              <Typography sx={{ fontSize: "1vmax", opacity: "0.7" }}>
                Sort by price range
              </Typography>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <FormControl
                  variant="outlined"
                  className={classes.mainRadioGroup}
                >
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={`${price[0]} - ${price[1]}`}
                    name="radio-buttons-group"
                    onChange={handlePriceRangeChange}
                    classes={{
                      root: styles.radioGroupRoot,
                      row: styles.radioGroupRow,
                    }}
                  >
                    <FormControlLabel
                      className={classes.radioLabel}
                      value="0 - 10000"
                      control={<Radio />}
                      label="Show All"
                    />
                    <FormControlLabel
                      className={classes.radioLabel}
                      value="100 - 3000"
                      control={<Radio />}
                      label="100 - 3000"
                    />
                    <FormControlLabel
                      className={classes.radioLabel}
                      value="3001 - 6000"
                      control={<Radio />}
                      label="3001 - 6000"
                    />
                    <FormControlLabel
                      className={classes.radioLabel}
                      value="6001 - 9000"
                      control={<Radio />}
                      label="6001 - 9000"
                    />
                    <FormControlLabel
                      className={classes.radioLabel}
                      value="9001 - 10000"
                      control={<Radio />}
                      label="9001 - 10000"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Typography sx={{ fontSize: "1vmax", opacity: "0.7" }}>
                Sort by category
              </Typography>

              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                className={styles.categoryLabel}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  label="category"
                  className={styles.categoryBox}
                >
                  <MenuItem value="">
                    <p className={styles.categoryLink}>Show all</p>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem
                      key={category}
                      value={category}
                      className={styles.categoryLink}
                    >
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {filteredProductCount && filteredProductCount > 0 ? (
              <div className={styles.products}>
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.6vmax",
                    fontFamily: "'Montserrat',san-serif",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.171)",
                    padding: "1vmax",
                    fontWeight: "500",
                  }}
                >
                  Oops! It looks like we're fresh out of products in that
                  category.
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.2vmax",
                    fontFamily: "'Montserrat',san-serif",
                    fontWeight: "500",
                  }}
                >
                  Please check back soon or browse our other fabulous
                  collections.
                </Typography>

                <Button
                  onClick={resetFilter}
                  style={{
                    transition: "all 0.5s",
                    fontFamily: "'Montserrat',sans-serif",
                    padding: "0.8em 1.3em",
                    fontWeight: "700",
                    width: "max-content",
                    backgroundColor: "var(--ThemeColor) ",
                    maxWidth: "max-content",
                    marginTop:"1em",
                    color: "#242424 ",
                  }}
          
                >
                  See All products
                </Button>
              </div>
            )}
          </div>

          {resultPerPage < count && (
            <div className={styles.paginationBox}>
              <Stack spacing={2}>
                <Pagination
                  page={currentPage}
                  onChange={setCurrentPageNo}
                  count={pageCount}
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AllProducts;

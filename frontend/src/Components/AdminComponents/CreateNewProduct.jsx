import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../Actions/product";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { NEW_PRODUCT_RESET } from "../../Constants/product";
import { useNavigate } from "react-router-dom";
import styles from "./CreateNewProduct.module.css";
import * as Yup from "yup";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PercentIcon from "@mui/icons-material/Percent";
import { LoadingButton } from "@mui/lab";

const CreateNewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  const [formErrors, setFormErrors] = useState({});
  const createNewProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive")
      .integer("Price must be an integer"),
    category: Yup.string().required("Category is required"),
    stock: Yup.number()
      .required("Stock is required")
      .integer("Stock must be an integer")
      .min(1, "Stock must be at least 1"),
    image: Yup.mixed().when("isRequired", {
      is: true,
      then: Yup.mixed().required("Image is required"),
    }),
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState({
    basicDescription: "",
    KeyBenefits: "",
    howToUse: "",
    cautions: "",
    ingredients: "",
    faq: "",
  });
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);

  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const [salePercentage, setSalePercentage] = useState(0);
  const [saleEndDate, setSaleEndDate] = useState(null);
  const [saleStartDate, setSaleStartDate] = useState(null);


  // const SaleSchema = Yup.object().shape({
  //   salePercentage: Yup.number().when(['saleEndDate', 'saleStartDate'], (saleEndDate, saleStartDate, schema) => {
  //     return saleEndDate || saleStartDate ? schema.required('Sale percentage is required').min(1, 'Sale percentage must be greater than 0') : schema;
  //   }),
  //   saleEndDate: Yup.date().nullable().when(['salePercentage'], (salePercentage, schema) => {
  //     return salePercentage && salePercentage > 0 ? schema.required('Sale end date is required').min(new Date(), 'Sale end date must be in the future') : schema;
  //   }),
  //   saleStartDate: Yup.date().nullable().when(['salePercentage'], (salePercentage, schema) => {
  //     return salePercentage && salePercentage > 0 ? schema.required('Sale start date is required').min(new Date(), 'Sale start date must be in the future') : schema;
  //   })
  // });
  const categories = ["Skin Care", "Hair Care"];

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = async (e) => {
    e.preventDefault();
    
    try {
      await createNewProductSchema.validate(
        { name, price, category, stock, image },
        { abortEarly: false }
      );

      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("price", price);
      myForm.append(
        "description.basicDescription",
        description.basicDescription
      );
      myForm.append("description.KeyBenefits", description.KeyBenefits);
      myForm.append("description.howToUse", description.howToUse);
      myForm.append("description.cautions", description.cautions);
      myForm.append("description.ingredients", description.ingredients);
      myForm.append("description.faq", description.faq);
      myForm.set("category", category);
      myForm.set("stock", stock);
      if (salePercentage) {
        myForm.set("salePercentage", salePercentage);
      }
      if (saleEndDate) {
        myForm.set("saleEndDate", saleEndDate);
      }
      if (saleStartDate) {
        myForm.set("saleStartDate", saleStartDate);
      }
      image.forEach((img) => {
        myForm.append("image", img);
      });
      dispatch(createProduct(myForm));
    } catch (err) {
      const errors = {};
      err.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setFormErrors(errors);
      console.log(errors);
    }
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImage([]);
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImage((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div className={styles.newProductContainer}>
        <div className={styles.newProductBox}>
          <form
            className={styles.createProductForm}
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>
            <div>
              <p>Enter Your Product Name </p>
              {formErrors.name && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.name}
                </section>
              )}
            </div>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                className={formErrors.name ? `${styles.redBorder}` : ""}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <p>Enter Product Price </p>
              {formErrors.price && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.price}
                </section>
              )}
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                className={formErrors.price ? `${styles.redBorder}` : ""}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <p>Enter Sale Percentage </p>
            </div>
            <div>
              {formErrors.salePercentage && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.salePercentage}
                </section>
              )}
              <PercentIcon />
              <input
                type="number"
                placeholder="salePercentage"
                min="0"
                max="100"
                onChange={(e) => {
                  setSalePercentage(e.target.value);
             
                }}
              />
            </div>

            <div>
              <p>Enter Sale Start Date </p>
              {formErrors.saleStartDate && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.saleStartDate}
                </section>
              )}
            </div>
            <div>
              <SpellcheckIcon />
              <input
                type="datetime-local"
                onChange={(e) => {
                  setSaleStartDate(e.target.value);
     
                }}
              />
            </div>
            <div>
              <p>Enter Sale End Date </p>
              {formErrors.saleEndDate && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.saleEndDate}
                </section>
              )}
            </div>
            <div>
              <SpellcheckIcon />
              <input
                type="datetime-local"
                onChange={(e) => {
                  setSaleEndDate(e.target.value);
                }}
              />
            </div>
            <div>
              <p>Enter Product's Description </p>
              {formErrors.description &&
                formErrors.description.basicDescription && (
                  <section className={styles.errorMsg}>
                    <ErrorOutlineIcon />{" "}
                    {formErrors.description.basicDescription}
                  </section>
                )}
            </div>
            <div>
              <SpellcheckIcon />
              <textarea
                id="basicDescription"
                value={description.basicDescription}
                required
                className={
                  formErrors.description &&
                  formErrors.description.basicDescription
                    ? `${styles.redBorder}`
                    : ""
                }
                onChange={(e) =>
                  setDescription({
                    ...description,
                    basicDescription: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div>
              <p>Enter Product's Key Benefits</p>
              {formErrors.loginPassword && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.loginPassword}
                </section>
              )}
            </div>
            <div>
              <textarea
                id="KeyBenefits"
                value={description.KeyBenefits}
                onChange={(e) =>
                  setDescription({
                    ...description,
                    KeyBenefits: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div>
              <p>Enter Product's How To Use</p>
              {formErrors.loginPassword && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.loginPassword}
                </section>
              )}
            </div>
            <div>
              <textarea
                id="howToUse"
                value={description.howToUse}
                onChange={(e) =>
                  setDescription({ ...description, howToUse: e.target.value })
                }
              ></textarea>
            </div>
            <div>
              <p>Enter Product's Cautions</p>
              {formErrors.loginPassword && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.loginPassword}
                </section>
              )}
            </div>
            <div>
              <textarea
                id="cautions"
                value={description.cautions}
                onChange={(e) =>
                  setDescription({ ...description, cautions: e.target.value })
                }
              ></textarea>
            </div>
            <div>
              <p>Enter Product's Ingredients</p>
              {formErrors.loginPassword && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.loginPassword}
                </section>
              )}
            </div>
            <div>
              <textarea
                id="ingredients"
                value={description.ingredients}
                onChange={(e) =>
                  setDescription({
                    ...description,
                    ingredients: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div>
              <p>Enter Product's FAQ's</p>
              {formErrors.loginPassword && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.loginPassword}
                </section>
              )}
            </div>
            <div>
              <textarea
                id="faq"
                value={description.faq}
                onChange={(e) =>
                  setDescription({ ...description, faq: e.target.value })
                }
              ></textarea>
            </div>
            <div>
              <p>Enter Your Product Category </p>
              {formErrors.category && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.category}
                </section>
              )}
            </div>
            <div>
              <AccountTreeIcon />
              <select
                onChange={(e) => setCategory(e.target.value)}
                className={formErrors.category ? `${styles.redBorder}` : ""}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p>Enter Your Product Stock</p>
              {formErrors.stock && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.stock}
                </section>
              )}
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="stock"
                required
                className={formErrors.stock ? `${styles.redBorder}` : ""}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <p>Select Images & Videos of product</p>
              {formErrors.image && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.image}
                </section>
              )}
            </div>
            <div id={styles.createProductFormFile}>
              <input
                type="file"
                name="avatar"
                className={formErrors.image ? `${styles.redBorder}` : ""}
                accept="image/*, video/*, video/mp4"
                onChange={createProductImagesChange}
                required
                multiple
              />
            </div>
            <div id={styles.createProductFormImage}>
              {imagePreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <LoadingButton
              id={styles.createProductBtn}
              type="submit"
              sx={{
                backgroundColor: 'var(--ThemeColor) !important',
                color: '#242424 !important',
                fontFamily: 'Montserrat !important',
                '&:hover': {
                  backgroundColor: 'orange !important',
                  color: '#fff !important',
                },
              }}
              // endIcon={<ErrorOutlineIcon />}
              loading={loading}
              loadingPosition="center"
              variant="contained"
            >
              <span>CREATE PRODUCT</span>
            </LoadingButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNewProduct;

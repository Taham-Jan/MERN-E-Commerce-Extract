import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../Actions/product";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { UPDATE_PRODUCT_RESET } from "../../Constants/product";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./CreateNewProduct.module.css";
import * as Yup from "yup";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PercentIcon from "@mui/icons-material/Percent";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

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
  const descriptionSchema = Yup.object().shape({
    basicDescription: Yup.string().required("Basic description is required"),
    KeyBenefits: Yup.string(),
    howToUse: Yup.string(),
    cautions: Yup.string(),
    ingredients: Yup.string(),
    faq: Yup.string(),
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
  const [oldImage, setOldImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [salePercentage, setSalePercentage] = useState(0);
  // const [saleEndDate, setSaleEndDate] = useState(null);
  // const [saleStartDate, setSaleStartDate] = useState(null);
  const [saleEndDate, setSaleEndDate] = useState("");
  const [saleStartDate, setSaleStartDate] = useState("");
  const categories = ["Skin Care", "Hair Care"];

  const productId = id;

  useEffect(() => {
    console.log("end Date", product.saleEndDate);
    console.log("Start Date", product.saleStartDate);
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      // setDescription(product.description);
      setDescription((prevDescription) => ({
        ...prevDescription,
        basicDescription: product.description.basicDescription,
        KeyBenefits: product.description.KeyBenefits,
        howToUse: product.description.howToUse,
        cautions: product.description.cautions,
        ingredients: product.description.ingredients,
        faq: product.description.faq,
      }));
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImage(product.image);
      setSalePercentage(product.salePercentage);
      setSaleEndDate(
        product.saleEndDate
          ? new Date(product.saleEndDate).toISOString().slice(0, 16)
          : ""
      );
      setSaleStartDate(
        product.saleStartDate
          ? new Date(product.saleStartDate).toISOString().slice(0, 16)
          : ""
      );
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      dispatch(getProductDetails(productId));
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await createNewProductSchema.validate(
        { name, price, category, stock, image },
        { abortEarly: false }
      );
      await descriptionSchema.validate(description);
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

      myForm.set("saleEndDate", saleEndDate);

      myForm.set("saleStartDate", saleStartDate);

      image.forEach((image) => {
        myForm.append("image", image);
      });
      dispatch(updateProduct(productId, myForm));
    } catch (err) {
      const errors = {};
      err.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setFormErrors(errors);
    }
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImage([]);
    setImagePreview([]);
    setOldImage([]);

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
  const buttonStyles = {
    cursor: loading ? "not-allowed" : "default",
  };
  return (
    <>
      <div className={styles.newProductContainer}>
        <div className={styles.newProductBox}>
          <form
            className={styles.createProductForm}
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>
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
                // required
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
                // required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
            <div>
              <p>Enter Sale Percentage </p>
              {formErrors.loginPassword && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.loginPassword}
                </section>
              )}
            </div>
            <div>
              <PercentIcon />
              <input
                type="number"
                placeholder="salePercentage"
                min="0"
                max="100"
                value={salePercentage}
                onChange={(e) => setSalePercentage(e.target.value)}
              />
            </div>
            <div>
              <p>Enter Sale Start Date </p>
              {formErrors.loginPassword && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.loginPassword}
                </section>
              )}
            </div>
            <div>
              <SpellcheckIcon />

              <input
                type="datetime-local"
                value={saleStartDate}
                onChange={(e) => setSaleStartDate(e.target.value)}
              />
            </div>
            <div>
              <p>Enter Sale End Date </p>
              {formErrors.loginPassword && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.loginPassword}
                </section>
              )}
            </div>
            <div>
              <SpellcheckIcon />

              <input
                value={saleEndDate}
                type="datetime-local"
                onChange={(e) => setSaleEndDate(e.target.value)}
              />
            </div>
            <div>
              <p>Enter Product's Description </p>
              {formErrors.description && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.description}
                </section>
              )}
            </div>
            <div>
              <SpellcheckIcon />
              <textarea
                id="basicDescription"
                value={description.basicDescription}
                className={formErrors.description ? `${styles.redBorder}` : ""}
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
                value={category}
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
                value={stock}
                // required
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
                onChange={updateProductImagesChange}
                multiple
              />
            </div>
            <div id={styles.createProductFormImage}>
              {oldImage &&
                oldImage.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id={styles.createProductFormImage}>
              {imagePreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            <button
              id={styles.createProductBtn}
              type="submit"
              style={buttonStyles}
              disabled={loading ? true : false}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;

import * as actionTypes from "../Constants/cart";
  import axios from "axios";
  
  // Add to Cart
  export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
  
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.isSaleActive ? data.product.salePrice : data.product.price,
        // price: data.product.price,
        image: data.product.image[0].url,
        stock: data.product.stock,
        category: data.product.category,
        quantity,
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
  // REMOVE FROM CART
  export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: actionTypes.REMOVE_CART_ITEM,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
  // SAVE SHIPPING INFO
  export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: actionTypes.SAVE_SHIPPING_INFO,
      payload: data,
    });
  
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };
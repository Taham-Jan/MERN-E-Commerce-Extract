import * as actionTypes from "../Constants/product";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.ALL_PRODUCT_REQUEST:
    case actionTypes.ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case actionTypes.ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productCount: action.payload.productCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductCount: action.payload.filteredProductCount,
      };
    case actionTypes.ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case actionTypes.ALL_PRODUCT_FAIL:
    case actionTypes.ADMIN_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case actionTypes.PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case actionTypes.PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case actionTypes.NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.DELETE_PRODUCT_REQUEST:
    case actionTypes.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case actionTypes.DELETE_PRODUCT_FAIL:
    case actionTypes.UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case actionTypes.UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const getAllProductsReviews = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case actionTypes.ALL_PRODUCT_REVIEW_REQUEST:
      return { loading: true, reviews: [] };
    case actionTypes.ALL_PRODUCT_REVIEW_SUCCESS:
      return { loading: false, reviews: action.payload.reviews };
    case actionTypes.ALL_PRODUCT_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case actionTypes.NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case actionTypes.ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case actionTypes.ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case actionTypes.DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

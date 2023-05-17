import * as actionTypes from "../Constants/user";
  
  export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case actionTypes.LOGIN_REQUEST:
      case actionTypes.REGISTER_USER_REQUEST:
      case actionTypes.LOAD_USER_REQUEST:
        return {
          loading: true,
          isAuthenticated: false,
        };
      case actionTypes.LOGIN_SUCCESS:
      case actionTypes.REGISTER_USER_SUCCESS:
      case actionTypes.LOAD_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
        };
  
      case actionTypes.LOGOUT_SUCCESS:
        return {
          loading: false,
          user: null,
          isAuthenticated: false,
        };
      case actionTypes.LOGIN_FAIL:
      case actionTypes.REGISTER_USER_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
  
      case actionTypes.LOAD_USER_FAIL:
        return {
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
  
      case actionTypes.LOGOUT_FAIL:
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
  
  export const profileReducer = (state = {}, action) => {
    switch (action.type) {
      case actionTypes.UPDATE_PROFILE_REQUEST:
      case actionTypes.UPDATE_PASSWORD_REQUEST:
      case actionTypes.UPDATE_USER_REQUEST:
      case actionTypes.DELETE_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case actionTypes.UPDATE_PROFILE_SUCCESS:
      case actionTypes.UPDATE_PASSWORD_SUCCESS:
      case actionTypes.UPDATE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
  
      case actionTypes.DELETE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload.success,
          message: action.payload.message,
        };
  
      case actionTypes.UPDATE_PROFILE_FAIL:
      case actionTypes.UPDATE_PASSWORD_FAIL:
      case actionTypes.UPDATE_USER_FAIL:
      case actionTypes.DELETE_USER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case actionTypes.UPDATE_PROFILE_RESET:
      case actionTypes.UPDATE_PASSWORD_RESET:
      case actionTypes.UPDATE_USER_RESET:
        return {
          ...state,
          isUpdated: false,
        };
  
      case actionTypes.DELETE_USER_RESET:
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
  
  export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
      case actionTypes.FORGOT_PASSWORD_REQUEST:
      case actionTypes.RESET_PASSWORD_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case actionTypes.FORGOT_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
  
      case actionTypes.RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          success: action.payload,
        };
  
      case actionTypes.FORGOT_PASSWORD_FAIL:
      case actionTypes.RESET_PASSWORD_FAIL:
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
  
  export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
      case actionTypes.ALL_USERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case actionTypes.ALL_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          users: action.payload,
        };
  
      case actionTypes.ALL_USERS_FAIL:
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
  
  export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case actionTypes.USER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case actionTypes.USER_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
  
      case actionTypes.USER_DETAILS_FAIL:
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
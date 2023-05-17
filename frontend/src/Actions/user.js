import * as actionTypes from "../Constants/user";
import axios from "axios";

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/register`, userData, config);

    dispatch({ type: actionTypes.REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.LOAD_USER_REQUEST });

    const { data } = await axios.get(`/api/v1/me`);

    dispatch({ type: actionTypes.LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: actionTypes.LOAD_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);

    dispatch({ type: actionTypes.LOGOUT_SUCCESS });
   

  } catch (error) {
    dispatch({
      type: actionTypes.LOGOUT_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/me/update`, userData, config);

    dispatch({
      type: actionTypes.UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_PROFILE_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/update`,
      passwords,
      config
    );

    dispatch({
      type: actionTypes.UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {

    dispatch({
      type: actionTypes.UPDATE_PASSWORD_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/password/forgot`, email, config);

    dispatch({
      type: actionTypes.FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FORGOT_PASSWORD_FAIL,
      payload: error.response.data.error,

    });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({
      type: actionTypes.RESET_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.RESET_PASSWORD_FAIL,
      payload: error.response.data.error,
    });
  }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ALL_USERS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/users`);

    dispatch({ type: actionTypes.ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: actionTypes.ALL_USERS_FAIL,
      payload: error.response.data.error,
    });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({ type: actionTypes.USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: actionTypes.USER_DETAILS_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: actionTypes.UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({ type: actionTypes.DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
};

const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const dotenv = require("dotenv").config();
const env = require("../util/validateEnv");

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      next(createHttpError(401, "USER NOT AUTHENTICATED"));
    }
    const decodedData = jwt.verify(token, env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    next(error);
  }
};

exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
     next(
        createHttpError(
          403,
          `Role: ${req.user.role} is not authorized to access this resource...`
        )
      );
    }
    next();
  };
 
};

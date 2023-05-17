const createHttpError = require("http-errors");
const User = require("../Models/user");
const sendToken = require("../util/jwtToken");
const sendEmail = require("../util/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.registerUser = async (req, res, next) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw createHttpError(400, "User Input Fields Missing!");
    }
    if(password.length < 8)
    {      
      throw createHttpError(400, "Password must be of atleast 8 characters");
    }
    const existingEmail = await User.findOne({ email: email }).exec();

    if (existingEmail) {
      throw createHttpError(
        409,
        "EMAIL ADDRESS ALREADY EXIST, USE ANOTHER EMAIL!"
      );
    }
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw createHttpError(400, "Login Input Fields Missing!");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw createHttpError(401, "Invalid credentials!");
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      throw createHttpError(401, "Invalid credentials!");
    }
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({ success: true, message: "Logged Out" });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw createHttpError(404, "User not found!");
    }

    //GET RESETPASSWORD TOKEN
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeForSave: false });
    // const resetPasswordUrl = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/password/reset/${resetToken}`;
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message = `Your password reset token is : \n\n${resetPasswordUrl}\n\n if you have not requested this then please ignore it.`;

    try {
      await sendEmail({
        email: user.email,
        subject: `Extract Password Recovery`,
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeForSave: false });
      throw createHttpError(404, error.message);
    }
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      throw createHttpError(400, "Reset Password Token Is Invalid Or Expired!");
    }
    if (req.body.password !== req.body.confirmPassword) {
      throw createHttpError(400, "Password Donot Match!");
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
      throw createHttpError(400, "Enter correct previous password!");
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      throw createHttpError(400, "Password donot match!");
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
      const imageId = user.avatar.public_id;
      await cloudinary.v2.uploader.destroy(imageId);
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};
exports.getUserDetailsAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw createHttpError(404, `User not found with the id ${req.params.id}`);
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateUserAdmin = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
exports.DeleteUserAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw createHttpError(404, `User not found with the id ${req.params.id}`);
    }
    await user.deleteOne();
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

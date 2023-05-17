import React, { useRef, useState, useEffect } from "react";
import styles from "../../Styles/UserRegistration.module.css";
import Spinner from "../Spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import BadgeIcon from "@mui/icons-material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../Actions/user";
import { useAlert } from "react-alert";
import UserDummy from "../../Assets/User.png";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { IconButton, InputAdornment } from "@material-ui/core";
import { Button as MuiButton } from "@mui/material";
import * as Yup from "yup";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const LoginSignUp = () => {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState(UserDummy);
  const [avatarPreview, setAvatarPreview] = useState(UserDummy);
  const loginSchema = Yup.object().shape({
    loginEmail: Yup.string().required("Email is required"),
    loginPassword: Yup.string().required("Password is required"),
  });

  const registerSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      )
      .required(),
    password: Yup.string().min(6).required(),
  });
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginSchema.validate(
        { loginEmail, loginPassword },
        { abortEarly: false }
      );
      dispatch(login(loginEmail, loginPassword));
    } catch (err) {
      const errors = {};
      err.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setFormErrors(errors);
    }
  };

  const registerSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerSchema.validate(user, { abortEarly: false });
      const myForm = new FormData();
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("avatar", avatar);
      dispatch(register(myForm));
    } catch (err) {
      const errors = {};
      err.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setFormErrors(errors);
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const redirect = location.search ? location.search.split("=")[1] : "account";

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(`/${redirect}`);
    }
  }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add(`${styles.shiftToNeutral}`);
      switcherTab.current.classList.remove(`${styles.shiftToRight}`);

      registerTab.current.classList.remove(`${styles.shiftToNeutralForm}`);
      loginTab.current.classList.remove(`${styles.shiftToLeft}`);
    }
    if (tab === "register") {
      switcherTab.current.classList.add(`${styles.shiftToRight}`);
      switcherTab.current.classList.remove(`${styles.shiftToNeutral}`);

      registerTab.current.classList.add(`${styles.shiftToNeutralForm}`);
      loginTab.current.classList.add(`${styles.shiftToLeft}`);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.MainLoginSignUpContainer}>
            <div className={styles.LoginSignUpBox}>
              <div>
                <div className={styles.loginsignUptoggle}>
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form
                className={styles.loginForm}
                ref={loginTab}
                onSubmit={loginSubmit}
              >
                <div>
                  <p>Enter Your Email Address </p>
                  {formErrors.loginEmail && (
                    <section className={styles.errorMsg}>
                      <ErrorOutlineIcon /> {formErrors.loginEmail}
                    </section>
                  )}
                </div>

                <div className={styles.loginEmail}>
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    // required
                    className={
                      formErrors.loginEmail ? `${styles.redBorder}` : ""
                    }
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                {/* <div className={styles.loginPassword}>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div> */}
                <div>
                  <p>Enter Your Password </p>
                  {formErrors.loginPassword && (
                    <section className={styles.errorMsg}>
                      <ErrorOutlineIcon /> {formErrors.loginPassword}
                    </section>
                  )}
                </div>
                <div className={styles.loginPassword}>
                  <LockOpenIcon />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={
                      formErrors.loginPassword ? `${styles.redBorder}` : ""
                    }
                    // required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />

                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    className={styles.passwordIcon}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <MuiButton
                  type="submit"
                  value="Login"
                  disabled={loading ? true : false}
                  className={styles.loginBtn}
                >
                  Login
                </MuiButton>
              </form>
              <form
                className={styles.signUpForm}
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div>
                  <p>Enter Your Name </p>
                  {formErrors.name && (
                    <section className={styles.errorMsg}>
                      <ErrorOutlineIcon /> {formErrors.name}
                    </section>
                  )}
                </div>
                <div className={styles.signUpName}>
                  <BadgeIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    // required
                    className={formErrors.name ? `${styles.redBorder}` : ""}
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div>
                  <p>Enter Your Email Address </p>
                  {formErrors.email && (
                    <section className={styles.errorMsg}>
                      <ErrorOutlineIcon /> {formErrors.email}
                    </section>
                  )}
                </div>
                <div className={styles.signUpEmail}>
                  <MailOutlineIcon />
                  <input
                    type="text"
                    placeholder="Email"
                    // required
                    className={formErrors.email ? `${styles.redBorder}` : ""}
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                {/* <div className={styles.signUpPassword}>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div> */}
                <div>
                  <p>Enter Your Password</p>
                  {formErrors.password && (
                    <section className={styles.errorMsg}>
                      <ErrorOutlineIcon /> {formErrors.password}
                    </section>
                  )}
                </div>
                <div className={styles.signUpPassword}>
                  <LockOpenIcon />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    // required
                    className={formErrors.password ? `${styles.redBorder}` : ""}
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                  <InputAdornment position="end">
                    <IconButton
                      className={styles.passwordIcon1}
                      onClick={handleTogglePasswordVisibility}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                </div>
                <div>
                  <p>Add a profile picture </p>
                  <section className={styles.optionalMsg}>*Optional</section>
                </div>
                <div id={styles.registerImage}>
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <MuiButton
                  type="submit"
                  value="Register"
                  disabled={loading ? true : false}
                  className={styles.signUpBtn}
                >
                  Register
                </MuiButton>
                {/* <input
                  type="submit"
                  value="Register"
                  className={styles.signUpBtn}
                /> */}
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginSignUp;

import React, { useState, useEffect } from "react";
import styles from "../../Styles/UserRegistration.module.css";
import Spinner from "../Spinner";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../Actions/user";
import { useAlert } from "react-alert";


const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.passwordForget
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(userActions.forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(userActions.clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
 
          <div className={styles.LoginSignUpContainer}>
            <div className={styles.LoginSignUpBox}>
              <h2 className={styles.updateProfileHeading}>Forgot Password</h2>

              <form
                className={styles.updateProfileForm}
                onSubmit={forgotPasswordSubmit}
              >
                <div className={styles.forgotPasswordEmail}>
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className={styles.updateProfileBtn}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
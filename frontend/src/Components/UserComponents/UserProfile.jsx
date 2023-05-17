import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../MetaData";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../../Styles/UserProfile.module.css";
import { Button as MuiButton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  customButton: {
    width:"max-content !important",
    minWidth:"100% !important",
    backgroundColor: "var(--ThemeColor) !important",
    color: "#242424 !important" ,
    fontWeight: "550 ",
    padding: "0.5rem !important",
    "&:hover": {
      backgroundColor: "#f3cb6c !important",
    },
  },
});
const Profile = () => {
  const classes = useStyles();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <>
      {user && loading ? (
        <Spinner />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile`} />
          <div className={styles.profileContainer}>
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">
                <MuiButton
                  variant="contained"
                  endIcon={""}
                  className={classes.customButton}
                >
                  Edit Profile
                </MuiButton>
              </Link>
            </div>
            <hr />
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
         
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">
                  <MuiButton
                    variant="contained"
                    endIcon={""}
                    className={classes.customButton}
                  >
                    My Orders
                  </MuiButton>
                </Link>{" "}
                <Link to="/password/update">
                  <MuiButton
                    variant="contained"
                    endIcon={""}
                    className={classes.customButton}
                  >
                    Change Password
                  </MuiButton>
                </Link>
                {/* <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;

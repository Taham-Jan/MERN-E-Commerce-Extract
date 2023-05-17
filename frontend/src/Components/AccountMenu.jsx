import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logout from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Actions/user";
import { useAlert } from "react-alert";
import UserDummy from "../Assets/User.png";
import styled from "styled-components";
export default function AccountMenu({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const pfp =
    user && user.avatar && user.avatar.url ? (
      <img
        src={user.avatar.url}
        alt=""
        width={20}
        height={20}
        style={{ margin: 0 }}
      />
    ) : (
      <img src={UserDummy} alt="" width={20} height={20} />
    );

  const options = [
    { icon: pfp, name: "Profile", func: account },
    {
      icon: <ShoppingCartIcon fontSize="small" />,
      name: "Orders",
      func: orders,
    },
    { icon: <Logout fontSize="small" />, name: "Log-Out", func: logoutUser },
  ];
  if (user.role === "admin") {
    options.push({
      icon: <AdminPanelSettingsIcon fontSize="small" />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }


  function logoutUser() {
    dispatch(logout());
    alert.success("Logout successfully");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingInfo");
    window.location.reload();
  }
  const UserAvatar = styled.img`
    width: 1.5vmax !important;
    height: 1.5vmax !important;

    @media screen and (min-width: 900px) and (max-width: 1200px) {
      width: 2.5vmax !important;
      height: 2.5vmax !important;
    }
    @media screen and (max-width: 900px) {
      width: 4vmax !important;
      height: 4vmax !important;
    }
  `;
  return (
    <>
      <Box>
        <Tooltip title="Account options">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                // width: '40',
                // height: 40,
                width: "2.5vmax !important",
                height: "2.5vmax !important",
                "@media screen and (min-width: 900px)and (max-width: 1200px)": {
                  width: "4vmax !important",
                  height: "4vmax !important",
                },
                "@media screen and (max-width: 900px)": {
                  // width: 35,
                  // height: 35,
                  width: "6vmax !important",
                  height: "6vmax !important",
                },
              }}
            >
              <UserAvatar src={UserDummy} alt="404" />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {options.map((item) => (
          <MenuItem onClick={item.func} key={item.name}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

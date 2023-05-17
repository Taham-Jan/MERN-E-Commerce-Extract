import React from "react";
import { Box, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminProduct } from "../../Actions/product";
import { getAllOrders } from "../../Actions/order";
import { getAllUsers } from "../../Actions/user";
import styles from "./Dashboard.module.css";
const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
  );
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.grandTotalPrice;
    });
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverOffset: 4,
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverOffset: 4,
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  const lineOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className={styles.dashboard}>
    <div className={styles.dashboardContainer}>
      {/* <Typography >Dashboard</Typography> */}

      <div className={styles.dashboardSummary}>
        <p>
          Total Amount <br /> ₹{totalAmount}
        </p>
        <div className={styles.dashboardSummaryBox2}>
          <Link to="/admin/products">
            <p>Product</p>
            <p>{products && products.length}</p>
          </Link>
          <Link to="/admin/orders">
            <p>Orders</p>
            <p>{orders && orders.length}</p>
          </Link>
          <Link to="/admin/users">
            <p>Users</p>
            <p>{users && users.length}</p>
          </Link>
        </div>
      </div>

      <Box>
        <div sx={{ m: 2 }}>
          <Line data={lineState} options={lineOptions} />
        </div>
        <div sx={{ m: 2 }}>
          <Doughnut data={doughnutState} />
        </div>
      </Box>
    </div>
  </div>
  );
};

export default AdminDashboard;

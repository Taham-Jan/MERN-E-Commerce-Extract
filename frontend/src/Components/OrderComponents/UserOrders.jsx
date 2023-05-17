import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../Actions/order";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@mui/icons-material/Launch";
import Spinner from "../Spinner";
import moment from "moment";
import "./OrderDetails.css";
import { Button } from "@material-ui/core";

const UserOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.userOrders);
  const { user } = useSelector((state) => state.user);
  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 0.6,
      valueGetter: (params) => params.row.id,
    },
    {
      field: "createdAt",
      headerName: "Placed On.",
      minWidth: 150,
      flex: 0.5,
      valueGetter: (params) =>
        moment(params.row.createdAt).format("DD/MM/YYYY"),
    },
    {
      field: "image",
      headerName: "Product(s)",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          {params.row.image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Product"
              style={{ width: "50px", height: "50px", marginRight: "5px" }}
            />
          ))}
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 1,
      cellClassName: (params) =>
      params.value.startsWith("Delivered")? "deliveredCss" : "processingCss",
      valueGetter: (params) => {
        const updatedAt = moment(params.row.updatedAt);
        const createdAt = moment(params.row.createdAt);
        const status = params.row.status;
        if (updatedAt.isAfter(createdAt)) {
          return `${status} on ${updatedAt.format("DD/MM/YYYY hh:mm a")}`;
        } else {
          return status;
        }
      },
    },
    {
      field: "itemsQty",
      headerName: "Item quantity",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Total Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
      valueFormatter: ({ value }) => `Rs ${value}`,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "View Details",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link
            to={`/order/${params.row.id}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              size="small"
              endIcon={<LaunchIcon />}
              style={{ backgroundColor: "var(--ThemeColor)", color: "#242424" }}
            >
              Details
            </Button>
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.grandTotalPrice,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        image: item.orderItems.map((orderItems) => orderItems.image),
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="myOrdersPage">
          <h2 className="userOrdersHeading">{user.name}'s Orders</h2>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight={true}
          />
        </div>
      )}
    </>
  );
};

export default UserOrders;

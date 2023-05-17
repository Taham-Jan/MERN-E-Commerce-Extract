import { Route, Routes } from "react-router-dom";
import "./App.css";
import './Font/Ikaros.css';
import HomeScreen from "./Routes/HomeScreen";
import Footer from "./Components/Footer";
import ProductDetails from "./Components/ProductDetails";
import Header from "./Components/Header";
import AllProducts from "./Components/AllProducts";
import Cart from "./Components/Cart";
import ProtectedRoute from "./Components/ProtectedRoute";
import Shipping from "./Components/Shipping.jsx";
import UserRegistration from "./Components/UserComponents/UserRegistration";
import UserProfile from "./Components/UserComponents/UserProfile";
import UpdateProfile from "./Components/UserComponents/UpdateProfile";
import UpdatePassword from "./Components/UserComponents/UpdatePassword";
import ForgotPassword from "./Components/UserComponents/ForgotPassword";
import ResetPassword from "./Components/UserComponents/ResetPassword.jsx";
import { useEffect } from "react";
import store from "./app/store";
import { loadUser } from "./Actions/user";
import OrderConfirm from "./Components/OrderConfirm";
import UserOrders from "./Components/OrderComponents/UserOrders";
import OrderDetails from "./Components/OrderComponents/OrderDetails";
import AdminDashboard from "./Components/AdminComponents/AdminDashboard";
import AdminProductList from "./Components/AdminComponents/AdminProductList";
import { useLocation } from "react-router-dom";
import AdminSideBar from "./Components/AdminComponents/AdminSideBar";
import CreateNewProduct from "./Components/AdminComponents/CreateNewProduct";
import UpdateProduct from "./Components/AdminComponents/UpdateProduct";
import AdminOrderList from "./Components/AdminComponents/AdminOrderList";
import UpdateOrder from "./Components/AdminComponents/UpdateOrder";
import AdminUserList from "./Components/AdminComponents/AdminUserList";
import UpdateUser from "./Components/AdminComponents/UpdateUser";
import AdminReviewList from "./Components/AdminComponents/AdminReviewList";
import AllProductReviewPage from "./Components/AllProductReviewPage";
import AboutUs from "./Components/AboutUs";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const location = useLocation();
  const noHeadFoot = [
    "/admin",
    "/admin/products",
    "/admin/dashboard",
    "/admin/product",
    "/admin/orders",
    "/admin/order",
    "/admin/users",
  ];
  const shouldShowHeaderAndFooter = !noHeadFoot.some(path => location.pathname.startsWith(path));

  // const shouldShowHeaderAndFooter = !noHeadFoot.includes(location.pathname);
  return (
    <>
      {shouldShowHeaderAndFooter && <Header />}
      <div className="main-content">
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<AllProducts />} />
        <Route path="/products/:keyword" element={<AllProducts />} />
        <Route exact path="/login" element={<UserRegistration />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/reviews" element={<AllProductReviewPage />} />
        <Route exact path="/aboutus" element={<AboutUs />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          exact
          path="/account"
          element={<ProtectedRoute Component={UserProfile} />}
        />
        <Route
          exact
          path="/me/update"
          element={<ProtectedRoute Component={UpdateProfile} />}
        />
        <Route
          exact
          path="/password/update"
          element={<ProtectedRoute Component={UpdatePassword} />}
        />
        <Route
          exact
          path="/shipping"
          element={<ProtectedRoute Component={Shipping} />}
        />
        <Route
          exact
          path="/orderConfirm"
          element={<ProtectedRoute Component={OrderConfirm} />}
        />
        <Route
          exact
          path="/orders"
          element={<ProtectedRoute Component={UserOrders} />}
        />
        <Route
          exact
          path="/order/:id"
          element={<ProtectedRoute Component={OrderDetails} />}
        />
        <Route
          exact
          path="/admin"
          element={<ProtectedRoute Component={AdminSideBar} isAdmin={true} />}
        >
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute Component={AdminDashboard} isAdmin={true} />
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute Component={AdminProductList} isAdmin={true} />
            }
          />
          <Route
            path="/admin/product"
            element={
              <ProtectedRoute Component={CreateNewProduct} isAdmin={true} />
            }
          />
          <Route
            path="/admin/product/:id"
            element={
              <ProtectedRoute Component={UpdateProduct} isAdmin={true} />
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute Component={AdminOrderList} isAdmin={true} />
            }
          />
          <Route
            path="/admin/order/:id"
            element={<ProtectedRoute Component={UpdateOrder} isAdmin={true} />}
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute Component={AdminUserList} isAdmin={true} />
            }
          />

          <Route
            path="/admin/user/:id"
            element={
              <ProtectedRoute Component={UpdateUser} isAdmin={true} />
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute Component={AdminReviewList} isAdmin={true} />
            }
          />

          <Route
            path="/admin/review/:id"
            element={
              <ProtectedRoute Component={UpdateUser} isAdmin={true} />
            }
          />
        </Route>
      </Routes>
      </div>
      {shouldShowHeaderAndFooter && <Footer />}
    </>
  );
}

export default App;

//  <Route element={<ProtectedRoute />}>
//     <Route exact path="/account" element={<UserProfile />} />
//     <Route exact path="/me/update" element={<UpdateProfile />} />
//     <Route exact path="/password/update" element={<UpdatePassword />} />
//     <Route exact path="/shipping" element={<Shipping />} />
//     <Route exact path="/orderConfirm" element={<OrderConfirm />} />
//     <Route exact path="/orders" element={<UserOrders />} />
//     <Route exact path="/order/:id" element={<OrderDetails />} />
//     <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
//   </Route>
//   <Route element={<ProtectedRoute  isAdmin={true} />}>
//     <Route path="/admin/dashboard" element={<AdminDashboard />} />
//   </Route>

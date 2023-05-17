import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Routes, Route, Outlet } from "react-router-dom";
import Spinner from "./Spinner";

// const ProtectedRoute = ({ isAdmin }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);
//   function adminProtection() {
//     if (isAuthenticated === false) {
//       return <Navigate to="/login" />;
//     }
//     if (isAdmin === true && user.role !== "admin") {
//       return <Navigate to="/login" />;
//     } else {
//       return <Outlet />;
//     }
//   }
//   return (
//     // <>
//     //   {loading === false &&
//     //     (isAuthenticated === false ? <Navigate to="/login" /> : <Outlet />)}
//     // </>
//     <>{loading === false && adminProtection()}</>
//   );
// };

function ProtectedRoute(props) {
  const { Component } = props;
  const { isAdmin } = props;
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <div>
      {loading === false &&
        (isAuthenticated === false ? (
          <Navigate to="/login" />
        ) : isAdmin === true && user && user.role !== "admin" ? (
          <Navigate to="/" />
        ) : (
          <Component />
        ))}
    </div>
  );
}

export default ProtectedRoute;

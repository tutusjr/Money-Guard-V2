import React from "react";
import { useSelector } from "react-redux";
import {selectIsLoggedIn} from "../../redux/auth/selectors";
import { Navigate, Outlet } from "react-router";

const DefaultRoutes = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export default DefaultRoutes;

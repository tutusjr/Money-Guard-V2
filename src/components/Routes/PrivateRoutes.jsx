import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Navigate, Outlet } from "react-router";

export default function PrivateRoutes() {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

import { useRef,useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

export const CheckAuth = () => {
  const login = useRef(false);
  const userData = JSON.parse(localStorage.getItem("userData"));


  if (userData?.emailVerified === true) {
    login.current = true;
  }

  return login.current ? <Outlet /> : <Navigate to="/login" replace />;
};

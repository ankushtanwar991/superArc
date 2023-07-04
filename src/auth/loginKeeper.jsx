import { useRef } from "react";
import { Outlet, Navigate } from "react-router-dom";

export const LoginKeeper = () => {
  const login = useRef(false);
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData?.emailVerified === true) {
    login.current = true;
  }

  return login.current ? <Navigate to="/" replace /> : <Outlet />;
};

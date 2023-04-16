import React, { useCallback, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo } from "../../redux/features/auth/authSlice";

const AuthWrapper = (props) => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const getUserInfo = useCallback(
    async () => dispatch(fetchUserInfo()).unwrap(),
    []
  );

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  if (authState.asyncStatus === "SUCCESS") {
    return <>{props.children}</>;
  }

  if (authState.asyncStatus === "FAILURE") {
    return <Navigate to={`/login`} state={{ from: location }} replace />;
  }

  return null;
};

export default AuthWrapper;

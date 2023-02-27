import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../redux/features/auth/authSlice";

const LandingPage = () => {
  const authData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const getUserInfo = useCallback(
    async () => dispatch(fetchUserInfo()).unwrap(),
    []
  );
  useEffect(() => {
    getUserInfo();
  }, []);

  console.log(authData);
  return <div>Landing Page</div>;
};

export default LandingPage;

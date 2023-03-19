import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../redux/features/auth/authSlice";
import { Box, Text } from "@chakra-ui/react";

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

  // console.log(authData);
  return (
    <Box fontSize="100">
      <Text>Coming Soon</Text>
    </Box>
  );
};

export default LandingPage;

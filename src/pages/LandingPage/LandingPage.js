import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../redux/features/auth/authSlice";
import { Box, Text, Image } from "@chakra-ui/react";
import yasai from "../../assets/yasai.png";

const LandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // getUserInfo();
  }, []);

  // console.log(authData);
  return (
    <Box fontSize="100">
      <Image src={yasai} />
    </Box>
  );
};

export default LandingPage;

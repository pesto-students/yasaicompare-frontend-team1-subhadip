import React from "react";
import { Box } from "@chakra-ui/react";
import Login from "../components/Login/Login";
import { useDisclosure } from "@chakra-ui/react";
const LoginPage = () => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const login = useDisclosure();
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Login />
      </Box>
    </>
  );
};

export default LoginPage;

import React from "react";
import { Box } from "@chakra-ui/react";
import Register from "../components/Register/Register";
import { useDisclosure } from "@chakra-ui/react";
const LoginPage = () => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const login = useDisclosure();
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Register />
      </Box>
    </>
  );
};

export default LoginPage;

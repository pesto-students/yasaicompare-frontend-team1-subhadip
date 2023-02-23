import React from "react";
import { Box } from "@chakra-ui/react";
// import Login from "../components/Login/Login";
// import { useDisclosure } from "@chakra-ui/react";
import Loginv1 from "../components/Loginv1/Loginv1";

const LoginPage = () => {
  // const initialRef = React.useRef(null);
  // const finalRef = React.useRef(null);
  // const login = useDisclosure();
  return (
    <>
      <Box display="flex" justifyContent="center">
        {/* <Login
          isOpen={login.isOpen}
          onClose={login.onClose}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
        /> */}
        <Loginv1 />
      </Box>
      
    </>
  );
};

export default LoginPage;

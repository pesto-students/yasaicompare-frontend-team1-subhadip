import React from "react";
import { Box, Stack, Button } from "@chakra-ui/react";
import Yasai from "../assets/yasai_logo.png";
import Yasai_banner from "../assets/yasai.png";
import { useDisclosure } from "@chakra-ui/react";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

const Navbar = () => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const login = useDisclosure();
  const register = useDisclosure();

  return (
    <>
      <Login
        isOpen={login.isOpen}
        onClose={login.onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      />
      <Register
        isOpen={register.isOpen}
        onClose={register.onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      />
      <Box
        bg="#ffff"
        w="100%"
        h="80px"
        boxShadow="xl"
        display="flex"
        justifyContent="space-between"
      >
        <Box alignItems="center" h="100%">
          <img src={Yasai} alt="yasai" width="107px" />
        </Box>
        <Stack direction="row" spacing={4} align="center" marginRight="10px">
          <Button
            color="black"
            bgColor="white"
            borderRadius="50px"
            variant="outline"
            _hover={{
              bg: "green.500",
              textColor: "white",
            }}
            onClick={login.onOpen}
          >
            LOGIN
          </Button>
          <Button
            color="black"
            bgColor="white"
            borderRadius="50px"
            variant="outline"
            _hover={{
              bg: "green.500",
              textColor: "white",
            }}
            onClick={register.onOpen}
          >
            SIGN UP
          </Button>
        </Stack>
      </Box>
      <Box display='flex' justifyContent='center'>
        <img src={Yasai_banner} alt="yasai" width="40%" />
      </Box>
    </>
  );
};

export default Navbar;

// using chakra ui create a top nav bar which include search and image make it sticky
import React from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
} from "@chakra-ui/react";
import yasai from "../../assets/yasai.png";

export default function TopNav() {
  return (
    <Box
      bg="#ffff"
      w="100%"
      h="60px"
      boxShadow="xl"
      display="flex"
      justifyContent="space-between"
      position="fixed"
      top="0"
      zIndex="1"
    >
      <Image src={yasai} w="60px" h="60px" margin="10px" />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginRight="20px"
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none" />
          <Input width="400px" height="26px" type="text" placeholder="Search" />
        </InputGroup>
      </Box>
    </Box>
  );
}

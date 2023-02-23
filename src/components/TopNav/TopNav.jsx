// using chakra ui create a top nav bar which include search and image make it sticky
import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Stack,
} from "@chakra-ui/react";
import yasai from "../../assets/logo.svg";

export default function TopNav() {
  return (
    <Stack
      bg="#ffff"
      h="60px"
      boxShadow="md"
      position="sticky"
      top="0"
      left="0"
      right="0"
      zIndex="999"
      direction={"row"}
      alignItems={"center"}
      p="4"
    >
      <Image src={yasai} w="50px" h="50px" />

      <InputGroup>
        <InputLeftElement pointerEvents="none" />
        <Input
          size={"sm"}
          type="text"
          placeholder="Search"
          borderRadius={"md"}
        />
      </InputGroup>
    </Stack>
  );
}

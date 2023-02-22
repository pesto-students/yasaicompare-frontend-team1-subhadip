/// Create a bottom nav bar using chakra ui

import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const FlexStyles = {
  w: "100%",
  h: "60px",
  bg: "white",
  boxShadow: "xl",
  position: "fixed",
  top: "12",
  zIndex: "1",
  justifyContent: "space-between",
};

const BoxStyles = {
  w: "25%",
  h: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const ButtonStyles = {
  variant: "ghost",
  colorScheme: "green",
  size: "lg",
};

export default function TabNav() {
  return (
    <Flex {...FlexStyles}>
      <Box {...BoxStyles}>
        <Link to="/">
          <Button {...ButtonStyles}>Map View</Button>
        </Link>
      </Box>
      <Box {...BoxStyles}>
        <Link to="/cart">
          <Button {...ButtonStyles}>Shop View</Button>
        </Link>
      </Box>
      <Box {...BoxStyles}>
        <Link to="/profile">
          <Button {...ButtonStyles}>Compare View</Button>
        </Link>
      </Box>
    </Flex>
  );
}

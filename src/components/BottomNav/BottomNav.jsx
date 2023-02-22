/// Create a bottom nav bar using chakra ui

import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Delivery from "../../assets/MdDeliveryDining.svg";
import Cart from "../../assets/MdOutlineShoppingCart.svg";
import Profile from "../../assets/MdOutlinePerson.svg";
import Bookmark from "../../assets/MdOutlineBookmark.svg";
const FlexStyles = {
  w: "100%",
  h: "60px",
  bg: "white",
  boxShadow: "xl",
  position: "fixed",
  bottom: "0",
  zIndex: "1",
  bgColor: "green.500",
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

export default function BottomNav() {
  return (
    <Flex {...FlexStyles}>
      <Box {...BoxStyles}>
        <Link to="/">
          <Button {...ButtonStyles}>
            <img src={Delivery} alt="delivery" />
          </Button>
        </Link>
      </Box>
      <Box {...BoxStyles}>
        <Link to="/cart">
          <Button {...ButtonStyles}>
            <img src={Cart} alt="cart" />
          </Button>
        </Link>
      </Box>
      <Box {...BoxStyles}>
        <Link to="/profile">
          <Button {...ButtonStyles}>
            <img src={Bookmark} alt="bookmark" />
          </Button>
        </Link>
      </Box>
      <Box {...BoxStyles}>
        <Link to="/profile">
          <Button {...ButtonStyles}>
            <img src={Profile} alt="profile" />
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}

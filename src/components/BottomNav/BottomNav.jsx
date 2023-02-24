/// Create a bottom nav bar using chakra ui

import React from "react";
import PropTypes from "prop-types";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { CartIcon, HomeIcon, ShopIcon, UserIcon } from "../Icons";

const FlexStyles = {
  position: "fixed",
  bottom: "0",
  left: 0,
  right: 0,
  zIndex: "999",
  bgColor: "green.500",
  alignItems: "center",
};

const NavItem = (props) => {
  return (
    <Flex
      bg={props.isActive ? "green.600" : "green.500"}
      borderTop={"2px"}
      borderTopColor={props.isActive ? "#A5D6A7" : "green.500"}
      p="2"
      flex="1"
      justifyContent={"center"}
    >
      <Link to={props.link}>
        <Stack justifyContent={"center"} alignItems={"center"} color="white">
          {props.icon}
          <Text fontSize={"xs"} fontWeight="bold">
            {props.title}
          </Text>
        </Stack>
      </Link>
    </Flex>
  );
};

NavItem.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  isActive: PropTypes.bool.isRequired,
};

export default function BottomNav() {
  const location = useLocation();
  return (
    <Flex {...FlexStyles}>
      <NavItem
        title="Home"
        link="/"
        isActive={location.pathname === "/"}
        icon={<HomeIcon fontSize="20px" />}
      />
      <NavItem
        title="Shops"
        link="/shop"
        isActive={location.pathname === "/shop"}
        icon={<ShopIcon fontSize="20px" />}
      />

      <NavItem
        title="Cart"
        link="/cart"
        isActive={location.pathname === "/cart"}
        icon={<CartIcon fontSize="20px" />}
      />

      <NavItem
        title="Profile"
        link="/profile"
        isActive={location.pathname === "/profile"}
        icon={<UserIcon fontSize="20px" />}
      />
    </Flex>
  );
}

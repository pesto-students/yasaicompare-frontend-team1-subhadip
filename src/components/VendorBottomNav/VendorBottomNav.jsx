import React from "react";
import PropTypes from "prop-types";
import { Flex, Stack, Text, Avatar } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { ShopIcon, UserIcon} from "../Icons";
import { useSelector } from "react-redux";
import _ from "lodash";

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
      position={"relative"}
    >
      <Link to={props.link}>
        <Stack justifyContent={"center"} alignItems={"center"} color="white">
          {props.icon}
          <Text fontSize={"xs"} fontWeight="bold">
            {props.title}
          </Text>
        </Stack>
      </Link>
      {props.extra}
    </Flex>
  );
};

NavItem.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  isActive: PropTypes.bool.isRequired,
};

export default function VendorBottomNav() {
  const location = useLocation();
  const authData = useSelector((state) => state.auth.data);
  return (
    <Flex {...FlexStyles}>
      <NavItem
        title="Shops"
        link="/vendor"
        isActive={location.pathname.includes("/vendor")}
        icon={<ShopIcon fontSize="24px" />}
      />
      {_.isEmpty(authData) ? (
        <NavItem
          title="Login"
          link="/login"
          isActive={location.pathname === "/login"}
          icon={<UserIcon fontSize="24px" />}
        />
      ) : (
        <NavItem
          title="Profile"
          link="/vendor/profile"
          isActive={location.pathname === "/profile"}
          icon={
            <Avatar
              size="xs"
              name={authData.first_name + " " + authData.last_name}
              src="https://bit.ly/tioluwani-kolawole"
            />
          }
        />
      )}
    </Flex>
  );
}

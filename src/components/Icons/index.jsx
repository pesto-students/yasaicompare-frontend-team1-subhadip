import { Icon } from "@chakra-ui/react";
import { GiShop } from "react-icons/gi";
import { BsFillCartFill, BsSearch, BsFillStarFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";

export const ShopIcon = (props) => <Icon as={GiShop} {...props} />;

export const CartIcon = (props) => <Icon as={BsFillCartFill} {...props} />;

export const UserIcon = (props) => <Icon as={FaUserAlt} {...props} />;

export const HomeIcon = (props) => <Icon as={IoMdHome} {...props} />;

export const SearchIcon = (props) => <Icon as={BsSearch} {...props} />;

export const LocationIcon = (props) => <Icon as={MdLocationPin} {...props} />;

export const StarIcon = (props) => <Icon as={BsFillStarFill} {...props} />;

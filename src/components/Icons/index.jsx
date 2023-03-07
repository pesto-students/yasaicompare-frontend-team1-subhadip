import { Icon } from "@chakra-ui/react";
import { GiShop } from "react-icons/gi";
import {
  BsFillCartFill,
  BsSearch,
  BsFillStarFill,
  BsFilterRight,
} from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { Add } from "@styled-icons/fluentui-system-filled/Add";

import { Subtract } from "@styled-icons/fluentui-system-filled/Subtract";

export const ShopIcon = (props) => <Icon as={GiShop} {...props} />;

export const CartIcon = (props) => <Icon as={BsFillCartFill} {...props} />;

export const UserIcon = (props) => <Icon as={FaUserAlt} {...props} />;

export const HomeIcon = (props) => <Icon as={IoMdHome} {...props} />;

export const SearchIcon = (props) => <Icon as={BsSearch} {...props} />;

export const LocationIcon = (props) => <Icon as={MdLocationPin} {...props} />;

export const StarIcon = (props) => <Icon as={BsFillStarFill} {...props} />;

export const FilterIcon = (props) => <Icon as={BsFilterRight} {...props} />;

export const AddIcon = (props) => <Icon as={AiOutlinePlus} {...props} />;

export const SubtractIcon = (props) => <Icon as={AiOutlineMinus} {...props} />;

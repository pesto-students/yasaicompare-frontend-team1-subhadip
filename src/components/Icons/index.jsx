import { Icon } from "@chakra-ui/react";
import { GiShop } from "react-icons/gi";
import {
  BsFillCartFill,
  BsSearch,
  BsFillStarFill,
  BsFilterRight,
  BsCartFill,
  BsFillArrowUpRightSquareFill,
} from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import {
  MdLocationPin,
  MdOutlineManageAccounts,
  MdInventory,
} from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

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

export const ManageIcon = (props) => (
  <Icon as={MdOutlineManageAccounts} {...props} />
);

export const CartManager = (props) => <Icon as={BsCartFill} {...props} />;

export const LogoutIcon = (props) => <Icon as={FiLogOut} {...props} />;
export const InventoryIcon = (props) => <Icon as={MdInventory} {...props} />;
export const ArrowIcon = (props) => (
  <Icon as={BsFillArrowUpRightSquareFill} {...props} />
);

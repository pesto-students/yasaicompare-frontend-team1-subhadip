import React from "react";
import paprika from "../../assets/paprika.jpg";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Box,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { MdModeEditOutline } from "react-icons/md";
import { ChevronDownIcon } from "@chakra-ui/icons";

const VendorInventoryCard = () => {
  return (
    <Card fontFamily="poppins,sans-serif">
      <CardHeader>
        <Image src={paprika} alt="yasai compare" />
        <Box display="flex" justifyContent="center" marginTop="10px">
          <Text fontWeight="bold" paddingRight="30px">
            Red Paprika
          </Text>
          <MdModeEditOutline fontSize="20px" />
        </Box>
      </CardHeader>
      <CardBody>
        <Box display="flex" justifyContent="center" alignItems="center">
          <NumberInput step={1} defaultValue={15} min={0} max={30}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Menu>
            <MenuButton
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
            >
              File <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem>Kg</MenuItem>
              <MenuItem>g</MenuItem>
              <MenuItem>Oz</MenuItem>
              <MenuItem>ol</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box display="flex" justifyContent="">
          <FormControl display="flex">
            <FormLabel htmlFor="email-alerts" mb="0">
              In Stock
            </FormLabel>
            <Switch id="email-alerts" />
          </FormControl>
        </Box>
      </CardBody>
    </Card>
  );
};

export default VendorInventoryCard;

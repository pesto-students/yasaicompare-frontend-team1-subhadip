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
  Input,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const VendorInventoryCard = () => {
  return (
    <Card fontFamily="poppins,sans-serif" maxW="200px" maxH="300px" size={"sm"}>
      <CardHeader>
        <Image src={paprika} alt="yasai compare" />
        <Box display="flex" justifyContent="center" marginTop="10px">
          <Text fontWeight="bold" paddingRight="30px">
            Red Paprika
          </Text>
        </Box>
      </CardHeader>
      <CardBody>
        <Box>
          <Box marginBottom='1'>
            <Input placeholder="₹" size="sm" width="50px" />
            <Input placeholder="Price" size="sm" width="100px" />
          </Box>
          <Box>
            <Input placeholder="Unit" size="sm" width="50px" />
            <Input placeholder="Quantity" size="sm" width="100px" />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          m="10px"
          marginLeft="30px"
          marginTop="10px"
        >
          <FormControl display="flex">
            <FormLabel htmlFor="email-alerts" mb="0">
              Availability
            </FormLabel>
            <Switch id="email-alerts" />
          </FormControl>
        </Box>
      </CardBody>
    </Card>
  );
};

export default VendorInventoryCard;

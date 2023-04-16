import React from "react";
// import {
//   Box,
//   Card,
//   CardBody,
//   FormControl,
//   FormLabel,
//   Heading,
//   Image,
//   Stack,
//   Switch,
//   Text,
// } from "@chakra-ui/react";
import {
  Box,
  Flex,
  Image,
  Text,
  Switch,
  Spacer,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { ArrowIcon } from "../../components/Icons";

import { formatPrice } from "../../utils/commons";
import PropTypes from "prop-types";

const VendorInventoryCard = (props) => {
  const imageSize = !props.minimal ? "150px" : "100px";
  return (
    // <Card size={"sm"} boxShadow="base" borderRadius="md">
    //   <CardBody fontFamily="body">
    //     <Stack direction={["column", "column", "row-reverse"]} spacing="6">
    //       <Box flex="1">
    //         <Image
    //           src={props.image}
    //           alt={props.name}
    //           width={imageSize}
    //           height={"auto"}
    //           borderRadius="md"
    //         />
    //       </Box>
    //       <Stack flex="3" spacing="3">
    //         <Heading fontSize="20px" size="md">
    //           {props.name}
    //         </Heading>
    //         <Stack
    //           direction="row"
    //           alignItems="center"
    //           justifyContent="space-between"
    //         >
    //           <Stack spacing="1" flex="1">
    //             <Text fontSize="15px">{formatPrice(props.price)}</Text>
    //           </Stack>
    //           <Stack flex="1">
    //             <Box>STOCK: {props.quantity}</Box>
    //             <FormControl display="flex">
    //               <FormLabel htmlFor="available" fontWeight="bold">
    //                 Available:
    //               </FormLabel>
    //               <Switch
    //                 id="available"
    //                 isChecked={props.available}
    //                 size="sm"
    //                 colorScheme="green"
    //               />
    //             </FormControl>
    //           </Stack>
    //         </Stack>
    //       </Stack>
    //     </Stack>
    //   </CardBody>
    // </Card>

    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
    >
      <Box display="flex" justifyContent="space-between">
        <Flex bg="gray.100" p={4}>
          <Image
            src={props.image}
            boxSize={{ base: "90px", md: "100px" }}
            mr={{ base: 0, md: 4 }}
          />
          <Text
            textTransform="uppercase"
            fontWeight="bold"
            fontSize={{ base: "md", md: "lg" }}
            textAlign={{ base: "left", md: "center" }}
            flex={{ base: 1, md: "none" }}
            p={8}
          >
            {props.name}
          </Text>
        </Flex>

        <Box alignItems="center" p={4}>
          <Box marginLeft="20" onClick={props.editButton}>
            <ArrowIcon />
          </Box>
          <Text
            flex={{ base: 1, md: "none" }}
            mr={{ base: 0, md: 2 }}
            textTransform="uppercase"
            fontSize="15"
          >
            Stock: <strong>{props.quantity}</strong>
          </Text>
          <Text
            flex={{ base: 1, md: "none" }}
            mr={{ base: 0, md: 2 }}
            textTransform="uppercase"
            fontSize="15"
          >
            Price: <strong>{props.price}</strong>
          </Text>
          <Text
            flex={{ base: 1, md: "none" }}
            mr={{ base: 0, md: 2 }}
            textTransform="uppercase"
          >
            Unit: <strong>{props.unit}</strong>
          </Text>

          <Spacer flex={{ base: "none", md: 1 }} />
          <FormControl display="flex">
            <FormLabel htmlFor="available" fontSize="15">
              IN STOCK:
            </FormLabel>
            <Switch
              id="available"
              onChange={props.onSwitchChange}
              size="sm"
              isChecked={props.available}
              colorScheme="green"
            />
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

VendorInventoryCard.propTypes = {
  minimal: PropTypes.bool,
  quantity: PropTypes.number,
  onIncrementClick: PropTypes.func,
  onDecrementClick: PropTypes.func,
};

export default VendorInventoryCard;

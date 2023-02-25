// Using chakra ui create a card component that can be used to display the details of a grocery shop. The card should have the following properties:

import React from "react";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import paprika from "../../assets/paprika.jpg";
import { LocationIcon } from "../Icons";
import Rating from "../Rating/Rating";

import Proptypes from "prop-types";
export default function ItemCards(props) {
  return (
    <Card maxW="300px" maxH="400px" boxShadow="2xl" size={"sm"} padding='5px'>
      <CardBody h="400px">
        <Image
          src={paprika}
          alt="peprica"
          width={200}
          height={100}
          borderRadius="lg"
        />
        <Stack mt="1" textAlign="center">
          <Heading
            fontSize="14px"
            size="md"
            textAlign="center"
            fontWeight="extrabold"
            fontFamily="poppins,sans-serif"
          >
            Red Paprika
          </Heading>
          <Box display="flex" justifyContent="center">
            <Text fontSize="13px" color="green.500" fontWeight="bold">
              75.00$
            </Text>
            <Text fontSize="13px" color="gray.500" fontWeight="bold">
              /kg
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <Stack mt="1" spacing="3" p="1">
        <Heading fontSize="12px" size="md">
          ARYAN GROCERY
        </Heading>
        <Stack spacing={"1"}>
          <Stack direction={"row"}>
            <LocationIcon color="green.500" />
            <Text fontSize="xs">2.5 km</Text>
            <Text fontSize="xs" color="gray.500">
              From Home
            </Text>
          </Stack>
          <Stack direction={"row"}>
            <Stack direction={"row"}>
              <Rating rating={1} total={1} />
              <Text fontSize="xs">4.5</Text>
            </Stack>
            <Stack direction={"row"}>
              <Text fontSize="xs" color="gray.500">
                100 Reviews
              </Text>
            </Stack>
          </Stack>
        </Stack>

        <Button size="xs" variant="outline" borderRadius="8px" width="full">
          Add 2 Cart
        </Button>
      </Stack>
    </Card>
  );
}

ItemCards.propTypes = {
  shop_name: Proptypes.string,
  item_name: Proptypes.string,
  cost: Proptypes.string,
  distance: Proptypes.string,
  rating: Proptypes.string,
  image: Proptypes.string,
};

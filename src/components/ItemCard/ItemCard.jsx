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

import Proptypes from "prop-types";
export default function ItemCards(props) {
  return (
    <Card maxW="200px" maxH="300px" boxShadow="2xl">
      <CardBody>
        <Image
          src={paprika}
          alt="peprica"
          width={250}
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
      <Box justifyContent="center" w="full" p="10px">
        <Stack spacing="1">
          <Heading fontSize="12px" size="md" textAlign="center">
            ARPIT GROCERY SHOP
          </Heading>
          <Text fontSize="10px">DISTANCE : 2km from home station</Text>
          <Text fontSize="10px">RATING : 4.5</Text>
        </Stack>
        <Button mt='3'size="xs" variant="outline" borderRadius="8px" width="full">
          Add 2 Cart
        </Button>
      </Box>
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

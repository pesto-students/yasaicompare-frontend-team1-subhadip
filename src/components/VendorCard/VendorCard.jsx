import React from "react";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import Proptypes from "prop-types";


export default function VendorCard(props) {
  // Get the shop id on click of the visit shop button
  return (
    <Card
      onClick={props.onClick}
      maxW="200px"
      maxH="300px"
      boxShadow="xl"
      size={"sm"}
    >
      <CardBody>
        <Image
          src={props.image}
          alt="nill"
          width={250}
          height={100}
          borderRadius="lg"
        />
        <Stack mt="2" spacing="3">
          <Heading fontSize="12px" size="md">
            {props.shop_name}
          </Heading>
          <Button
            onClick={props.showInventory}
            size="xs"
            variant="outline"
            borderRadius="8px"
            width="full"
          >
            SHOW INVENTORY
          </Button>
          <Button
            onClick={props.viewOrders}
            size="xs"
            variant="outline"
            borderRadius="8px"
            width="full"
          >
            VIEW ORDERS
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
}

VendorCard.propTypes = {
  shop_name: Proptypes.string,
  distance: Proptypes.string,
  image: Proptypes.string,
};

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
import { LocationIcon } from "../Icons";
import Rating from "../Rating/Rating";
import { useDispatch } from "react-redux";
import { fetchShops } from "../../redux/features/auth/shopSlice";
import { useState } from "react";

export default function ShopCard(props) {
  const dispatch = useDispatch();
  const [shops, setShops] = useState([]);
  function visitShop() {
    const shopId = shops.map((shop) => shop.id);
    console.log(shopId);
  }

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

          <Button
            onClick={visitShop}
            size="xs"
            variant="outline"
            borderRadius="8px"
            width="full"
          >
            VISIT SHOP
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
}

ShopCard.propTypes = {
  shop_name: Proptypes.string,
  distance: Proptypes.string,
  image: Proptypes.string,
};

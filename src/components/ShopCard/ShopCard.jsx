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

export default function ShopCard(props) {
  return (
    <Card maxW="200px" maxH="300px" boxShadow="xl" size={"sm"}>
      <CardBody>
        <Image
          src="https://assets.aboutamazon.com/dims4/default/15a5eac/2147483647/strip/true/crop/1919x1080+1+0/resize/1320x743!/format/webp/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2Fa5%2F60%2F398c51db4a4c9f5cb25e2b27c0ea%2Fjwos.png"
          alt="nill"
          width={250}
          height={100}
          borderRadius="lg"
        />
        <Stack mt="2" spacing="3">
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
  rating: Proptypes.string,
  image: Proptypes.string,
};

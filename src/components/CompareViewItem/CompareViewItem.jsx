import { Stack, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import { LocationIcon } from "../Icons";
import Rating from "../Rating/Rating";

export default function CompareViewItem() {
  return (
    <Stack>
      <Card size="sm" w="200px">
        <CardBody>
          <Stack spacing={"1"}>
            <Heading fontSize="12px" size="md">
              ARYAN GROCERY
            </Heading>
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
        </CardBody>
      </Card>
      <Stack>
        <ItemCard minimal={true} />
        <ItemCard minimal={true} />
        <ItemCard minimal={true} />
        <ItemCard minimal={true} />
        <ItemCard minimal={true} />
        <ItemCard minimal={true} />
        <ItemCard minimal={true} />
        <ItemCard minimal={true} />
        <ItemCard minimal={true} />
        <ItemCard minimal={true} />
      </Stack>
    </Stack>
  );
}

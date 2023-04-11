import React from "react";
import {
  Box,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { formatPrice } from "../../utils/commons";
import PropTypes from "prop-types";

const VendorInventoryCard = (props) => {
  const imageSize = !props.minimal ? "150px" : "100px";
  return (
    <Card size={"sm"} boxShadow="base" borderRadius="md">
      <CardBody fontFamily="body">
        <Stack direction={["column", "column", "row-reverse"]} spacing="6">
          <Box flex="1">
            <Image
              src={props.image}
              alt={props.name}
              width={imageSize}
              height={"auto"}
              borderRadius="md"
            />
          </Box>
          <Stack flex="3" spacing="3">
            <Heading fontSize="20px" size="md">
              {props.name}
            </Heading>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack spacing="1" flex="1">
                <Text fontSize="15px">{formatPrice(props.price)}</Text>
              </Stack>
              <Stack flex="1">
                <Box>STOCK: {props.quantity}</Box>
                <FormControl display="flex">
                  <FormLabel htmlFor="available" fontWeight="bold">
                    Available:
                  </FormLabel>
                  <Switch
                    id="available"
                    isChecked={props.available}
                    size="sm"
                    colorScheme="green"
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

VendorInventoryCard.propTypes = {
  minimal: PropTypes.bool,
  quantity: PropTypes.number,
  onIncrementClick: PropTypes.func,
  onDecrementClick: PropTypes.func,
};

export default VendorInventoryCard;

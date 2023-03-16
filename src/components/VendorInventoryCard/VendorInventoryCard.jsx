import React from "react";
import {
  Card,
  Image,
  Heading,
  Text,
  Button,
  Stack,
  CardBody,
  Box,
  Switch,
  FormControl,
  FormLabel,
  IconButton,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import { formatPrice } from "../../utils/commons";
import PropTypes from "prop-types";

export const VendorInventoryCard = (props) => {
  const imageSize = !props.minimal ? "150px" : "100px";
  return (
    <Card size={"sm"}>
      <CardBody>
        <Stack direction={props.minimal ? "row" : "row"}>
          <Image
            src={props.image}
            alt="nill"
            width={imageSize}
            height={"auto"}
            borderRadius="lg"
          />
          <Stack mt="2" spacing="3" flex="1">
            <Heading fontSize="20px" size="md">
              {props.name}
            </Heading>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack spacing={"1"} flex="1">
                <Text fontSize="15px">{formatPrice(props.price)}</Text>
              </Stack>
              <Stack flex="1">
                <Box>STOCK : {props.quantity}</Box>
                <FormControl display="flex">
                  <FormLabel aria-required="false" htmlFor="isRequired">
                    Available:
                  </FormLabel>
                  <Switch
                    id="isRequired"
                    isRequired
                    isChecked={props.available}
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

import React from "react";
import {
  Card,
  Image,
  Heading,
  Text,
  Button,
  Stack,
  CardBody,
  HStack,
  Input,
  ButtonGroup,
} from "@chakra-ui/react";
import { formatPrice } from "../../utils/commons";
import PropTypes from "prop-types";
import { AddIcon, SubtractIcon } from "../Icons";
import { addToCart } from "../../redux/features/shop/shopSlice";

export const ItemCard = (props) => {
  const imageSize = !props.minimal ? "100px" : "50px";
  return (
    <Card size={"sm"}>
      <CardBody>
        <Stack direction={props.minimal ? "row" : "column"}>
          <Image
            src={props.image}
            alt="nill"
            width={imageSize}
            height={"auto"}
            borderRadius="lg"
          />
          <Stack mt="2" spacing="3" flex="1">
            <Heading fontSize="12px" size="md">
              {props.name}
            </Heading>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack spacing={"1"} flex="1">
                <Text fontSize="12px">{formatPrice(props.price)}</Text>
              </Stack>
              <Stack flex="1">
                {props.buttonclicked ? (
                  <Button
                    size="xs"
                    borderRadius="8px"
                    width="full"
                    onClick={props.setButtonClicked}
                  >
                    Add
                  </Button>
                ) : (
                  <ButtonGroup
                    borderRadius="6"
                    color="white"
                    bgColor="green.500"
                    size="xs"
                    width="full"
                  >
                    <Box marginLeft="10px" onClick={props.decrement}>
                      {<SubtractIcon />}
                    </Box>
                    <Input
                      textAlign="center"
                      variant="unstyled"
                      size="xs"
                      value={props.counter}
                    />
                    <Box marginRight="10px" onClick={props.increment}>
                      {<AddIcon />}
                    </Box>
                  </ButtonGroup>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

ItemCard.propTypes = {
  minimal: PropTypes.bool,
  quantity: PropTypes.number,
  onIncrementClick: PropTypes.func,
  onDecrementClick: PropTypes.func,
};

export default ItemCard;

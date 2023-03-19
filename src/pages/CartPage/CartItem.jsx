import {
  CloseButton,
  Flex,
  Link,
  ButtonGroup,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { PriceTag } from "./PriceTag";
import { CartProductMeta } from "./CartProductMeta";
import { AddIcon, SubtractIcon } from "../../components/Icons";

export const CartItemCard = (props) => {
  const {
    name,
    description,
    quantity,
    imageUrl,
    currency,
    price,
    onClickDelete,
  } = props;
  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={name}
        description={description}
        image={imageUrl}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: "none",
          md: "flex",
        }}
      >
        <ButtonGroup
          borderRadius="6"
          color="white"
          bgColor="green.500"
          size="xs"
          width="80px"
        >
          <IconButton
            icon={<SubtractIcon />}
            onClick={props.onDecrementClick}
          />
          <Flex justifyContent="center" alignItems="center">
            <Text fontSize="xs">{quantity}</Text>
          </Flex>
          <IconButton icon={<AddIcon />} onClick={props.onIncrementClick} />
        </ButtonGroup>
        <PriceTag price={price} currency={currency} />
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={onClickDelete}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: "flex",
          md: "none",
        }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <ButtonGroup
          borderRadius="6"
          color="white"
          bgColor="green.500"
          size="xs"
          width="80px"
        >
          <IconButton
            icon={<SubtractIcon />}
            onClick={props.onDecrementClick}
          />
          <Flex justifyContent="center" alignItems="center">
            <Text fontSize="xs">{quantity}</Text>
          </Flex>
          <IconButton icon={<AddIcon />} onClick={props.onIncrementClick} />
        </ButtonGroup>
        <PriceTag price={price} currency={currency} />
      </Flex>
    </Flex>
  );
};

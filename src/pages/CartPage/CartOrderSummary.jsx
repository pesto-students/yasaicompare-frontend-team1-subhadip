import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "./PriceTag";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems } from "../../redux/features/cart/cartSlice";

const OrderSummaryItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CartOrderSummary = ({ totalcartitems }) => {
  const dispatch = useDispatch();
  const cartDataState = useSelector((state) => state.cart);
  const selectedAddress = useSelector((state) =>
    state.address.data.find((address) => address.current)
  );

  /**
   * Fetch Cart Data
   */
  const cartData = useCallback(
    async () => dispatch(fetchCartItems()).unwrap(),
    []
  );
  useEffect(() => {
    cartData();
  }, []);

  const prepareOrderData = () => {
    let finalData = {
      orders: [],
      delievery_address: selectedAddress.id,
    };

    cartDataState.data.forEach((cartItem) => {
      const foundIndex = finalData.orders.findIndex(
        (shop) => shop.shop_id === cartItem.shop_id
      );

      /**
       * if Doesn't exist
       */
      if (foundIndex === -1) {
        finalData.orders.push({
          shop_id: cartItem.shop_id,
          items: [
            {
              item_id: cartItem.item_id,
              quantity: cartItem.quantity,
            },
          ],
        });
      } else {
        /**
         * Adding Item in Shop
         */
        finalData.orders[foundIndex].items.push({
          item_id: cartItem.item_id,
          quantity: cartItem.quantity,
        });
      }
    });
  };

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <OrderSummaryItem
          label="Subtotal"
          value={formatPrice(totalcartitems)}
        />
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(totalcartitems)}
          </Text>
        </Flex>
      </Stack>
      <Button
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
        onClick={prepareOrderData}
      >
        Checkout
      </Button>
    </Stack>
  );
};

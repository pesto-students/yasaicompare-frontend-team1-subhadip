import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { CartItemCard } from "./CartItem";
import { CartOrderSummary } from "./CartOrderSummary";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useCallback } from "react";

import {
  fetchCartItems,
  updateCartItem,
  deleteCartItem,
} from "../../redux/features/cart/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartDataState = useSelector((state) => state.cart);
  const getCartItems = useCallback(
    async () => dispatch(fetchCartItems()).unwrap(),
    []
  );
  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const total = cartDataState.data.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleIncrementClick = useCallback(async (cart_id, quantity) => {
    try {
      await dispatch(
        updateCartItem({
          cart_id,
          quantity,
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDecrementClick = useCallback(async (cart_id, quantity) => {
    try {
      if (quantity === -1) {
        return;
      }
      if (quantity === 0) {
        await dispatch(
          deleteCartItem({
            cart_id,
          })
        ).unwrap();
        return;
      }
      await dispatch(
        updateCartItem({
          cart_id,
          quantity,
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Box
      maxW={{
        base: "3xl",
        lg: "7xl",
      }}
      mx="auto"
      px={{
        base: "4",
        md: "8",
        lg: "12",
      }}
      py={{
        base: "6",
        md: "8",
        lg: "12",
      }}
    >
      <Stack
        direction={{
          base: "column",
          lg: "row",
        }}
        align={{
          lg: "flex-start",
        }}
        spacing={{
          base: "8",
          md: "16",
        }}
      >
        <Stack
          spacing={{
            base: "8",
            md: "10",
          }}
          flex="2"
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart ({cartDataState.data.length} items)
          </Heading>

          <Stack spacing="6">
            {cartDataState.data &&
              cartDataState.data.map((item) => (
                <CartItemCard
                  key={item.item_id}
                  name={item.name}
                  imageUrl={item.image}
                  quantity={item.quantity}
                  {...item}
                  onIncrementClick={() => {
                    handleIncrementClick(
                      item.cart_id,
                      (item?.quantity || 0) + 1
                    );
                  }}
                  onDecrementClick={() => {
                    handleDecrementClick(
                      item.cart_id,
                      (item?.quantity || 0) - 1
                    );
                  }}
                />
              ))}
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary totalcartitems={total} />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link color={mode("blue.500", "blue.200")}>Continue shopping</Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
}

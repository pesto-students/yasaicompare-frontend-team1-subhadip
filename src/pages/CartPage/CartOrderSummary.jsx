import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "./PriceTag";
import { useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems } from "../../redux/features/cart/cartSlice";
import { createOrder } from "../../redux/features/orders/ordersSlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "../../config";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
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
  const order_id = useRef(null);
  // const createOrderResponse = useRef(null);
  const [createOrderResponse, setCreateOrderResponse] = useState(null);
  const [showcheckout, setShowCheckout] = useState(true);
  const cartDataState = useSelector((state) => state.cart);
  const selectedAddress = useSelector((state) => state.address);

  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  const options = {
    // passing the client secret obtained from the server
    // clientSecret: `${ STRIPE_CLIENT_KEY }`,
    clientSecret: createOrderResponse,
  };
  /**
   * Fetch Cart Data
   */
  const cartData = useCallback(
    async () => dispatch(fetchCartItems()).unwrap(),
    []
  );

  const createdOrder = useCallback(
    async (args) => dispatch(createOrder(args)).unwrap(),
    []
  );

  useEffect(() => {
    cartData();
  }, []);

  const handleCheckout = () => {
    setShowCheckout(true);
  };
  // latitude longitude label
  const prepareOrderData = async () => {
    console.log(selectedAddress.data[0].id);
    if (!selectedAddress.data[0].id) {
      // return navigate("/profile/address");
    }
    let finalData = {
      orders: [],
      delievery_address:
        selectedAddress.data[0].id || "72ea09dd-30d3-4b92-8f09-a3ec401852d7",
    };
    cartDataState.data.forEach((cartItem) => {
      const foundIndex = finalData.orders.findIndex(
        (shop) => shop.shop_id === cartItem.shop_id
      );

      /*
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
    console.log(finalData);
    const response = await createdOrder(finalData);
    if (response?.paymentData?.client_secret) {
      setCreateOrderResponse(response.paymentData.client_secret);
      order_id.current = response.order_id;
      setShowCheckout(false);
    }
  };

  console.log(selectedAddress);

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
      {showcheckout ? (
        <Button
          size="lg"
          fontSize="md"
          rightIcon={<FaArrowRight />}
          onClick={prepareOrderData}
        >
          Checkout
        </Button>
      ) : (
        stripePromise && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
              clientSecretChange={() => handleCheckout}
              order_id={order_id.current}
            />
          </Elements>
        )
      )}
    </Stack>
  );
};

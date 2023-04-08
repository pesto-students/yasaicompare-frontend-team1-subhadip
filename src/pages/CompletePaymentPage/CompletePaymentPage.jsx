import React, { useEffect } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { confirmOrder } from "../../redux/features/orders/ordersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useCallback } from "react";

const CompletePaymentPage = () => {
  const url = window.location.href;
  var params = url.split("?")[1].split("&");
  var data = {};
  for (var i = 0; i < params.length; i++) {
    var tmp = params[i].split("=");
    data[tmp[0]] = tmp[1];
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirmState = useSelector((state) => state.orders);

  const confirm = useCallback(
    async (args) => dispatch(confirmOrder(args)).unwrap(),
    []
  );

  useEffect(() => {
    confirm(data);
  }, []);

  console.log(confirmState.confirm_order);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CheckCircleIcon boxSize={16} color="green.500" />
      <Text mt={4} fontSize="xl">
        Payment Completed Successfully
      </Text>
      {setTimeout(() => {
        navigate("/vieworders");
      }, 3000)}
      <Button mt={8} colorScheme="green" onClick={() => navigate("/")}>
        Continue Shopping
      </Button>
    </Box>
  );
};

export default CompletePaymentPage;

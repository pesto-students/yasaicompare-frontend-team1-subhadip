import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";

const orders = [
  { id: 1, status: "pending", date: "2022-04-01", total: 45.99 },
  { id: 2, status: "shipped", date: "2022-03-15", total: 27.99 },
  { id: 3, status: "delivered", date: "2022-02-28", total: 14.99 },
];

const OrderItem = ({ order }) => {
  return (
    <Box bg="white" p={4} rounded="md" shadow="sm">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h4" size="md">
          Order #{order.id}
        </Heading>
        <Badge colorScheme={order.status === "pending" ? "orange" : "green"}>
          {order.status}
        </Badge>
      </Flex>
      <Text mt={2} fontSize="md">
        Placed on {order.date}
      </Text>
      <Text mt={2} fontSize="md" fontWeight="bold">
        Total: ${order.total}
      </Text>
      <IconButton
        aria-label="View order details"
        icon={<CheckCircleIcon />}
        size="sm"
        colorScheme="green"
        mt={2}
        mr={2}
      />
      <IconButton
        aria-label="Cancel order"
        icon={<CloseIcon />}
        size="sm"
        colorScheme="red"
        mt={2}
      />
    </Box>
  );
};

const ViewOrdersPage = () => {
  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>
        My Orders
      </Heading>
      <Stack spacing={4}>
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </Stack>
    </Box>
  );
};

export default ViewOrdersPage;

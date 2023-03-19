import { Box, Flex, Text, Button } from "@chakra-ui/react";

const OrderDetailsCardActive = ({
  amount,
  delievery_charge,
  orderDate,
  status,
  totalAmount,
}) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4}>
      <Flex justifyContent="space-between" mb={2}>
        <Text fontWeight="bold">Amount:</Text>
        <Text>{amount}</Text>
      </Flex>
      <Flex justifyContent="space-between" mb={2}>
        <Text fontWeight="bold">delievery Fee:</Text>
        <Text>{delievery_charge}</Text>
      </Flex>
      <Flex justifyContent="space-between" mb={2}>
        <Text fontWeight="bold">DATE:</Text>
        <Text>{orderDate}</Text>
      </Flex>
      <Flex justifyContent="space-between" mb={2}>
        <Text fontWeight="bold">Deliverd:</Text>
        <Text>{status}</Text>
        <Button colorScheme="blue" size="sm" ml={2}>
          Delievered
        </Button>
      </Flex>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">TOTAL AMOUNT:</Text>
        <Text>{totalAmount}</Text>
      </Flex>
    </Box>
  );
};

export default OrderDetailsCardActive;

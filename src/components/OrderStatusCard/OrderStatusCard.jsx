import { Box, Flex, Text, Button, Badge } from "@chakra-ui/react";
import { formatPrice, formatDate, OrderIdSnip } from "../../utils/commons";
const OrderDetailsCardActive = ({
  orderId,
  delievery_charge,
  orderDate,
  status,
  totalAmount,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      mb={4}
      boxShadow="md"
    >
      <Flex justifyContent="space-between" mb={2}>
        <Text fontSize="15px" fontWeight="bold">
          ORDER-ID:
        </Text>
        <Text>{OrderIdSnip(orderId)}</Text>
      </Flex>
      <Flex justifyContent="space-between" mb={2}>
        <Text fontSize="15px" fontWeight="bold">
          AMOUNT:
        </Text>
        <Text>{formatPrice(totalAmount)}</Text>
      </Flex>
      <Flex justifyContent="space-between" mb={2}>
        <Text fontSize="15px" fontWeight="bold">
          DELIVERY FEE:
        </Text>
        <Text>{delievery_charge}</Text>
      </Flex>
      <Flex justifyContent="space-between" mb={2}>
        <Text fontSize="15px" fontWeight="bold">
          DATE:
        </Text>
        <Text>{formatDate(orderDate)}</Text>
      </Flex>
      <Flex justifyContent="space-between" mb={2}>
        <Text fontSize="15px" fontWeight="bold">
          STATUS:
        </Text>
        {status === "draft" ? (
          <Badge colorScheme="orange">{status}</Badge>
        ) : (
          <Badge colorScheme="green">{status}</Badge>
        )}
      </Flex>
    </Box>
  );
};

export default OrderDetailsCardActive;

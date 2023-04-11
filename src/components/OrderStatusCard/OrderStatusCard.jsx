import { Box, Flex, Text, Badge, Select } from "@chakra-ui/react";
import { formatPrice, formatDate, OrderIdSnip } from "../../utils/commons";
import { ArrowIcon } from "../Icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

const OrderDetailsCardActive = ({
  orderId,
  orderDate,
  status,
  totalAmount,
  handleChange,
  color_id,
  vendor_disable,
  customer_disable,
  showItems,
}) => {
  const options = [
    { value: "pending", label: "Pending", disabled: true },
    { value: "confirmed", label: "Confirmed", disabled: customer_disable },
    {
      value: "in_transit",
      label: "Out for delivery",
      disabled: customer_disable,
    },
    { value: "delivered", label: "Delivered", disabled: vendor_disable },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Item Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {showItems?.items?.length &&
              showItems?.items?.map((item) => {
                return (
                  <Flex justifyContent="space-between" mb={2}>
                    <Text fontSize="15px" fontWeight="bold">
                      {item.item_id}
                    </Text>
                    <Text fontSize="15px" fontWeight="bold">
                      {item.name}
                    </Text>
                    <Text>{item.quantity}</Text>
                  </Flex>
                );
              })}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        mb={4}
        boxShadow="md"
      >
        <Flex justifyContent="space-between" mb={2} onClick={onOpen}>
          <ArrowIcon />
        </Flex>
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
            DATE:
          </Text>
          <Text>{formatDate(orderDate)}</Text>
        </Flex>
        <Flex justifyContent="space-between" mb={2}>
          <Text fontSize="15px" fontWeight="bold">
            STATUS:
          </Text>
          {/* {status === "draft" ? (
          <Badge colorScheme="orange">{status}</Badge>
        ) : (
          <Badge colorScheme="green">{status}</Badge>
        )} */}
          {/* <Badge colorScheme={color_id}>{status}</Badge> */}
          <Select
            onChange={handleChange}
            backgroundColor={color_id}
            outline="none"
            border="none"
            width="50%"
            height="30px"
            fontSize="15px"
            fontWeight="bold"
            color="lightgray"
          >
            {options.map((option) => (
              <option
                key={option.value}
                outline="none"
                border="none"
                value={option.value}
                disabled={option.disabled}
                selected={option.value === status}
              >
                {option.label}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex marginTop="4" justifyContent="flex-end">
          {/* <Select onChange={handleChange} disabled={handleSelectDisable}>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              selected={option.value === status}
            >
              {option.label}
            </option>
          ))}
        </Select> */}
        </Flex>
      </Box>
    </>
  );
};

export default OrderDetailsCardActive;

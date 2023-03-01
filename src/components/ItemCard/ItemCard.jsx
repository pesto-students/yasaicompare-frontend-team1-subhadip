// Using chakra ui create a card component that can be used to display the details of a grocery shop. The card should have the following properties:

import React from "react";
import {
  Card,
  Image,
  Heading,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import paprika from "../../assets/paprika.jpg";
export default function ItemCards(props) {
  return (
    <Card marginLeft='1' marginTop = '1'display="flex" justifyContent="center" width="180px" h="110px" boxShadow='xl'>
      <Box display="flex" justifyContent="space-between" p='3'>
        <Image src={paprika} alt="paprika" w="50px" h="50px" borderRadius='6px' />
        <Heading fontSize="18" fontWeight="bold">
          Red Paprika
        </Heading>
      </Box>
      <Box display="flex" justifyContent="space-between" p='2'>
        <Box display="flex">
          <Text fontSize="14px" color="green.500" fontWeight="bold">
            ₹75.00
          </Text>
          <Text fontSize="14px" color="gray.500" fontWeight="bold">
            /kg
          </Text>
        </Box>
        <Button
          size="xs"
          variant="outline"
          borderRadius="20px"
          border="2px"
          p="2"
          fontSize="14px"
        >
          Add 2 Cart
        </Button>
      </Stack>
    </Card>
  );
}

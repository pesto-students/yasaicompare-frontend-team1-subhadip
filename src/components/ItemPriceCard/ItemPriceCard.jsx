import { Box, Text, Flex, Image, Button } from "@chakra-ui/react";
import React from "react";

const App = () => {
  return (
    <Box
      w="30%"
      h="100px"
      p="1rem"
      bg="white"
      borderRadius="0.5rem"
      boxShadow="2xl"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Image
          src="https://st2.depositphotos.com/2577341/9531/i/600/depositphotos_95313678-stock-photo-fresh-carrot-on-white.jpg"
          alt="carrot"
          width="30px"
        />
        <Text fontSize="10px">CARROT</Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Box display="flex">
          <Text fontSize="10px" color="green.500" fontWeight="bold">
            75.00$
          </Text>
          <Text fontSize="10px" color="gray.500" fontWeight="bold">
            /kg
          </Text>
        </Box>
        <Button
          mt="3"
          size="ls"
          variant="outline"
          borderRadius="8px"
          fontSize="7px"
        >
          Add 2 Cart
        </Button>
      </Flex>
    </Box>
  );
};

export default App;

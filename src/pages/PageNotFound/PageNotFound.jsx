import React from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Box textAlign="center" p={8}>
      <Heading as="h1" size="2xl" mb={4}>
        Oops! Page not found.
      </Heading>
      <Text fontSize="lg" mb={8}>
        Sorry, the page you're looking for does not exist.
      </Text>
      <Box>
        <Text fontSize="md" mb={4}>
          You can go back to the homepage or continue shopping:
        </Text>
        <Button as={Link} to="/" variant="solid" colorScheme="green" mr={4}>
          Go to homepage
        </Button>
        <Button as={Link} to="/shop" variant="solid" colorScheme="blue">
          Continue shopping
        </Button>
      </Box>
    </Box>
  );
};

export default PageNotFound;

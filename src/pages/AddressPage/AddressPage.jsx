import React from "react";
// update adress page using charka ui where it has buttons like update and delete address
import { Box, Grid, Input, Button } from "@chakra-ui/react";
const AddressPage = () => {
  return (
    <Box>
      <Button colorScheme="teal" variant="outline">
        Update Address
      </Button>
      <Button colorScheme="red" variant="outline">
        Delete Address
      </Button>
    </Box>
  );
};

export default AddressPage;

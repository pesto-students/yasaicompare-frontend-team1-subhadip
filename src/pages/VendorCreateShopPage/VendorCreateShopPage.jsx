import { Box, Button } from "@chakra-ui/react";
import React from "react";

import VendorCreateShopForm from "../../components/VendorCreateShopForm/VendorCreateShopForm";
import { useDisclosure } from "@chakra-ui/react";

export default function VendorCreateShopPage() {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const ShopForm = useDisclosure();
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button onClick={ShopForm.onOpen}>CREATE SHOP</Button>
      <VendorCreateShopForm
        initialRef={initialRef}
        finalRef={finalRef}
        isOpen={ShopForm.isOpen}
        onClose={ShopForm.onClose}
      />
    </Box>
  );
}

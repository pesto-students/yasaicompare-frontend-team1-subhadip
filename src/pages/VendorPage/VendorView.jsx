import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import VendorInventoryCard from "../../components/VendorInventoryCard/VendorInventoryCard";
const VendorView = () => {
  return (
    <SimpleGrid columns={[2, 2, 4, 6, 8]} gap="10px">
      <VendorInventoryCard />
      <VendorInventoryCard />
      <VendorInventoryCard />
      <VendorInventoryCard />
      <VendorInventoryCard />
      <VendorInventoryCard />
    </SimpleGrid>
  );
};

export default VendorView;

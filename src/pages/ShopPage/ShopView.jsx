import GroceryCard from "../../components/ShopCard/ShopCard";
import { SimpleGrid } from "@chakra-ui/react";

const ShopView = () => {
  return (
    <SimpleGrid columns={[2, 2, 4, 6, 8]} gap="10px">
      <GroceryCard />
      <GroceryCard />
      <GroceryCard />
      <GroceryCard />
      <GroceryCard />
      <GroceryCard />
      <GroceryCard />
      <GroceryCard />
    </SimpleGrid>
  );
};

export default ShopView;

import ItemCard from "../../components/ItemCard/ItemCard";
import { SimpleGrid } from "@chakra-ui/react";

const CompareView = () => {
  return (
    <SimpleGrid columns={[2, 2, 4, 6, 8]} gap="10px">
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </SimpleGrid>
  );
};

export default CompareView;

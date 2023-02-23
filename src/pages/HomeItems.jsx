import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import BottomNav from "../components/BottomNav/BottomNav";
import TopNav from "../components/TopNav/TopNav";
import ItemCard from "../components/ItemCard/ItemCard";

export default function Home() {
  return (
    <div>
      <TopNav />
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        marginTop="60px"
        padding="10px"
        marginBottom="60px"
      >
        <SimpleGrid columns={[2, 2, 4, 6, 8]} gap="10px">
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </SimpleGrid>
      </Box>
      <BottomNav />
    </div>
  );
}

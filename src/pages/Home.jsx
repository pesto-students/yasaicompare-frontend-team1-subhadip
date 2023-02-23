import React from "react";
import GroceryCard from "../components/GroceryCard/GroceryCard";
import { Box, SimpleGrid } from "@chakra-ui/react";
import BottomNav from "../components/BottomNav/BottomNav";
import TopNav from "../components/TopNav/TopNav";
import TabNav from "../components/Tabnav/Tabnav";

export default function Home() {
  return (
    <div>
      <Box>
        <TopNav />
        <TabNav />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        marginTop="110px"
        padding="10px"
        marginBottom="60px"
      >
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
      </Box>
      <BottomNav />
    </div>
  );
}

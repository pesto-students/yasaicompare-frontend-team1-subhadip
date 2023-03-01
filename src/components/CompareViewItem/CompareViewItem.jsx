import { Box } from "@chakra-ui/react";
import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import ShopCard from "../ShopCard/ShopCard";

export default function CompareViewItem() {
  return (
    <div >
      <Box position='sticky' >
        <ShopCard />
      </Box>
      <Box>
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
      </Box>
    </div>
  );
}

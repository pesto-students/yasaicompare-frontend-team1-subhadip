import React from "react";
import { Tabs, TabPanels, TabPanel, Box, Text } from "@chakra-ui/react";
import ShopView from "./ShopView";

export default function Home() {
  return (
    <Tabs pb="70px">
      <Box
        justifyContent={"space-between"}
        position={"sticky"}
        top="60px"
        zIndex={999}
        bg="white"
      >
        <Text fontSize={"xs"} textAlign="center" fontWeight={"bold"} flex="1">
          SHOP VIEW
        </Text>
      </Box>

      <TabPanels>
        <TabPanel>
          <ShopView />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

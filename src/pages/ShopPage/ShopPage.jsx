import React from "react";
import {
  Stack,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import ShopView from "./ShopView";
import CompareView from "./CompareView";

export default function Home() {
  return (
    <Tabs pb="70px">
      <TabList
        justifyContent={"space-between"}
        position={"sticky"}
        top="60px"
        zIndex={999}
        bg="white"
      >
        <Tab fontSize={"xs"} fontWeight={"bold"} flex="1">
          Shop View
        </Tab>
        {/* <Tab fontSize={"xs"} fontWeight={"bold"} flex="1">
          Map View
        </Tab>
        <Tab fontSize={"xs"} fontWeight={"bold"} flex="1">
          Compare View
        </Tab> */}
      </TabList>

      <TabPanels>
        <TabPanel>
          <ShopView />
        </TabPanel>
        {/* <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel
          as={Flex}
          gap="10px"
          overflowX={"scroll"}
          overflowY={"hidden"}
        >
          <CompareView />
        </TabPanel> */}
      </TabPanels>
    </Tabs>
  );
}

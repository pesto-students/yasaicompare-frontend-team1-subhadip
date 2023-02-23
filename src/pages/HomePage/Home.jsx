import React from "react";
import {
  Stack,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import ShopView from "./ShopView";

export default function Home() {
  return (
    <Stack pb="70px">
      <Tabs>
        <TabList justifyContent={"space-between"}>
          <Tab>Shop View</Tab>
          <Tab>Map View</Tab>
          <Tab>Compare View</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ShopView />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}

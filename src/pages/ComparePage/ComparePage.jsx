import React from "react";
import {
  Stack,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import CompareView from "./CompareView";

export default function Home() {
  return (
    <Stack pb="70px">
      <Tabs>
        <TabList
          justifyContent={"space-between"}
          position={"sticky"}
          top="60px"
          zIndex={999}
          bg="white"
        >
          <Tab>Shop View</Tab>
          <Tab>Map View</Tab>
          <Tab>Compare View</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <CompareView />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}

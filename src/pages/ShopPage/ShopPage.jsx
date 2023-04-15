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
import MessageComponent from "../../components/MessageComponent/MessageComponet";
import {Heading} from "@chakra-ui/react";

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
        <Tab fontSize={"xs"} fontWeight={"bold"} flex="1">
          Map View
        </Tab>
        <Tab fontSize={"xs"} fontWeight={"bold"} flex="1">
          Compare View
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ShopView />
        </TabPanel>
        <TabPanel as={Flex} gap="10px" fontSize="3xl" fontWeight={"bold"}>
          {/* Coming Soon */}
          <MessageComponent
              message_type= {<Heading as="h2" size="xl" mt={6} mb={2} color={"green.400"}>Feature in Contruction! </Heading>}
              heading={<Heading as="h3" size="x" mt={6} mb={2} color={"green.300"}>Do Share your Insights. We'll be happy to incorporate them.</Heading>}
              message_body="Regards, Team Yasai!"
            />
        </TabPanel>
        <TabPanel as={Flex} gap="10px" fontSize="3xl" fontWeight={"bold"}>
          {/* Coming Soon */}
          <MessageComponent
              message_type= {<Heading as="h2" size="xl" mt={6} mb={2} color={"green.400"}>Feature in Contruction! </Heading>}
              heading={<Heading as="h3" size="x" mt={6} mb={2} color={"green.300"}>Do Share your Insights. We'll be happy to incorporate them.</Heading>}
              message_body="Regards, Team Yasai!"
            />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

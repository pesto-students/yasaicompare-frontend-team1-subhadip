import React from "react";
import { Stack, Text, Box, Flex } from "@chakra-ui/react";
import { HomeIcon } from "../Icons";
// import yasai from "../../assets/yasai.png";

export default function VendorNav() {
  return (
    <>
      <Stack direction={"row"} py="2" px="4" alignItems={"center"} bg="#ffff">
        <Stack spacing={"0"} flex={1}>
          <Flex justifyContent={"flex-start"} alignItems="unset" gap="10px">
            <HomeIcon fontSize="20px" color="green.500" />
            <Text as="div" fontWeight={"bold"}>
              Home
            </Text>
          </Flex>
          <Text fontSize={"xs"} noOfLines={1}>
            Bring new customers to increase your sales
          </Text>
        </Stack>
        <Stack>
          {/* <Box
            boxShadow={"lg"}
            borderRadius={"2xl"}
            py="1"
            px="2"
            border="1px"
            borderColor={"green.400"}
          >
            <Text
              color={"green.400"}
              fontWeight={"900"}
              fontSize={"sm"}
              letterSpacing={"1px"}
            >
              PRO
            </Text>
          </Box> */}
        </Stack>
      </Stack>
    </>
  );
}

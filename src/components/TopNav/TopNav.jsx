import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import { HomeIcon, SearchIcon } from "../Icons";
// import yasai from "../../assets/yasai.png";

export default function TopNav() {
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
            Some address is so cool to have some address here so that we can
            test
          </Text>
        </Stack>
        <Stack>
          <Box
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
          </Box>
        </Stack>
      </Stack>
      <Stack
        bg="#ffff"
        h="60px"
        boxShadow="md"
        position="sticky"
        top="0"
        left="0"
        right="0"
        zIndex="999"
        direction={"row"}
        alignItems={"center"}
        px="4"
        py="2"
      >
        {/* <Image src={yasai} w="50px" h="50px" /> */}

        <InputGroup size={"sm"}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search Shops, Items.."
            borderRadius={"md"}
          />
        </InputGroup>
      </Stack>
    </>
  );
}

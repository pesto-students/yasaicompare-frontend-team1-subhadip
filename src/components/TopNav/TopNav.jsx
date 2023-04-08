import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { getGeolocation, getAdressFromCoords } from "../../utils/commons";
import {
  fetchUserAddresses,
  markCurrentAddress,
} from "../../redux/features/address/addressSlice";
import haversineDistance from "haversine-distance";
// import yasai from "../../assets/yasai.png";

export default function TopNav() {
  const [location, setLocation] = useState();
  const getadressfromcoords = useRef(null);
  const authData = useSelector((state) => state.auth.data);
  const addressData = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const getUserAddresses = useCallback(
    async () => dispatch(fetchUserAddresses()).unwrap(),
    []
  );

  const init = async () => {
    try {
      if (addressData.data.length) {
        await getUserAddresses();
      }
      const res = await getGeolocation();
      const address = await getAdressFromCoords(
        res.coords.latitude,
        res.coords.longitude
      );
      getadressfromcoords.current = address;
      console.log(res);
      setLocation(res.coords);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    init();
  }, []);

  const selectedAddress = useMemo(() => {
    const currentAddress =
      location && addressData.data.length
        ? addressData.data
            .map((address) => {
              const dist = haversineDistance(
                {
                  lat: location.latitude,
                  lon: location.longitude,
                },
                { lat: address.latitude, lon: address.longitude }
              );
              return { ...address, dist };
            })
            .sort((a, b) => a - b)[0]
        : undefined;
    return currentAddress;
  }, [location]);

  console.log("selectedAddress", selectedAddress, location);

  useEffect(() => {
    // console.log("called", selectedAddress);
    if (selectedAddress) {
      dispatch(markCurrentAddress(selectedAddress.id));
    }
  }, [selectedAddress]);

  return (
    <>
      <Stack direction={"row"} py="2" px="4" alignItems={"center"} bg="#ffff">
        {selectedAddress ? (
          <Stack spacing={"0"} flex={1}>
            <Flex justifyContent={"flex-start"} alignItems="unset" gap="10px">
              <HomeIcon fontSize="20px" color="green.500" />
              <Text as="div" fontWeight={"bold"}>
                {selectedAddress.label || "Home"}
              </Text>
            </Flex>
            <Text fontSize={"xs"} noOfLines={1}>
              {selectedAddress.address_line_1 +
                ", " +
                selectedAddress.address_line_2}
            </Text>
          </Stack>
        ) : (
          <Text fontSize={"xs"} noOfLines={1}>
            {getadressfromcoords.current
              ? getadressfromcoords.current.addresses[0].address.freeformAddress
              : "Loading"}
          </Text>
        )}

        {/* <Stack>
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
        </Stack> */}
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
      ></Stack>
    </>
  );
}

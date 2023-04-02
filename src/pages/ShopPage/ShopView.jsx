import { useEffect, useState, useCallback } from "react";
import { FilterIcon } from "../../components/Icons";
import Rating from "../../components/Rating/Rating";
import GroceryCard from "../../components/ShopCard/ShopCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchShops } from "../../redux/features/shop/shopSlice";
import { useNavigate } from "react-router-dom";
import { getGeolocation, getAdressFromCoords } from "../../utils/commons";
import {
  SimpleGrid,
  Stack,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  SliderMark,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";

import _ from "lodash";

const labelStyles = {
  mt: "2",
  ml: "-2.5",
  fontSize: "sm",
};

const ShopView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const shopState = useSelector((state) => state.shop);
  const selectedAddress = useSelector((state) =>
    state.address.data.find((address) => address.current)
  );
  const [distanceFilterValue, setDistanceFilterValue] = useState(50);
  const [priceFilterValue, setPriceFilterValue] = useState(50);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getShops = useCallback(
    async (payload) => dispatch(fetchShops(payload)).unwrap(),
    []
  );

  useEffect(() => {
    (async () => {
      try {
        if (selectedAddress) {
          await getShops({
            latitude: selectedAddress.latitude,
            longitude: selectedAddress.longitude,
            pincode: selectedAddress.pincode,
          });
        } else {
          const location = await getGeolocation();
          const address = await getAdressFromCoords(
            location.coords.latitude,
            location.coords.longitude
          );
          await getShops({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            pincode: address.addresses[0].address.postalCode,
          });
        }
      } catch (error) {
        console.log(error);
        await getShops({
          latitude: 26.737881,
          longitude: 80.952744,
          pincode: "226014",
        });
      }
    })();
  }, [selectedAddress]);

  const visitShop = (id) => {
    const shop = shopState.data.shops.find((shop) => shop.shop_id === id);
    if (!shop) console.log("Shop not found");
    const location = {
      lat: shop.latitude,
      lng: shop.longitude,
    };
    window.open(
      "https://maps.google.com?q=" + location.lat + "," + location.lng
    );
  };

  function onShopClick(shop_id) {
    navigate(shop_id);
  }

  if (shopState.asyncStatus === "LOADING") {
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Spinner color="green.500" />
        <Text>Gettings Shops ...</Text>
      </Flex>
    );
  }

  return (
    <>
      <SimpleGrid
        columns={!_.isEmpty(shopState.data?.shops) ? [2, 2, 4, 6, 8] : [1]}
        gap="10px"
      >
        {!_.isEmpty(shopState.data?.shops) ? (
          shopState.data.shops.map((shop) => (
            <GroceryCard
              onClick={() => onShopClick(shop.shop_id)}
              key={shop.shop_id}
              shopid={shop.shop_id}
              image={shop.image}
              shop_name={shop.name}
              visitShop={() => visitShop(shop.shop_id)}
            />
          ))
        ) : (
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            w="full"
          >
            <Text>No Shops available near your</Text>
          </Flex>
        )}
      </SimpleGrid>

      <IconButton
        bg="green.400"
        boxShadow={"dark-lg"}
        position={"fixed"}
        bottom={70}
        right="10px"
        rounded={"full"}
        icon={<FilterIcon />}
        aria-label="filter"
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize={"md"}>Filters</DrawerHeader>

          <DrawerBody overflowX={"hidden"} pb="30px">
            <Stack spacing={"4"}>
              <FormControl>
                <FormLabel fontSize={"sm"}>Filter by rating</FormLabel>
                <Rating total={5} />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={"sm"}>Filter by distance</FormLabel>
                <Slider
                  aria-label="slider-ex-1"
                  onChange={(val) => setDistanceFilterValue(val)}
                >
                  <SliderMark value={25} {...labelStyles}>
                    2 km
                  </SliderMark>
                  <SliderMark value={50} {...labelStyles}>
                    4 km
                  </SliderMark>
                  <SliderMark value={75} {...labelStyles}>
                    6 km
                  </SliderMark>
                  <SliderMark
                    value={distanceFilterValue}
                    textAlign="center"
                    bg="green.500"
                    color="white"
                    mt="-8"
                    ml="-5"
                    w="12"
                    fontSize={"xs"}
                  >
                    {(8 * distanceFilterValue) / 100}Km
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </FormControl>
              <FormControl>
                <FormLabel fontSize={"sm"}>Filter by price</FormLabel>
                <Slider
                  aria-label="slider-ex-1"
                  onChange={(val) => setPriceFilterValue(val)}
                >
                  <SliderMark value={25} {...labelStyles}>
                    25 Rs
                  </SliderMark>
                  <SliderMark value={50} {...labelStyles}>
                    50 Rs
                  </SliderMark>
                  <SliderMark value={75} {...labelStyles}>
                    75 Rs
                  </SliderMark>
                  <SliderMark
                    value={priceFilterValue}
                    textAlign="center"
                    bg="green.500"
                    color="white"
                    mt="-8"
                    ml="-5"
                    w="12"
                    fontSize={"xs"}
                  >
                    {priceFilterValue} Rs
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </FormControl>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <ButtonGroup isAttached variant={"outline"} size={"sm"} w="full">
              <Button onClick={onClose} w="full">
                Cancel
              </Button>
              <Button variant={"solid"} w="full">
                Apply
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ShopView;

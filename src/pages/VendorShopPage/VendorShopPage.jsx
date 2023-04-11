import { useEffect, useCallback, useState } from "react";
import VendorCard from "../../components/VendorCard/VendorCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVendorShops,
  uploadImage,
} from "../../redux/features/vendor/vendorSlice";
import { CreateShops } from "../../redux/features/vendor/vendorSlice";
import { useNavigate } from "react-router-dom";
import { Img, useDisclosure } from "@chakra-ui/react";
import { getGeolocation, getAdressFromCoords } from "../../utils/commons";
import { fetchUserInfo } from "../../redux/features/auth/authSlice";
import { SimpleGrid, Flex, Spinner, Text, Box, Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import _ from "lodash";

const VendorInventoryPage = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [image_link, setImage_link] = useState("");
  const [image_id, setImage_id] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const vendorState = useSelector((state) => state.vendor);
  const authData = useSelector((state) => state.auth.data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getVendorShops = useCallback(
    async () => dispatch(fetchVendorShops()).unwrap(),
    []
  );
  const addNewShop = useCallback(
    async (args) => dispatch(CreateShops(args)).unwrap(),
    []
  );

  const getUserInfo = useCallback(
    async () => dispatch(fetchUserInfo()).unwrap(),
    []
  );

  const uploadVendorImage = useCallback(
    async (args) => dispatch(uploadImage(args)).unwrap(),
    []
  );

  const init = async () => {
    try {
      await getVendorShops();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!authData.user_id) {
      getUserInfo();
    }
    init();
  }, [authData.user_id, getUserInfo]);

  if (vendorState.asyncStatus === "LOADING") {
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

  const getCurrentLocation = async () => {
    const location = await getGeolocation();
    const { latitude, longitude } = location.coords;
    const address = await getAdressFromCoords(latitude, longitude);
    setName(authData.first_name + " " + authData.last_name);
    setAddress(address.addresses[0].address.freeformAddress);
    setCity(address.addresses[0].address.municipality);
    setState(address.addresses[0].address.countrySubdivision);
    setPincode(address.addresses[0].address.postalCode);
    setLatitude(latitude);
    setLongitude(longitude);
  };

  const handleImageChange = async (e) => {
    const data = new FormData();
    data.append("item", e.target.files[0]);
    const image = await uploadVendorImage(data);
    setImage_link(image.response.url);
    setImage_id(image.response.fileId);
  };

  const handleSubmitShopDetails = async (e) => {
    onClose();
    const location = await getGeolocation();
    const { latitude, longitude } = location.coords;
    addNewShop({
      name: name,
      address: address,
      image: image_link,
      city: city,
      state: state,
      pincode: pincode,
      country: "India",
      latitude: latitude,
      longitude: longitude,
    });
  };

  function displayImage() {
    return (
      <Box>
        <Button width="full" variant="ghost" />
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Button width="full" variant="ghost" onClick={onOpen}>
          CREATE SHOP
        </Button>
      </Box>
      {/* This is the create shopmodal */}

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="extrabold">CREATE SHOP</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Button variant="ghost" onClick={getCurrentLocation}>
              GET CURRENT LOCATION
            </Button>
            <FormControl>
              <FormLabel>Shop Name</FormLabel>
              <Input
                value={name}
                placeholder="Enter your Enter your Name"
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              {image_link ? (
                <Img src={image_link} />
              ) : (
                <Input type="file" name="image" onChange={handleImageChange} />
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Address</FormLabel>
              <Input
                value={address}
                placeholder="Enter your address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>City</FormLabel>
              <Input
                value={city}
                placeholder="Enter your city"
                onChange={(e) => setCity(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>State</FormLabel>
              <Input
                value={state}
                placeholder="Enter your state"
                onChange={(e) => setState(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Pincode</FormLabel>
              <Input
                value={pincode}
                placeholder="Enter your pincode"
                onChange={(e) => setPincode(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Latitude</FormLabel>
              <Input
                value={latitude}
                placeholder="Enter your latitude"
                onChange={(e) => setLatitude(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Logitude</FormLabel>
              <Input
                value={longitude}
                placeholder="Enter your logitude"
                onChange={(e) => setLongitude(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button width="full" onClick={handleSubmitShopDetails}>
              SUBMIT SHOP DETAILS
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* This is the vendor inventory page */}
      <SimpleGrid columns={[2, 2, 4, 6, 8]} gap="10px" p="2">
        {vendorState.data.shops.shops &&
          vendorState.data.shops.shops.map((shop) => (
            <VendorCard
              key={shop.shop_id}
              shopid={shop.shop_id}
              image={shop.image}
              shop_name={shop.name}
              showInventory={() =>
                navigate(`/vendor/inventory/${shop.shop_id}`)
              }
              viewOrders={() => navigate(`/vendor/orders/${shop.shop_id}`)}
            />
          ))}
      </SimpleGrid>
    </>
  );
};

export default VendorInventoryPage;

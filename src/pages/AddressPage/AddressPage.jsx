import React, { useState } from "react";
import AddressCard from "../../components/AddressCard/AddressCard";
import { AddIcon } from "../../components/Icons";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { fetchUserInfo } from "../../redux/features/auth/authSlice";
import {
  fetchUserAddresses,
  addNewAdress,
  updateAddress,
} from "../../redux/features/address/addressSlice";
import { useDispatch } from "react-redux";
import { getGeolocation, getAdressFromCoords } from "../../utils/commons";
import { useRef } from "react";
// update adress page using charka ui where it has buttons like update and delete address
import {
  Box,
  Button,
  List,
  Modal,
  Flex,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
const AddressPage = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const coordinates = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authData = useSelector((state) => state.auth.data);
  const addressData = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const getUserInfo = useCallback(
    async () => dispatch(fetchUserInfo()).unwrap(),
    []
  );
  const getUserAddresses = useCallback(
    async () => dispatch(fetchUserAddresses()).unwrap(),
    []
  );

  const handleAddAddress = useCallback(
    async (args) => dispatch(addNewAdress(args)).unwrap(),
    []
  );

  const handleUpdateAddress = useCallback(
    async (args) => dispatch(updateAddress(args)).unwrap(),
    []
  );

  const getCurrentAddress = async () => {
    const location = await getGeolocation();
    const { latitude, longitude } = location.coords;
    const address = await getAdressFromCoords(latitude, longitude);
    setAddress(address.addresses[0].address.freeformAddress);
    coordinates.current = location;
  };
  
  useEffect(() => {
    if (!authData.user_id) {
      getUserInfo();
    }
    getUserAddresses();
  }, [authData.user_id, getUserInfo]);

  const addUserAddress = async () => {
    onClose();
    await handleAddAddress({
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
      name: name,
      address: address,
      latitude: coordinates.current.coords.latitude,
      longitude: coordinates.current.coords.latitude,
    });
  };

  const handleEditAddress = (id) => {
    const address = addressData.data.find((address) => address.id === id);
    const address_name = address.address_line_1
    handleUpdateAddress({ id, address_name});
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ADD ADDRESS</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <Flex>
                <FormLabel marginTop="2">Address</FormLabel>
                <Button variant="ghost" onClick={getCurrentAddress}>
                  current
                </Button>
              </Flex>
              <Input placeholder="Enter your Address" value={address} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Address Line 1</FormLabel>
              <Input
                placeholder="Enter your Address Line 1"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Address Line 2</FormLabel>
              <Input
                placeholder="Enter your Address Line 1"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>City</FormLabel>
              <Input
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>State</FormLabel>
              <Input
                placeholder="Enter your state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Country</FormLabel>
              <Input
                placeholder="Enter your country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Pincode</FormLabel>
              <Input
                placeholder="Enter your pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={addUserAddress} width="full">
              ADD ADDRESS
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* This is the address page */}
      <Button variant="ghost" width="full" onClick={onOpen}>
        <AddIcon />
        Add New Address
      </Button>
      <List>
        {addressData.data.length &&
          addressData.data.map((address) => (
            <AddressCard
              key={address.id}
              homeaddress={
                address.address_line_1 + "," + address.address_line_2
              }
              editButton={() => handleEditAddress(address.id)}
            />
          ))}
      </List>
    </Box>
  );
};

export default AddressPage;

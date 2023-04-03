import React, { useState } from "react";
import AddressCard from "../../components/AddressCard/AddressCard";
import { AddIcon } from "../../components/Icons";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { fetchUserInfo } from "../../redux/features/auth/authSlice";
import { useRef } from "react";
import {
  fetchUserAddresses,
  addNewAdress,
  updateAddress,
} from "../../redux/features/address/addressSlice";
import { useDispatch } from "react-redux";
import { getGeolocation, getAdressFromCoords } from "../../utils/commons";
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
  const getId = useRef("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [label, setLabel] = useState("");
  const [edit, setEdit] = useState(true);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
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
    setName(authData.name);
    setAddress(address.addresses[0].address.municipalitySubdivision);
    setAddressLine1(address.addresses[0].address.municipality);
    // setAddressLine2(address.addresses[0].address.municipalitySubdivision);
    setCity(address.addresses[0].address.municipality);
    setState(address.addresses[0].address.countrySubdivision);
    setPincode(address.addresses[0].address.postalCode);
    console.log("address", address.addresses);
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
    setEdit(true);
    await handleAddAddress({
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      city: city,
      state: state,
      country: "India",
      pincode: pincode,
      name: name,
      address: address,
      latitude: coordinates.current.coords.latitude,
      longitude: coordinates.current.coords.longitude,
      label: label,
    });
  };

  const handleEditAddress = (id) => {
    onOpen();
    setEdit(false);
    const address = addressData.data.find((address) => address.id === id);
    getId.current = id;
    setName(address.name);
    setAddress(address.address);
    setAddressLine1(address.address_line_1);
    setAddressLine2(address.address_line_2);
    setCity(address.city);
    setState(address.state);
    setPincode(address.pincode);
    setLabel(address.label);
    setLatitude(address.latitude);
    setLongitude(address.longitude);
  };

  const updatecurrentAddress = async () => {
    onClose();
    const address = addressData.data.find(
      (address) => address.id === getId.current
    );
    console.log("update adress", address);
    const updatedAddress = {
      id: getId.current,
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      city: city,
      state: state,
      pincode: pincode,
      address: address.address,
    };
    console.log("updated address", updatedAddress);
    await handleUpdateAddress(updatedAddress);
  };

  return (
    <Box paddingBottom={"70px"}>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          {edit ? (
            <ModalHeader>ADD ADDRESS</ModalHeader>
          ) : (
            <ModalHeader>UPDATE ADDRESS</ModalHeader>
          )}
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex>
              {edit ? (
                <Button
                  variant="ghost"
                  onClick={getCurrentAddress}
                  width="full"
                >
                  DETECT CURRENT LOCATION
                </Button>
              ) : null}
            </Flex>
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
              </Flex>
              <Input
                placeholder="Enter your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
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
              <FormLabel>Pincode</FormLabel>
              <Input
                placeholder="Enter your pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Latitude</FormLabel>
              <Input
                placeholder="Enter your pincode"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Longitude</FormLabel>
              <Input
                placeholder="Enter your pincode"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Label</FormLabel>
              <Input
                placeholder="Enter your label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            {edit ? (
              <Button onClick={addUserAddress} width="full">
                ADD ADDRESS
              </Button>
            ) : (
              <Button onClick={updatecurrentAddress} width="full">
                UPDATE ADDRESS
              </Button>
            )}
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

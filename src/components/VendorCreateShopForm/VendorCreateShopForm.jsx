import React from "react";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Yasai from "../../assets/yasai.png";
import { CreateShops } from "../../redux/features/shop/shopSlice";
import { useDispatch } from "react-redux";
export default function VendorCreateShopForm({
  isOpen,
  onClose,
  initialRef,
  finalRef,
}) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const dispatch = useDispatch();
  const createShop = () =>
    dispatch(
      CreateShops({
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        active: "",
      })
    ).unwrap();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shops = await createShop({
      name,
      address,
      city,
      state,
      pincode,
      country,
      latitude,
      longitude,
    });
    console.log(shops);
  };
  return (
    <div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="full"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <img src={Yasai} alt="logo" width="400px" />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                placeholder="Enter your Enter your Name"
                onChange={(e) => setName(e.target.value)}
              />
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
              <FormLabel>Country</FormLabel>
              <Input
                value={country}
                placeholder="Enter your country"
                onChange={(e) => setCountry(e.target.value)}
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
            <Button width="full" onClick={handleSubmit}>
              SUBMIT SHOP DETAILS
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

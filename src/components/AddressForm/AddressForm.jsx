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

export default function AddressForm({ isOpen, onClose, initialRef, finalRef }) {
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
          <ModalHeader>ADD ADDRESS</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Enter your name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Address</FormLabel>
              <Input placeholder="Enter your Address" />
            </FormControl>

            <FormControl>
              <FormLabel>Address Line 1</FormLabel>
              <Input placeholder="Enter your Address Line 1" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Address Line 2</FormLabel>
              <Input placeholder="Enter your Address Line 1" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>City</FormLabel>
              <Input placeholder="Enter your city" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>State</FormLabel>
              <Input placeholder="Enter your state" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Country</FormLabel>
              <Input placeholder="Enter your country" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Pincode</FormLabel>
              <Input placeholder="Enter your pincode" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Latitude</FormLabel>
              <Input placeholder="Enter your latitude" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Logitude</FormLabel>
              <Input placeholder="Enter your logitude" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button width="full">ADD ADDRESS</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

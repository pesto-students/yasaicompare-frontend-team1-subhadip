import React from "react";
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
export default function UpdateProfileCard({ onClose, isOpen }) {
  const updateProfile = () => {
    console.log("update profile");
  };
  return (
    <Modal width="full" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="profileiimage" isRequired>
            <FormLabel>Profile Image</FormLabel>
            <Input type="file" placeholder="Profile Image" />
          </FormControl>
          <FormControl id="first-name" isRequired>
            <FormLabel>First name</FormLabel>
            <Input placeholder="First name" />
          </FormControl>
          <FormControl id="last-name" isRequired>
            <FormLabel>Last name</FormLabel>
            <Input placeholder="Last name" />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" placeholder="Email address" />
          </FormControl>
          <FormControl id="contact-no">
            <FormLabel>Contact number</FormLabel>
            <Input type="tel" placeholder="Contact number" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={updateProfile} mr={3}>
            Update Details
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

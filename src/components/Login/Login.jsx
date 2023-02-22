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
  Text,
  Link,
} from "@chakra-ui/react";
import Yasai from "../../assets/yasai.png";
import Proptype from "prop-types";

export default function Login({ isOpen, onClose, initialRef, finalRef }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
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
              <FormLabel>email</FormLabel>
              <Input ref={initialRef} placeholder="email" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>password</FormLabel>
              <Input placeholder="password" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              width="500px"
              mr={1}
              onClick={handleSubmit}
            >
              LOGIN
            </Button>
          </ModalFooter>
          <Text fontSize="sm" textAlign="center" mt={2} margin="20px">
            Don't have an account?{" "}
            <Link color="blue.500" href="/signup">
              Sign Up
            </Link>
          </Text>
        </ModalContent>
      </Modal>
    </div>
  );
}

Login.propTypes = {
  isOpen: Proptype.bool,
  onClose: Proptype.func,
  initialRef: Proptype.object,
  finalRef: Proptype.object,
};

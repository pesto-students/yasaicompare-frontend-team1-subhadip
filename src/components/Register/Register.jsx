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
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import Proptype from "prop-types";

const API_URL = "http://13.233.42.74:8080/user/create";

export default function Login({ isOpen, onClose, initialRef, finalRef }) {
  // write a function that does post request to the backend to create a new user
  // api link : http://13.233.42.74:8080/user/create
  const toast = useToast();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const handleSubmit = () => {
    axios
      .post(API_URL, {
        name: name,
        email: email,
        password: password,
        phone: phone,
      })
      .then((response) => {
        console.log(response);
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Account has errors.",
          description: "Check your credentials.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
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
              <FormLabel>name</FormLabel>
              <Input
                ref={initialRef}
                value={name}
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>email</FormLabel>
              <Input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>password</FormLabel>
              <Input
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>phone</FormLabel>
              <Input
                placeholder="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleSubmit}
              colorScheme="blue"
              width="500px"
              mr={1}
            >
              SIGN UP
            </Button>
          </ModalFooter>
          <Text fontSize="sm" textAlign="center" mt={2} margin="20px">
            Have an account?{" "}
            <Link color="blue.500" href="/signin">
              Login
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

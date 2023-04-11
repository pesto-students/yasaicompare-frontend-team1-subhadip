import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Image,
  Box,
  Link,
} from "@chakra-ui/react";
import yasai from "../assets/yasai.png";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { SERVER_URL } from "../../src/config";

const API_URL = `${SERVER_URL}/auth/register`;

const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [showvendor, setShowVendor] = React.useState(true);
  const nav = useNavigate();
  const toast = useToast();

  function roleHandler() {
    if (showvendor) {
      return "customer";
    } else {
      return "vendor";
    }
  }
  const handleSubmit = () => {
    axios
      .post(API_URL, {
        name: name,
        email: email,
        password: password,
        contact: phone,
        role: roleHandler(),
      })
      .then((response) => {
        console.log(response);
        toast({
          title: "Registered successfully.",
          description: "Redirecting to next page...",
          status: "success",
          duration: 9000,
          position: "top",
          isClosable: true,
        });
        nav("/login");
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Account has errors.",
          description: "Check Enter your credentials.",
          status: "error",
          duration: 9000,
          position: "top",
          isClosable: true,
        });
      });
  };

  function vendorHandler() {
    if (showvendor) {
      setShowVendor(false);
    } else {
      setShowVendor(true);
    }
  }

  function VendorBox() {
    return (
      <Box w={[300, 400, 500, 800]}>
        <FormControl mt={4}>
          <FormLabel>Aadhar Number</FormLabel>
          <Input placeholder="Enter your password" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>GSTIN</FormLabel>
          <Input placeholder="Enter your GSTIN Number" />
        </FormControl>
      </Box>
    );
  }

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box transform="translate(0%, 0%)" p="5" w={[300, 400, 500, 800]}>
          <Image src={yasai} alt="yasai" />
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Phone</FormLabel>
              <Input
                placeholder="Enter your phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Box display="flex" justifyContent="center">
                <CheckboxGroup colorScheme="green">
                  <Checkbox
                    onChange={vendorHandler}
                    value="vendor"
                    colorScheme="green"
                  >
                    Are you a vendor?
                  </Checkbox>
                </CheckboxGroup>
              </Box>
              {showvendor ? null : <VendorBox />}
              <Button
                onClick={handleSubmit}
                loadingText="Submitting"
                size="lg"
                bg={"green.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                SIGN UP
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} href="/login">
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Register;

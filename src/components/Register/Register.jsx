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
import yasai from "../../assets/yasai.png";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://13.233.42.74:8080/user/create";

export default function Login() {
  // write a function that does post request to the backend to create a new user
  // api link : http://13.233.42.74:8080/user/create
  const toast = useToast();
  const nav = useNavigate();

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
        nav("/");
      })
      .catch((error) => {
        console.log(error);
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
    <Box transform="translate(0%, 0%)" w={[300, 400, 500, 800]}>
      <Image src={yasai} alt="yasai" />
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>name</FormLabel>
          <Input
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
        <Stack spacing={10} pt={2}>
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
            <Link color={"blue.400"} href="/">
              Login
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}

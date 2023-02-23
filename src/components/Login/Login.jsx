import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Text,
  Link,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import yasai from "../../assets/yasai.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const API_URL = "http://13.233.42.74:8080/auth/login";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const toast = useToast();


  const handleSubmit = () => {
    axios
      .post(API_URL, {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        toast({
          title: "Logged in successfully.",
          description: "Redirecting to next page...",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        nav("/home");
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
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
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
            Sign up
          </Button>
        </Stack>
        <Stack pt={6}>
          <Text align={"center"}>
            Not logged in?{" "}
            <Link color={"blue.400"} href="/register">
              Signup
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}

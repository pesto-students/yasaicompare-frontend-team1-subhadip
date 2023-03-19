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
import { useState, useCallback } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import yasai from "../assets/yasai.png";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/auth/authSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const dispatch = useDispatch();
  const handleLogin = useCallback(
    async (args) => dispatch(login(args)).unwrap(),
    []
  );

  const handleSubmit = async () => {
    try {
      const result = await handleLogin({ email, password });
      localStorage.setItem("accessToken", result.accessToken);
      toast({
        title: "Logged in successfully.",
        description: "Redirecting to next page...",
        status: "success",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
      if (result.role === "customer") navigate("/");
      else if (result.role === "vendor") navigate("/vendor");
    } catch (err) {
      console.error(err);
      toast({
        title: "Account has errors.",
        description: "Check your credentials.",
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box transform="translate(0%, 0%)" w={[300, 400, 500, 800]} p="5">
          <Image src={yasai} alt="yasai" />
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
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
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button onClick={handleSubmit} loadingText="Submitting" size="lg">
                Sign In
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Not Registered yet ?{" "}
                <Link color={"blue.400"} href="/register">
                  Register
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;

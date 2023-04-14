import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../redux/features/auth/authSlice";
import yasai from "../../assets/yasai_logo.png";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const images = [
  {
    src: "https://images.unsplash.com/photo-1519096845289-95806ee03a1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    alt: "Image 1",
  },
  {
    src: "https://img.freepik.com/free-photo/colorful-fruits-tasty-fresh-ripe-juicy-white-desk_179666-169.jpg",
    alt: "Image 2",
  },
];

const LandingPage = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getUserInfo = useCallback(async () => {
    dispatch(fetchUserInfo());
  }, []);
  useEffect(() => {
    getUserInfo();
  }, []);

  // console.log(authData);
  function visitShops() {
    navigate("/shop");
  }
  return (
    <Box padding="3">
      <Flex justify="space-between">
        <Box
          display="flex"
          backgroundColor="#352020"
          bgGradient="linear(to right, black,green.500)"
          borderRadius="lg"
          width="full"
          justifyContent="space-between"
        >
          <Box>
            <Heading margin="5" color="#aed702">
              Get the Most Bang for Your Buck on Food and Groceries
            </Heading>
            <Text color="white" margin="5" fontSize="20">
              We offer the freshest and highest-quality food and groceries at
              the most affordable prices. We source our products from local
              farmers and producers, and we pride ourselves on our exceptional
              customer service.
            </Text>
          </Box>
        </Box>
      </Flex>
      <Box mt={8}>
        <Heading as="h2" size="xl" mb={4}>
          Our Special Offers
        </Heading>
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false} // should stop playing on user interaction
          interval={6000}
        >
          {images.map((image) => (
            <div data-src={image.src} />
          ))}
        </AutoplaySlider>
      </Box>
      <Box mt={8} alignItems="center" marginTop="20">
        <Heading as="h2" size="xl" mb={4}>
          Visit Shops
        </Heading>
        <Button onClick={visitShops} width="full">
          VISIT SHOPS
        </Button>
      </Box>
      <Box mt={8}>
        <Heading as="h2" size="xl" mb={4}>
          About Us
        </Heading>
      </Box>
    </Box>
  );
};

export default LandingPage;

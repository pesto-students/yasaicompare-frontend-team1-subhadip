// Using chakra ui create a card component that can be used to display the details of a grocery shop. The card should have the following properties:

import React from "react";
import {
  Card,
  Image,
  Heading,
  Text,
  Button,
  Box,
  Stack,
  CardBody,
} from "@chakra-ui/react";
import { formatPrice } from "../../utils/commons";
import PropTypes from "prop-types";

// export function ItemCards(props) {
//   return (
//     <Card marginLeft='1' marginTop = '1'display="flex" justifyContent="center" width="180px" h="110px" boxShadow='xl'>
//       <Box display="flex" justifyContent="space-between" p='3'>
//         <Image src={paprika} alt="paprika" w="50px" h="50px" borderRadius='6px' />
//         <Heading fontSize="18" fontWeight="bold">
//           Red Paprika
//         </Heading>
//       </Box>
//       <Box display="flex" justifyContent="space-between" p='2'>
//         <Box display="flex">
//           <Text fontSize="14px" color="green.500" fontWeight="bold">
//             ₹75.00
//           </Text>
//           <Text fontSize="14px" color="gray.500" fontWeight="bold">
//             /kg
//           </Text>
//         </Box>
//         <Button
//           size="xs"
//           variant="outline"
//           borderRadius="20px"
//           border="2px"
//           p="2"
//           fontSize="14px"
//         >
//           Add 2 Cart
//         </Button>
//       </Box>
//     </Card>
//   );
// }

export const ItemCard = (props) => {
  const imageSize = !props.minimal ? "100px" : "50px";
  return (
    <Card size={"sm"}>
      <CardBody>
        <Stack direction={props.minimal ? "row" : "column"}>
          <Image
            src={
              "https://www.jiomart.com/images/product/600x600/590002136/onion-5-kg-pack-product-images-o590002136-p590002136-0-202203141906.jpg"
            }
            alt="nill"
            width={imageSize}
            height={"auto"}
            borderRadius="lg"
          />
          <Stack mt="2" spacing="3" flex="1">
            <Heading fontSize="12px" size="md">
              Onion
            </Heading>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack spacing={"1"} flex="1">
                <Text fontSize="12px">{formatPrice(20)}</Text>
              </Stack>
              <Stack flex="1">
                <Button size="xs" borderRadius="8px" width="full">
                  Add
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

ItemCard.propTypes = {
  minimal: PropTypes.bool,
};

export default ItemCard;

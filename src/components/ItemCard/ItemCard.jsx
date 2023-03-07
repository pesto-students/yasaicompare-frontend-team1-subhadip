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
  HStack,
  Input,
  ButtonGroup,
} from "@chakra-ui/react";
import { formatPrice } from "../../utils/commons";
import PropTypes from "prop-types";
import { useNumberInput } from "@chakra-ui/react";

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
function NumberButton() {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 6,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    // <HStack maxW="320px">
    //   <Button h="6" {...inc}>
    //     +
    //   </Button>
    //   <Input w="20" {...input} />
    //   <Button h="6" {...dec}>
    //     -
    //   </Button>
    // </HStack>
    <ButtonGroup size="xs" isAttached variant="outline">
      <Button {...dec}>-</Button>
      <Input size="xs" {...input} />
      <Button {...inc}>+</Button>
    </ButtonGroup>
  );
}
export const ItemCard = (props) => {
  const [buttonclicked, setButtonClicked] = React.useState(true);
  const imageSize = !props.minimal ? "100px" : "50px";
  return (
    <Card size={"sm"}>
      <CardBody>
        <Stack direction={props.minimal ? "row" : "column"}>
          <Image
            src={props.image}
            alt="nill"
            width={imageSize}
            height={"auto"}
            borderRadius="lg"
          />
          <Stack mt="2" spacing="3" flex="1">
            <Heading fontSize="12px" size="md">
              {props.name}
            </Heading>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack spacing={"1"} flex="1">
                <Text fontSize="12px">{formatPrice(props.price)}</Text>
              </Stack>
              <Stack flex="1">
                {buttonclicked ? (
                  <Button
                    size="xs"
                    borderRadius="8px"
                    width="full"
                    onClick={() => setButtonClicked(false)}
                  >
                    Add
                  </Button>
                ) : (
                  <NumberButton />
                )}
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

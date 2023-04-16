import { Box, Heading, Text } from "@chakra-ui/react";

export default function MessageComponent(props) {
  return (
    <Box textAlign="center" py={10} px={6}>
      {props.message_type}
      {props.heading}
      <Text color={"gray.500"}>{props.message_body}</Text>
    </Box>
  );
}

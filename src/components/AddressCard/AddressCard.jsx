import { ListItem, Box, Text, Button, Link } from "@chakra-ui/react";
import React from "react";

export default function AddressCard(props) {
  return (
    <ListItem
      display="flex"
      justifyContent="space-between"
      m="5"
      p="5"
      boxShadow="xl"
    >
      <Box>
        <Text fontWeight="bold">{props.home}</Text>
        <Text>{props.homeaddress}</Text>
      </Box>
      <Box>
        <Button variant="ghost" onClick={props.editButton}>
          Edit
        </Button>
        <Button variant="ghost" onClick={props.deleteButton}>
          Delete
        </Button>
      </Box>
    </ListItem>
  );
}

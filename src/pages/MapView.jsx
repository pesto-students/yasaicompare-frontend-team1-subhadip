import React from "react";
import { Box } from "@chakra-ui/react";
import Map from "../components/Map/Map";
// import TabNav from "../components/Tabnav/Tabnav";

const MapView = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Map />
    </Box>
  );
};

export default MapView;

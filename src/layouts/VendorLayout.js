import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { VendorBottomNav, VendorNav } from "../components";

export default function AppLayout() {
  return (
    <Box as="main" height="calc(100vh)" minH={"calc(100vh)"}>
      <VendorNav />
      <Box minHeight="calc(100vh - 60px)" bg="gray.50">
        <Outlet />
      </Box>
      <VendorBottomNav />
    </Box>
  );
}

import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { BottomNav, TopNav } from "../components";

export default function AppLayout() {
  return (
    <Box as="main" height="calc(100vh)" minH={"calc(100vh)"}>
      <TopNav />
      <div style={{ height: "calc(100vh - 60px)" }}>
        <Outlet />
      </div>
      <BottomNav />
    </Box>
  );
}

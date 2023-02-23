import "./App.css";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Landing from "./pages/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import MapView from "./pages/MapView";
import HomeSearchItems from "./pages/HomeItems";
function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mapview" element={<MapView />} />
          <Route path="/homeitems" element={<HomeSearchItems />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

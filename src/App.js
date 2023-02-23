import "./App.css";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Landing from "./pages/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import MapView from "./pages/MapView";
import HomeSearchItems from "./pages/HomeItems";
import SignupPage from "./pages/SignupPages";
function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mapview" element={<MapView />} />
          <Route path="/homeitems" element={<HomeSearchItems />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

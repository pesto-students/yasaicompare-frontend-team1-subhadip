import "./App.css";
import React from "react";
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/Register";
// function App() {
//   return (
//     <ChakraProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/register" element={<SignupPage />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/mapview" element={<MapView />} />
//           <Route path="/homeitems" element={<HomeSearchItems />} />
//         </Routes>
//       </BrowserRouter>
//     </ChakraProvider>
//   );
// }

import { ShopPage } from "./pages";
import AppLayout from "./layouts/AppLayout";
import LayoutB from "./layouts/LayoutB";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <div>Landing Page</div>
          </React.Suspense>
        ),
      },
      {
        path: "shop",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <ShopPage />
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <SignupPage />,
  },
  {
    path: "/someotherpage",
    element: <LayoutB />,
    children: [
      {
        path: "",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <div>otherpage</div>
          </React.Suspense>
        ),
      },
    ],
  },
]);

const breakpoints = {
  xs: "0px",
  sm: "576px",
  md: "720px",
  lg: "1024px",
  xl: "1442px",
  "2xl": "1602px",
  "4xl": "1920px",
};

const customTheme = extendTheme(
  {
    breakpoints,
    // semanticTokens: {
    //   colors: {
    //     primary: {
    //       default: "pink.500",
    //       _dark: "pink.400",
    //     },
    //     primary_light: "pink.300",
    //     primary_dark: "pink.800",
    //     text: {
    //       default: "pink.500",
    //       _dark: "gray.50",
    //     },
    //   },
    // },
  },
  withDefaultColorScheme({
    colorScheme: "green",
  })
);

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;

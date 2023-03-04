import "./App.css";
import React from "react";
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/Register";
import VendorPage from "./pages/VendorPage/VendorView";
import { ShopPage, ItemPage, ProfilePage, AddressPage } from "./pages";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage/LandingPage";
import CartPage from "./pages/CartPage/CartPage";
import AuthWrapper from "./components/AuthWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <LandingPage />
          </React.Suspense>
        ),
      },
      {
        path: "shop",
        children: [
          {
            path: "",
            element: (
              <React.Suspense fallback={<div>Loading...</div>}>
                <ShopPage />
              </React.Suspense>
            ),
          },
          {
            path: ":shop_id",
            element: (
              <React.Suspense fallback={<div>Loading...</div>}>
                <ItemPage />
              </React.Suspense>
            ),
          },
        ],
      },
      {
        path: "cart",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <AuthWrapper>
              <CartPage />
            </AuthWrapper>
          </React.Suspense>
        ),
      },
      {
        path: "profile",
        children: [
          {
            path: "",
            element: (
              <React.Suspense fallback={<div>Loading...</div>}>
                <AuthWrapper>
                  <ProfilePage />
                </AuthWrapper>
              </React.Suspense>
            ),
          },
          {
            path: "address",
            element: (
              <React.Suspense fallback={<div>Loading...</div>}>
                <AddressPage />
              </React.Suspense>
            ),
          },
        ],
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
    path: "/vendor",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <VendorPage />
          </React.Suspense>
        ),
      },
      {
        path: "create",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <VendorCreateShopPage />
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
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  );
}

export default App;

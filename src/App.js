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
import VendorShopPage from "./pages/VendorShopPage/VendorShopPage";
import {
  ShopPage,
  ItemPage,
  ProfilePage,
  AddressPage,
  VendorInventoryPage,
  VendorOrdersPage,
  VendorProfilePage,
} from "./pages";
import AppLayout from "./layouts/AppLayout";
import VendorLayout from "./layouts/VendorLayout";
import LandingPage from "./pages/LandingPage/LandingPage";
import CartPage from "./pages/CartPage/CartPage";

import AuthWrapper from "./components/AuthWrapper";
import CompletePaymentPage from "./pages/CompletePaymentPage/CompletePaymentPage";
import ViewOrdersPage from "./pages/ViewOrdersPage/ViewOrdersPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

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
          {
            path: "vieworders",
            element: (
              <React.Suspense fallback={<div>Loading...</div>}>
                <ViewOrdersPage />
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
    element: <VendorLayout />,
    children: [
      {
        path: "",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <VendorShopPage />
          </React.Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <AuthWrapper>
              <VendorProfilePage />
            </AuthWrapper>
          </React.Suspense>
        ),
      },
      {
        path: "inventory/:shop_id",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <VendorInventoryPage />
          </React.Suspense>
        ),
      },

      {
        path: "orders/:shop_id",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <VendorOrdersPage />
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: "complete-payment/order/confirm-order",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <CompletePaymentPage />
      </React.Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <PageNotFound />
      </React.Suspense>
    ),
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

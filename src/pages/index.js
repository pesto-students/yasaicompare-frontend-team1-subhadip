import React from "react";

export const ShopPage = React.lazy(() => import("./ShopPage/ShopPage"));
export const CartPage = React.lazy(() => import("./CartPage/CartPage"));
export const ProfilePage = React.lazy(() =>
  import("./ProfilePage/ProfilePage")
);
// export const SomeOtherPage = React.lazy(() =>
//   import("./SomeOtherPage/SomeOtherPage")
// );

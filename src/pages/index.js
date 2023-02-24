import React from "react";

export const ShopPage = React.lazy(() => import("./ShopPage/ShopPage"));

export const ComparePage = React.lazy(() =>
  import("./ComparePage/ComparePage")
);

export const CartPage = React.lazy(() => import("./CartPage/CartPage"));

// export const SomeOtherPage = React.lazy(() =>
//   import("./SomeOtherPage/SomeOtherPage")
// );

import React from "react";

export const ShopPage = React.lazy(() => import("./ShopPage/ShopPage"));
export const CartPage = React.lazy(() => import("./CartPage/CartPage"));
export const ProfilePage = React.lazy(() =>
  import("./ProfilePage/ProfilePage")
);
export const ItemPage = React.lazy(() => import("./ItemPage/ItemPage"));

export const AddressPage = React.lazy(() =>
  import("./AddressPage/AddressPage")
);

export const VendorInventoryPage = React.lazy(() =>
  import("./VendorInventoryPage/VendorInventoryPage")
);

export const VendorOrdersPage = React.lazy(() =>
  import("./VendorOrderPage/VendorOrderPage")
);

export const VendorProfilePage = React.lazy(() =>
  import("./VendorProfile/VendorProfile")
);
// export const SomeOtherPage = React.lazy(() =>
//   import("./SomeOtherPage/SomeOtherPage")
// );
export const CompletePaymentPage = React.lazy(() =>
  import("./CompletePaymentPage/CompletePaymentPage")
);

import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import authReducer from "./features/auth/authSlice";
import shopReducer from "./features/auth/shopSlice";

const logger = createLogger();

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // .prepend(
      //   // correctly typed middlewares can just be used
      //   additionalMiddleware,
      // )
      // prepend and concat calls can be chained
      .concat(logger),
  reducer: {
    auth: authReducer,
    shop: shopReducer,
  },
});

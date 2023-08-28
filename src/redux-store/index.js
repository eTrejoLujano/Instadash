import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import auth from "./authSlice";
import store from "./storeSlice";
import cart from "./cartSlice";

export default configureStore({
  reducer: { auth, cart, store },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      createLogger({ collapsed: true })
    ),
});

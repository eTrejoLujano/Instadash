import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import auth from "./authSlice";
import store from "./storeSlice";

export default configureStore({
  reducer: { auth, store },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      createLogger({ collapsed: true })
    ),
});

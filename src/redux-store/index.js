import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import auth from "./authSlice";
import location from "./locationSlice";

export default configureStore({
  reducer: { auth, location },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      createLogger({ collapsed: true })
    ),
});

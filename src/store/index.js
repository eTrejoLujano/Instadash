import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import auth from "./authSlice";

export default configureStore({
  reducer: { auth },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      createLogger({ collapsed: true })
    ),
});

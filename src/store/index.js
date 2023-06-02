import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import auth from "./authSlice";

export default configureStore({
  reducer: { auth },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger({ collapsed: true })),
});

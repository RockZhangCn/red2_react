// src/store.js
import { configureStore } from "@reduxjs/toolkit"; // Updated import
import rootReducer from "./reducers"; // Updated import

const store = configureStore({
  // Updated store creation
  reducer: rootReducer,
});

export default store;

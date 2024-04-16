import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";

const persistedStateJSON = localStorage.getItem("AuthState");
const persistedState = persistedStateJSON
  ? JSON.parse(persistedStateJSON)
  : { Auth : { islogin: false, Role: "", User_id: "" } };

// console.log(persistedStateJSON);
// console.log(persistedState);

const preloadedState = {
  Auth: persistedState,
};
// console.log(preloadedState);
export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
  },
  preloadedState,
});

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { userReducer } from "./reducers/userReducer"; 
import { friendReducer } from "./reducers/friendReducer";
const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    friendReducer,
  },
});

export default store;

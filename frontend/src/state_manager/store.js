import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../state_manager/user/userSlice";
export const store = configureStore({
  reducer: { user: userSlice },
});

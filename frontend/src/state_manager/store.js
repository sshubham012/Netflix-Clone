import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../state_manager/user/userSlice";
import movieSlice from "./movies/movieSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    movie: movieSlice,
  },
});

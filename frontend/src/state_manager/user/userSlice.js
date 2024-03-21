import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerUserThunk } from "./userThunk";
import axios from "axios";

const initialState = {
  isLoading: false,
  //   isSidebarOpen: false,
  //   user: getUserFromLocalStorage(),
  //   accountDeleted: false,
};

export const registerUser = createAsyncThunk(
  "user/register-user",
  async (user, thunkAPI) => {
    console.log(user);
    const res = await axios.post(
      "http://locahost:5000/user/auth/register",
      user
    );
    return res;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("fullfilled");
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action);
        console.log("rejected");
        console.log(state);
      });
  },
});

export default userSlice.reducer;

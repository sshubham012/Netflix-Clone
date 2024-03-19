import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerUserThunk } from "./userThunk";

const initialState = {
  isLoading: false,
  //   isSidebarOpen: false,
  //   user: getUserFromLocalStorage(),
  //   accountDeleted: false,
};

export const registerUser = createAsyncThunk(
  "user/register-user",
  async (user, thunkAPI) => {
    return registerUserThunk("/user/auth/register", user, thunkAPI);
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, () => {
        console.log("pending");
      })
      .addCase(registerUser.fulfilled, () => {
        console.log("fullfilled");
      })
      .addCase(registerUser.rejected, () => {
        console.log("rejected");
      });
  },
});

export default userSlice.reducer;

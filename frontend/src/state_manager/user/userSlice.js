import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  isValidUser: false,
  isLoading: false,
};

export const registerUser = createAsyncThunk(
  "user/register-user",
  async (user, thunkAPI) => {
    const res = await axios.post(
      "http://localhost:5000/user/auth/register",
      user
    );

    return res.data;
  }
);

export const loginUser = createAsyncThunk(
  "user/login-user",
  async (user, thunkAPI) => {
    console.log(user);
    const res = await axios.post(`http://localhost:5000/user/auth/login`, user);

    return res.data;
  }
);

export const getGithubCreds = createAsyncThunk(
  "user/githubLogin",
  async (code, thunkAPI) => {
    const token = await axios.post(
      "http://localhost:5000/user/githubAccess",
      user
    );
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isValidUser = true;
        toast.success("New User Created...");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error && action.error.message.includes("409")) {
          toast.error("Use new Email.....");
        } else {
          toast.error("Internal Server ERROR");
        }
        // Log the error to the console
        console.error("Registration failed", action.error);
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isValidUser = true;
        toast.success("Logged in successfully!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        console.log(state);
        console.log(action);
        toast.error("login failed", action.error.message);
        // Log the error to the console
        console.error("Login failed", action.error);
      });
  },
});
export default userSlice.reducer;

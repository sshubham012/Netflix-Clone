import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import customAxios from "../../../utils/axios";
import { removeUserFromLocalStorage } from "../../utils/localstorage";

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

export const getGithubAccessToken = createAsyncThunk(
  "user/githubLogin",
  async (code, thunkAPI) => {
    console.log(code);
    const token = await customAxios.get(
      "http://localhost:5000/user/getaccesstoken?code=" + code
    );
    console.log(token);
    return token;
    // console.log(thunkAPI)
    // console.log(code);
  }
);

export const clearStore = createAsyncThunk(
  "user/clearStore",
  async (message, thunkAPI) => {
    try {
      thunkAPI.dispatch(logoutUser(message));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.isValidUser = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
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
      })
      .addCase(getGithubAccessToken.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getGithubAccessToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isValidUser = true;
        console.log("state", state);
        console.log("action", action);
        localStorage.setItem("access_token", action.payload.data.access_token);
        localStorage.setItem("username", action.payload.data.userData.login);
        localStorage.setItem("image", action.payload.data.userData.avatar_url);
        toast.success("Logged in successfully!");
      })
      .addCase(getGithubAccessToken.rejected, (state, action) => {
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

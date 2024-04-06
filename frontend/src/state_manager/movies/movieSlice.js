import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customAxios from "../../../utils/axios";

const initialState = {
  currentMovie: {},
  favs: [],
  allMovies: [],
  loading: false,
  error: null,
};

export const getRandomMovie = createAsyncThunk(
  "movie/randomMovie",
  async (_, thunkAPI) => {
    try {
      const response = await customAxios.get(
        "http://localhost:5000/movies/getRandMovie"
      );
      return response.data; // Return the actual data from the response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message); // Reject with the error message
    }
  }
);

export const getallmovies = createAsyncThunk(
  "movie/getall",
  async (_, thunkAPI) => {
    try {
      const response = await customAxios.get(
        "http://localhost:5000/movies/getall"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRandomMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRandomMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(getRandomMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getallmovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getallmovies.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
        state.allMovies = action.payload;
      })
      .addCase(getallmovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;

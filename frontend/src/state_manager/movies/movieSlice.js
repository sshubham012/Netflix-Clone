import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customAxios from "../../../utils/axios";

const initialState = {
  currentMovie: {},
  favs: [],
  loading: false,
  error: null,
};

export const getRandomMovie = createAsyncThunk(
  "movie/randomMovie",
  async (_, thunkAPI) => {
    try {
      const res = await customAxios.get("http://localhost:5000/movies/getrandmovie");
      console.log(res)
      return res.data; // Return response data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject with error message
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRandomMovie.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(getRandomMovie.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payloads);
        state.currentMovie = action.payload; // Update currentMovie with response data
      })
      .addCase(getRandomMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update error state with rejected value
      });
  },
});

export default movieSlice.reducer;

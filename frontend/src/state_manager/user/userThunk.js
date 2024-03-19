import axios from "axios";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await axios.post(url, user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

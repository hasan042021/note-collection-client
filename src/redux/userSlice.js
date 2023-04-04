import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userInfo: {},
  loading: false,
  error: null,
  success: false,
};

// login thunk
export const userLogin = createAsyncThunk(
  "users/userLogin",
  async ({ email, password, navigate, path }) => {
    try {
      console.log(email, password);
      const response = await axios.post(
        "/api/users/login",
        { email, password },
        { headers: { "Content-type": "application/json" } }
      );
      console.log(response.data);
      response.data && navigate(path);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    }
  }
);

// register thunk
export const userRegister = createAsyncThunk(
  "users/register",
  async ({ name, email, password, pic, navigate, path }) => {
    try {
      const { data } = await axios.post(
        "/api/users",
        { name, email, password, pic },
        { headers: { "Content-type": "application/json" } }
      );
      navigate(path);
      return data;
    } catch (error) {
      return error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    }
  }
);
// update thunk
export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (body, { getState }) => {
    const token = getState().userReducer.userInfo.token;
    try {
      const { data } = await axios.post("/api/users/profile", body, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    }
  }
);

// user slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.userInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      //login actions
      .addCase(userLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      // register actions
      .addCase(userRegister.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      //update profile actions
      .addCase(updateProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userInfo = action.payload;
        state.success = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
export const { logout } = userSlice.actions;

export default userSlice.reducer;

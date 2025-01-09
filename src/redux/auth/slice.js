import { createSlice } from "@reduxjs/toolkit";
import { login, register, logout, currentUser } from "./operations";

const initialState = {
  user: {
    username: "",
    email: "",
  },
  token: "",
  isLoggedIn: false,
  status: "idle",
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded"; 
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded"; 
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.status = "succeeded"; 
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export default authSlice.reducer;

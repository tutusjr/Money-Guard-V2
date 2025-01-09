import { createAsyncThunk } from "@reduxjs/toolkit";
import { costumAxiosInstance, setAxios } from "../api/authAxios";

export const login = createAsyncThunk(
  "auth/login",
  async (userLoginData, thunkAPI) => {
    try {
      const response = await costumAxiosInstance.post(
        "api/auth/sign-in",
        userLoginData
      );
      const token = response.data.token || "";

      setAxios(token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userRegisterData, thunkAPI) => {
    try {
      const response = await costumAxiosInstance.post(
        "api/auth/sign-up",
        userRegisterData
      );
      const token = response.data.token || "";
      setAxios(token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await costumAxiosInstance.delete("api/auth/sign-out");
    setAxios("");
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const currentUser = createAsyncThunk("auth/currentUser", async(token, thunkAPI) => {
  try{
    if(!token){
      return thunkAPI.rejectWithValue("No token found")
    }
    setAxios(token)
    const response = await costumAxiosInstance.get("/api/users/current");
    return response.data;
  }catch(e){
    return thunkAPI.rejectWithValue(e.message)
  }
})

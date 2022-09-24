import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { authService } from "../services/services";
import { Post } from "../models/post";
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface RootState {
  loadingUser?: boolean;
  user?: User;
  loadingUserPosts?: boolean;
  userPosts?: Post[];
  errorMessage?: string;
}

const initialState: RootState = {
  userPosts: [],
};

const { setItem, getItem} = AsyncStorage;


export const register = createAsyncThunk(
  "auth/signup",
  async (user: User, thunkAPI) => {
    try {
      const response = await authService.register(user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authentication = createAsyncThunk(
  "auth/login",
  async (user: User, thunkAPI) => {
    try {
      const response = await authService.authenticate(user);
      if(response.data) {
        await setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const logOut = createAsyncThunk(
  "auth/logout",
  async (thunkAPI) => {
    try {
      const token = await authService.logOut();
      return token;
    } catch (error) {
      return error;
    }
  }
);

export const mainSlice = createSlice({
  name: 'root', // name of the slice
  initialState,
  reducers: {
    // reducers
  },
  extraReducers: (builder) => {
    // extra reducers
    builder
    .addCase(register.pending, (state) => {
      state.loadingUser = true;
    })
    .addCase(authentication.pending, (state) => {
      state.loadingUser = true;
    })
    .addCase(logOut.pending, (state) => {
      state.loadingUser = true;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loadingUser = false;
    })
    .addCase(authentication.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loadingUser = false;
    })
    .addCase(logOut.fulfilled, (state) => {
      state.user = null;
      state.loadingUser = false;
    })
  },
})

export default mainSlice.reducer;
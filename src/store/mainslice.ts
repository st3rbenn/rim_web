import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { userService } from "../services/services";
import { Post } from "../models/post";

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


export const register = createAsyncThunk(
  "auth/signup",
  async (user: User) => {
    try {
      const response = await userService.register(user);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const authentication = createAsyncThunk(
  "auth/login",
  async (user: User) => {
    try {
      const response = await userService.authenticate(user);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
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
    .addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loadingUser = false;
    })
    .addCase(authentication.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loadingUser = false;
    });
  },
})

export default mainSlice.reducer;
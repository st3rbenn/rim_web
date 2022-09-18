import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { userService } from "../services/services";
import { Post } from "../models/post";
import { AxiosResponse } from "axios";

export interface RootState {
  loadingUser?: boolean;
  user?: User;
  loadingUserPosts?: boolean;
  userPosts?: Post[];
}

const initialState: RootState = {
  userPosts: [],
};

export const addUser = createAsyncThunk(
  "user/add",
  async (user: User) => {
    try {
      const response = await userService.addUser(user);
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
    .addCase(addUser.pending, (state) => {
      state.loadingUser = true;
    })
    .addCase(addUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loadingUser = false;
    });
  },
})

export default mainSlice.reducer;
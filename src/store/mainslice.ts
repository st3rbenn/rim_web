import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { authService, userService } from "../services/services";
import { Post } from "../models/post";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface RootState {
  loadingUser?: boolean;
  user?: User;
  userToken?: string;
  loadingUserPosts?: boolean;
  userPosts?: Post[];
  errorMessage?: string;
  isPremium?: boolean;
}

const initialState: RootState = {
  userPosts: [],
  isPremium: false,
};

const { setItem } = AsyncStorage;

export const register = createAsyncThunk(
  "auth/signup",
  async (user: User) => await authService.register(user)
);

export const authentication = createAsyncThunk<User, {}>(
  "auth/login",
  async (user: User) => {
    try {
      const token = await authService.authenticate(user);
      if (token) {
        await setItem("token", token.token);
      }

      const userData = await userService.profile();

      return [userData, token];
    } catch (error) {
      return error;
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logout",
  async () => await authService.logOut()
);

export const reloadProfile = createAsyncThunk(
  "user/profile",
  async () => await userService.profile()
);

export const mainSlice = createSlice({
  name: "root", // name of the slice
  initialState,
  reducers: {
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
      .addCase(reloadProfile.pending, (state) => {
        state.loadingUser = true;
      })
      .addCase(authentication.fulfilled, (state, action) => {
        state.userToken = action.payload[1];
        state.user = action.payload[0].user;
        state.loadingUser = false;
      })
      .addCase(reloadProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loadingUser = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.loadingUser = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = undefined;
        state.userToken = undefined;
        state.loadingUser = undefined;
      });
  },
});

export default mainSlice.reducer;

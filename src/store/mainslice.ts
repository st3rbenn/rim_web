import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { authService, userService } from "../services/services";
import { Post } from "../models/post";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface RootState {
  loadingUser?: boolean;
  reloadUser?: boolean;
  user?: User;
  userToken?: string;
  loadingUserPosts?: boolean;
  userPosts?: Post[];
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
  async (userV: User) => {
    try {
      const [token, user] = await Promise.all([
        authService.authenticate(userV),
        userService.profile(),
      ]);

      return { user: user.user, token: token.token };
    } catch (error) {
      return error;
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logout",
  async () => await authService.logOut()
);

export const reloadProfile = createAsyncThunk("user/profile", async () => {
  try {
    const user = await userService.profile();
    return user;
  } catch (error) {
    return error;
  }
});

export const updateProfile = createAsyncThunk<User, {}>(
  "user/edit",
  async (user: User) => {
    try {
      const userEdited = await userService.edit(user);
      return userEdited;
    } catch (error) {
      return error;
    }
  }
);

export const mainSlice = createSlice({
  name: "root", // name of the slice
  initialState,
  reducers: {},
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
        state.reloadUser = true;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loadingUser = true;
      })
      .addCase(authentication.fulfilled, (state, action) => {
        state.userToken = action.payload.token;
        state.user = action.payload.user;
        state.loadingUser = false;
      })
      .addCase(reloadProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.reloadUser = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
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

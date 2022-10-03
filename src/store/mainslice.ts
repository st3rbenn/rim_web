import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {User, UserState} from '../models/user';
import {authService, userService, postService} from '../services/services';
import {Post} from '../models/post';

export interface RootState {
  loadingUser?: boolean;
  reloadUser?: boolean;
  user?: User;
  avatarUrl?: string;
  userToken?: string;
  loadingUserPosts?: boolean;
  posts?: Post[];
  isPremium?: boolean;
  uploading?: boolean;
}

const initialState: RootState = {
  posts: [],
  isPremium: false,
} as RootState;

export const register = createAsyncThunk('auth/signup', async (user: User) => await authService.register(user));

export const authentication = createAsyncThunk('auth/login', async (user: User) => {
  try {
    const token = await authService.authenticate(user);

    return token;
  } catch (error) {
    return error;
  }
});

export const logOut = createAsyncThunk('auth/logout', async () => await authService.logOut());
// @ts-ignore
export const reloadProfile = createAsyncThunk<User, void>('user/profile', async () => {
  try {
    const user = await userService.profile();

    return user;
  } catch (error) {
    return error;
  }
});

export const updateProfile = createAsyncThunk('user/edit', async (user: UserState) => {
  try {
    const userEdited = await userService.edit(user);
    return userEdited;
  } catch (error) {
    return error;
  }
});

export const uploadFile = createAsyncThunk('upload', async (file: FormData) => {
  try {
    const response = await userService.upload(file);
    return response;
  } catch (error) {
    return error;
  }
});

export const init = createAsyncThunk<Pick<RootState, 'posts' | 'user'>>('user/init', async () => {
  const [userPosts, user] = await Promise.all([postService.getUserPosts(), userService.profile()]);

  return {posts: userPosts.posts, user: user.user};
});

export const mainSlice = createSlice({
  name: 'root', // name of the slice
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
      .addCase(uploadFile.pending, (state) => {
        state.uploading = true;
      })
      .addCase(init.pending, (state) => {
        state.loadingUserPosts = true;
      })
      .addCase(authentication.fulfilled, (state, action) => {
        state.userToken = action.payload.token;
        state.loadingUser = false;
      })
      .addCase(reloadProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.posts = action.payload.posts;
        console.log('action payload : ', action.payload);
        state.reloadUser = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        // @ts-ignore
        state.user = action.payload.user;
        state.loadingUser = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.loadingUser = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loadingUserPosts = false;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.avatarUrl = action.payload.file;
        state.uploading = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = undefined;
        state.userToken = undefined;
        state.loadingUser = false;
      });
  },
});

export default mainSlice.reducer;

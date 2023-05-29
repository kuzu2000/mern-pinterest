import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from './requestMethod';

export const fetchUser = createAsyncThunk('user/fetchUser', async (id) => {
  const response = await userRequest.get(`/auth/get/${id}`)
  return response.data?.favourites
})

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isFetching: false,
    isError: null,
    error: '',
  },
  reducers: {
    registerPending: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.isError = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.isError = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.error = action.payload;
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload;
      state.isFetching = false;
    },
    createFavourite: (state, action) => {
      state.favourites.push(action.payload);
      state.isFetching = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isError = false;
      state.error = null;
      state.isFetching = false;
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.favourites = action.payload;
    },
    [fetchUser.rejected]: (state) => {
      state.isFetching = false;
    },
  }
});

export const {
  registerPending,
  registerSuccess,
  registerFailure,
  registerError,
  loginError,
  loginSuccess,
  loginStart,
  loginFailure,
  updateUser,
  createFavourite,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
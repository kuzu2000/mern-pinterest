import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicRequest, userRequest } from './requestMethod';
export const fetchCreatedPosts = createAsyncThunk('user/fetchCreatedPosts', async () => {
    const response = await userRequest.get(`/posts/user-post`)
    return response.data
})

export const fetchUser = createAsyncThunk('user/fetchUser', async (id) => {
  const response = await userRequest.get(`/auth/get/${id}`)
  return response.data?.favourites
})

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState: {
    favourites: [],
    createdPosts: [],
    isFetching: null,
    isError: false,
  },
  reducers: {
    isLoading: (state) => {
      state.isFetching = true;
      state.isError = false;
    },
    isError: (state) => {
      state.isError = true;
      state.isFetching = false;
    },
    createFavourite: (state, action) => {
      state.favourites.push(action.payload);
      state.isFetching = false;
    },
    removeAllFavourites: (state) => {
      state.favourites = [];
      state.createdPosts = [];
      state.isFetching= null;
      state.isError = false;
    }
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
    [fetchCreatedPosts.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchCreatedPosts.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.createdPosts = action.payload;
    },
    [fetchCreatedPosts.rejected]: (state) => {
      state.isFetching = false;
    },
  }
});

export const { isLoading, isError, createFavourite, removeAllFavourites } =
favouriteSlice.actions;
export default favouriteSlice.reducer;

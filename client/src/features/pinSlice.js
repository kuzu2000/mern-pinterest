import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicRequest } from './requestMethod';
export const fetchPins = createAsyncThunk('pins/fetchPins', async (search) => {
    const response = await publicRequest.get(`/posts?&searchQuery=${search}`)
    return response.data
})

export const fetchUserPins = createAsyncThunk('pins/fetchUserPins', async () => {
  const response = await userRequest.get(`/posts/user-post`)
  return response.data
})

const pinSlice = createSlice({
  name: 'pin',
  initialState: {
    pins: [],
    pin: null,
    userPins: [],
    isFetching: null,
    isError: false,
  },
  reducers: {
    startLoading: (state) => {
      state.isFetching = true;
      state.isError = false;
    },
    showError: (state) => {
      state.isError = true;
      state.isFetching = false;
    },
    createPost: (state, action) => {
      state.pins.push(action.payload);
      state.isFetching = false;
    },
    commentAction: (state, action) => {
      state.pin = action.payload;
      state.isFetching = false;
    },
    getPin: (state, action) => {
      state.pin = action.payload;
      state.isFetching = false;
    },
  },
  extraReducers: {
    [fetchPins.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchPins.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.pins = action.payload;
    },
    [fetchPins.rejected]: (state) => {
      state.isFetching = false;
    },
    [fetchUserPins.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserPins.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.userPins = action.payload;
    },
    [fetchUserPins.rejected]: (state) => {
      state.isFetching = false;
    },
  }
});

export const { startLoading, showError, createPost, getPin, commentAction } =
  pinSlice.actions;
export default pinSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { friendApi } from '../../apis/friendApi';
import { useSelector } from 'react-redux';
import { authSelector } from './authReducer';

// Create async action
export const fetchFriends = createAsyncThunk('friends/fetchFrineds', async (userId) => {
  const response = await friendApi.handleFriend(`/getFriends/${userId}`);
  return response;
});

const initialState = {
  friends: [],
  loading: false,
  error: null,
};

const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.loading = true;

      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const friendReducer = friendSlice.reducer;

export const friendSelector = (state) => state.friendReducer.friends;

export default friendSlice.reducer;
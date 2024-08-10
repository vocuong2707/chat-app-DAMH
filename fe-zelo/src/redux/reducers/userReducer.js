import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../apis/userApi';

// Create async action
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await userApi.handleUser("/", {}, "GET");
  return response;
});

export const findUserByEmail = createAsyncThunk('users/findUserByEmail/:email', async (email) => {
  const response = await userApi.handleUser(`/findUserByEmail/${email}`, {}, "GET");
  return response;
}
);
//send friend request
export const sendFriendRequest = createAsyncThunk('users/sendFriendRequest', async (data) => {
  const response = await userApi.handleUser("/sendFriendRequest", data, "POST");
  return response;
}
);

//accept friend request
export const acceptFriendRequest = createAsyncThunk('users/acceptFriendRequestAndSendMessage', async (data) => {
  const response = await userApi.handleUser("/acceptFriendRequestAndSendMessage", data, "POST");
  return response;
}
);

//get send friend request get("/getSendFriendRequest/:userId", getSendFriendRequest);
export const getSendFriendRequest = createAsyncThunk('users/getSendFriendRequest', async (data) => {
  const response = await userApi.handleUser(`/getSendFriendRequest/${data.userId}`, {}, "GET");
  return response;
}
);

//delete friend request
export const deleteFriendRequest = createAsyncThunk('user/deleteFriendRequest', async (data) => {
  const response = await userApi.handleUser("/deleteFriendRequest", data, "POST");
  return response;
}
);




//get friend
export const getFriends = createAsyncThunk('users/getFriends', async (data) => {
  const response = await userApi.handleUser(`/getFriends/${data.userId}`, data, "GET");

  return response;
}
);

const initialState = {
  users: [],
  friend: [],
  loading: false,
  error: null,
};


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;

      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(findUserByEmail.pending, (state) => {
        state.loading = true;

      })
      .addCase(findUserByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(findUserByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(sendFriendRequest.pending, (state) => {
        state.loading = true;

      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(acceptFriendRequest.pending, (state) => {
        state.loading = true;

      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(acceptFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getSendFriendRequest.pending, (state) => {
        state.loading = true;

      })
      .addCase(getSendFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getSendFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(deleteFriendRequest.pending, (state) => {
        state.loading = true;

      })
      .addCase(deleteFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(deleteFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getFriends.pending, (state) => {
        state.loading = true;

      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.friend = action.payload;
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const userReducer = userSlice.reducer;

export const userSelector = (state) => state.userReducer.users;

export default userSlice.reducer;
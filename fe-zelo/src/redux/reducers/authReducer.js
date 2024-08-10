import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  email: '',
  fullname: '',
  geder: '',
  date_of_birth: '',
  photoUrl: '',
  accesstoken: '',
};



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authData: initialState,
  },
  reducers: {
    addAuth: (state, action) => {
      state.authData = action.payload;
    },

    removeAuth: (state, action) => {
      state.authData = initialState;
    },
    updateUserInfo: (state, action) => {
      state.authData = action.payload;
    },

  },
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth, updatePassword } = authSlice.actions;

export const authSelector = (state) => state.authReducer.authData;
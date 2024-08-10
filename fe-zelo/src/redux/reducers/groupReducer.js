//groupReduver
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { groupApi } from "../../apis/groupApi";
const initialState = {
    groups: [],
    loading: false,
    error: null,
};

const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
    },
    extraReducers: {
        [fetchGroups.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [fetchGroups.fulfilled]: (state, action) => {
            state.groups = action.payload;
            state.loading = false;
        },
        [fetchGroups.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
    },
});

export const groupReducer = groupSlice.reducer;
export const groupSelector = (state) => state.groupReducer.groups;

export default groupReducer;


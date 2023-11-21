/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export const loadUsers = createAsyncThunk(
  'users/fetch',
  async () => {
    const users = (await getUsers());

    return users;
  },
);

export type UsersState = {
  users: User[],
  loading: boolean,
  error: string,
};

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(loadUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(loadUsers.rejected, (state) => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export default usersSlice.reducer;

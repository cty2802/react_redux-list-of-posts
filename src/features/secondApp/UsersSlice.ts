/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  author: User | undefined,
};

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
  author: undefined,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = state.users.find(user => user.id === action.payload.id);
    },
  },
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
export const { setAuthor } = usersSlice.actions;

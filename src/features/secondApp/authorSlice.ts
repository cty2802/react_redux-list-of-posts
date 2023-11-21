/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

// export const getAuthor = createAsyncThunk(
//   'author/fetch',
//   async (userId: number | undefined): Promise<number | undefined> => {
//     if (userId != null) {
//       await getUser(userId);
//     }

//     return userId;
//   },
// );

export type UsersState = {
  loading: boolean,
  error: string,
  author: User | undefined,
};

export const initialState: UsersState = {
  loading: false,
  error: '',
  author: undefined,
};

const authorSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;

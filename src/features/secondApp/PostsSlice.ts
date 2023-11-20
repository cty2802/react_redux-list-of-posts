/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const loadPostsByUser = createAsyncThunk(
  'posts/fetch',
  async (userId: number | undefined) => {
    const posts = userId != null ? await getUserPosts(userId) : [];

    return posts;
  },
);

export type PostsState = {
  loading: boolean,
  error: string,
  posts: Post[] | undefined,
  selectedPost: Post | undefined,
};

const initialState: PostsState = {
  loading: false,
  error: '',
  posts: undefined,
  selectedPost: undefined,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost
       = state.posts?.find(post => post.id === action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPostsByUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadPostsByUser.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(loadPostsByUser.rejected, (state) => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export default postsSlice.reducer;
export const { setSelectedPost } = postsSlice.actions;

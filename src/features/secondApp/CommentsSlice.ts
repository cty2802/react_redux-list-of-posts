/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export const loadCommentsByPost = createAsyncThunk(
  'comments/fetch',
  async (postId: number | undefined) => {
    const comments = postId != null ? await getPostComments(postId) : [];

    return comments;
  },
);

export type CommentsState = {
  loading: boolean,
  error: string,
  comments: Comment[] | undefined,
};

const initialState: CommentsState = {
  loading: false,
  error: '',
  comments: undefined,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // setSelectedPost: (state, action: PayloadAction<Post>) => {
    //   state.selectedPost
    //    = state.posts?.find(post => post.id === action.payload.id);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCommentsByPost.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadCommentsByPost.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });

    builder.addCase(loadCommentsByPost.rejected, (state) => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export default commentsSlice.reducer;
// export const {} = commentsSlice.actions;

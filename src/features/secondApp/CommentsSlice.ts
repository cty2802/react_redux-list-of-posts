/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import * as commentsAPI from '../../api/comments';

export const loadCommentsByPost = createAsyncThunk(
  'comments/fetch',
  async (postId: number | undefined) => {
    const comments = postId != null ? await commentsAPI
      .getPostComments(postId) : [];

    return comments;
  },
);

// export const deleteComment = createAsyncThunk(
//   'comments/fetch',
//   async (commentId: number | undefined) => {
//     const commentToDelete = commentId != null ?
//     await commentsAPI.deleteComment(commentId) : [];

//     return commentToDelete;
//   },
// );

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
    // delete: () => {
    //   // state.comments = state.comments?.filter(comment => comment !== action.payload);
    //   //state, action: PayloadAction<Comment>
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
// export const { delete } = commentsSlice.actions;

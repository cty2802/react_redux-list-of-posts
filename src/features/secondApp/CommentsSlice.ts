/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import * as commentsAPI from '../../api/comments';

export const loadCommentsByPost = createAsyncThunk(
  'comments/fetch',
  async (postId: number | undefined) => {
    const comments
    = postId != null ? await commentsAPI.getPostComments(postId) : [];

    return comments;
  },
);

export const deleteComment = createAsyncThunk(
  'commentDelete/fetch',
  async (commentId: number | undefined): Promise<number | undefined> => {
    if (commentId != null) {
      await commentsAPI.deleteComment(commentId);
    }

    return commentId;
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
  reducers: { },
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

    builder.addCase(deleteComment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comments
        = state.comments?.filter(comment => comment.id !== action.payload);
    });

    builder.addCase(deleteComment.rejected, (state) => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export default commentsSlice.reducer;

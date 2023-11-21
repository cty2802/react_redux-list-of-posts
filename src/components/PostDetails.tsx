import React, { useEffect, useState } from 'react';
import { RootState } from '../app/store';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as commentsActions from '../features/secondApp/CommentsSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();

  const post = useAppSelector((state: RootState) => {
    return state.posts.selectedPost;
  });

  const comments = useAppSelector((state: RootState) => {
    return state.comments.comments;
  });

  useEffect(() => {
    dispatch(commentsActions.loadCommentsByPost(post?.id));
  }, [post?.id, dispatch]);

  const [loaded] = useState(false);
  const [hasError] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post?.id}: ${post?.title}`}
        </h2>

        <p data-cy="PostBody">
          {post?.body}
        </p>
      </div>

      <div className="block">
        {/* {!loaded && (
          <Loader />
        )} */}

        {loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && comments?.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {/* {loaded && !hasError && comments.length > 0 && ( */}
        <>
          <p className="title is-4">Comments:</p>

          {comments?.map(comment => (
            <article
              className="message is-small"
              key={comment.id}
              data-cy="Comment"
            >
              <div className="message-header">
                <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                  {comment.name}
                </a>

                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  onClick={() => {
                    dispatch(commentsActions
                      .deleteComment(comment.id));
                  }}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}
        </>
        {/* )} */}

        {loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {/* {loaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )} */}
      </div>
    </div>
  );
};
